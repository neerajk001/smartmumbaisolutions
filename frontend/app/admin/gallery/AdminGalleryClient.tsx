'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AdminEventEdit from './AdminEventEdit';

const getBackendBase = () => {
  const base = process.env.NEXT_PUBLIC_GALLERY_API_BASE || 'http://localhost:7001/api/gallery';
  return base.replace(/\/api\/gallery\/?$/, '') || 'http://localhost:7001';
};

type AdminEvent = {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
  images: { id: string; imageUrl: string; altText?: string; displayOrder: number; isFeatured?: boolean }[];
};

type Props = {
  user: { name?: string; email?: string; galleryToken?: string };
};

export default function AdminGalleryClient({ user }: Props) {
  const token = user.galleryToken;
  const backendBase = getBackendBase();

  const fetchWithTimeout = async (input: RequestInfo | URL, init: RequestInit, timeoutMs: number) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  };

  const readUploadError = async (res: Response, fallback: string) => {
    try {
      const data = await res.clone().json();
      if (data && typeof data === 'object' && 'error' in data) {
        const errVal = (data as { error?: unknown }).error;
        if (typeof errVal === 'string' && errVal.trim()) return errVal;
      }
    } catch {
      // ignore
    }

    return `${fallback} (HTTP ${res.status})`;
  };

  const uploadImagesInChunks = async (
    eventId: string,
    files: File[],
    onProgress?: (uploaded: number, total: number) => void
  ) => {
    const all = files;
    const chunkSize = 1;
    for (let i = 0; i < all.length; i += chunkSize) {
      const chunk = all.slice(i, i + chunkSize);
      const form = new FormData();
      for (const f of chunk) form.append('images', f);
      const res = await fetchWithTimeout(
        `${backendBase}/api/admin/gallery/events/${eventId}/images`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        },
        5 * 60 * 1000
      );
      if (!res.ok) throw new Error(await readUploadError(res, 'Upload failed'));

      onProgress?.(Math.min(i + chunk.length, all.length), all.length);
    }
  };

  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [emailsError, setEmailsError] = useState<string | null>(null);
  const [addEmailLoading, setAddEmailLoading] = useState(false);
  const [removeEmailLoading, setRemoveEmailLoading] = useState<string | null>(null);

  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventFeatured, setEventFeatured] = useState(false);
  const [eventPublished, setEventPublished] = useState(true);
  const [eventFiles, setEventFiles] = useState<FileList | null>(null);
  const [eventSubmitting, setEventSubmitting] = useState(false);
  const [eventUploadProgress, setEventUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [eventMessage, setEventMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchAllowedEmails = async () => {
    if (!token) return;
    setEmailsLoading(true);
    setEmailsError(null);
    try {
      const res = await fetch(`${backendBase}/api/admin/settings/allowed-emails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setAllowedEmails(data.emails || []);
    } catch (e) {
      setEmailsError(e instanceof Error ? e.message : 'Failed to load allowed emails');
    } finally {
      setEmailsLoading(false);
    }
  };

  const fetchEvents = async () => {
    if (!token) return;
    setEventsLoading(true);
    try {
      const res = await fetch(`${backendBase}/api/admin/gallery/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to load events');
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllowedEmails();
      fetchEvents();
    }
  }, [token]);

  useEffect(() => {
    if (!token || !editingEventId) {
      setEditingEvent(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${backendBase}/api/admin/gallery/events/${editingEventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!cancelled && res.ok && data.event) setEditingEvent(data.event);
        else if (!cancelled) setEditingEvent(null);
      } catch {
        if (!cancelled) setEditingEvent(null);
      }
    })();
    return () => { cancelled = true; };
  }, [token, editingEventId, backendBase]);

  const handleDeleteEvent = async (id: string) => {
    if (!token) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${backendBase}/api/admin/gallery/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setDeleteConfirmId(null);
      fetchEvents();
      if (editingEventId === id) setEditingEventId(null);
    } catch {
      setDeleteConfirmId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmail.trim().toLowerCase();
    if (!email || !token) return;
    setAddEmailLoading(true);
    setEmailsError(null);
    try {
      const res = await fetch(`${backendBase}/api/admin/settings/allowed-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to add');
      setAllowedEmails((prev) => (prev.includes(email) ? prev : [...prev, email]));
      setNewEmail('');
    } catch (e) {
      setEmailsError(e instanceof Error ? e.message : 'Failed to add email');
    } finally {
      setAddEmailLoading(false);
    }
  };

  const handleRemoveEmail = async (email: string) => {
    if (!token) return;
    setRemoveEmailLoading(email);
    setEmailsError(null);
    try {
      const res = await fetch(
        `${backendBase}/api/admin/settings/allowed-emails?email=${encodeURIComponent(email)}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to remove');
      setAllowedEmails((prev) => prev.filter((x) => x !== email));
    } catch (e) {
      setEmailsError(e instanceof Error ? e.message : 'Failed to remove email');
    } finally {
      setRemoveEmailLoading(null);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setEventMessage({ type: 'error', text: 'Sign in with Google to create events.' });
      return;
    }
    if (!eventTitle.trim() || !eventDescription.trim() || !eventDate || !eventLocation.trim()) {
      setEventMessage({ type: 'error', text: 'Please fill title, description, date, and location.' });
      return;
    }
    setEventSubmitting(true);
    setEventUploadProgress(null);
    setEventMessage(null);
    try {
      const form = new FormData();
      form.append('title', eventTitle.trim());
      form.append('description', eventDescription.trim());
      form.append('eventDate', eventDate);
      form.append('location', eventLocation.trim());
      form.append('isFeatured', String(eventFeatured));
      form.append('isPublished', String(eventPublished));
      const res = await fetchWithTimeout(
        `${backendBase}/api/admin/gallery/events`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        },
        60 * 1000
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      const createdId = data?.event?.id;

      // Refresh the list immediately so the user sees the created event without needing a manual refresh.
      fetchEvents();

      if (eventFiles && eventFiles.length > 0 && createdId) {
        const all = Array.from(eventFiles);
        const total = all.length;
        setEventUploadProgress({ current: 0, total });
        try {
          await uploadImagesInChunks(String(createdId), all, (uploaded, totalFiles) => {
            setEventUploadProgress({ current: uploaded, total: totalFiles });
          });
        } catch (err) {
          setEventMessage({
            type: 'error',
            text:
              'Event created, but image upload failed. Open the event and upload images from Edit. ' +
              (err instanceof Error ? err.message : ''),
          });
          return;
        }
      }

      setEventMessage({ type: 'success', text: 'Event created successfully.' });
      setEventTitle('');
      setEventDescription('');
      setEventDate('');
      setEventLocation('');
      setEventFeatured(false);
      setEventPublished(true);
      setEventFiles(null);
    } catch (err) {
      setEventMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to create event',
      });
    } finally {
      setEventSubmitting(false);
      setEventUploadProgress(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black border-b-2 border-orange-500 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user.name || user.email || 'Admin'}</span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/admin' })}
              className="text-sm text-orange-400 hover:text-orange-300 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento: Welcome - spans 2 cols */}
          <div className="lg:col-span-2 rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">Welcome back</h2>
            <p className="text-orange-100 text-sm mb-6">
              Signed in as <strong className="text-white">{user.email}</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 font-medium text-sm transition-colors"
              >
                View public gallery
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 font-medium text-sm border border-white/30 transition-colors"
              >
                Back to homepage
              </Link>
            </div>
          </div>

          {/* Bento: Quick stats / placeholder - spans 2 cols */}
          <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 p-6 shadow-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Gallery</h3>
              <p className="text-gray-500 text-sm mt-1">Total events</p>
            </div>
            <p className="text-4xl font-extrabold text-gray-900">{events.length}</p>
          </div>

          {token ? (
            <>
              {/* Bento: Create event - large, spans 2 cols, 2 rows on lg */}
              <div className="lg:col-span-2 lg:row-span-2 rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Create event & upload photos</h3>
                <p className="text-sm text-gray-500 mb-4">New events appear on the public gallery.</p>
                {eventMessage && (
                  <div
                    className={`mb-4 p-3 rounded-xl text-sm ${
                      eventMessage.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {eventMessage.text}
                  </div>
                )}
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Title *</label>
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Description *</label>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">Event date *</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 bg-gray-50 focus:border-orange-500 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">Location *</label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={eventFeatured}
                        onChange={(e) => setEventFeatured(e.target.checked)}
                        className="rounded border-2 border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={eventPublished}
                        onChange={(e) => setEventPublished(e.target.checked)}
                        className="rounded border-2 border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Published</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Photos (max 20)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setEventFiles(e.target.files)}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={eventSubmitting}
                    className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
                  >
                    {eventSubmitting
                      ? eventUploadProgress
                        ? `Uploading ${eventUploadProgress.current}/${eventUploadProgress.total}…`
                        : 'Creating…'
                      : 'Create event'}
                  </button>
                </form>
              </div>

              {/* Bento: All events table - spans 2 cols */}
              <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">All events</h3>
                  <span className="text-sm text-gray-500">{events.length} total</span>
                </div>
                {eventsLoading ? (
                  <p className="text-gray-500 text-sm">Loading…</p>
                ) : events.length === 0 ? (
                  <p className="text-gray-500 text-sm">No events yet. Create one using the form.</p>
                ) : (
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="py-2 pr-3 font-semibold text-gray-600">Title</th>
                          <th className="py-2 pr-3 font-semibold text-gray-600">Date</th>
                          <th className="py-2 pr-3 font-semibold text-gray-600">Status</th>
                          <th className="py-2 pr-3 font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((ev) => (
                          <tr key={ev.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 pr-3 text-gray-900 font-semibold truncate max-w-56">{ev.title}</td>
                            <td className="py-2 pr-3 text-gray-600">{ev.eventDate?.slice(0, 10)}</td>
                            <td className="py-2 pr-3">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                                  ev.isPublished
                                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                }`}
                              >
                                {ev.isPublished ? 'Live' : 'Draft'}
                              </span>
                            </td>
                            <td className="py-2 flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingEventId(ev.id)}
                                className="text-orange-600 hover:text-orange-700 font-semibold"
                              >
                                Edit
                              </button>
                              {deleteConfirmId === ev.id ? (
                                <>
                                  <span className="text-gray-500">Delete?</span>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteEvent(ev.id)}
                                    disabled={deleteLoading}
                                    className="text-red-600 hover:text-red-700 font-semibold"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="text-gray-600 hover:text-gray-800 font-semibold"
                                  >
                                    No
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(ev.id)}
                                  className="text-red-600 hover:text-red-700 font-semibold"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {editingEvent && (
                <div className="lg:col-span-4">
                  <AdminEventEdit
                    event={editingEvent}
                    token={token}
                    backendBase={backendBase}
                    onSaved={() => {
                      setEditingEventId(null);
                      setEditingEvent(null);
                      fetchEvents();
                    }}
                    onCancel={() => {
                      setEditingEventId(null);
                      setEditingEvent(null);
                    }}
                  />
                </div>
              )}

              {/* Bento: Allowed emails */}
              <div className="md:col-span-2 lg:col-span-4 rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Allowed admin emails</h3>
                <p className="text-sm text-gray-600 mb-4">Who can sign in. You cannot remove the last email.</p>
                {emailsError && (
                  <div className="mb-4 p-3 rounded-xl text-sm bg-red-100 text-red-800 border border-red-200">{emailsError}</div>
                )}
                {emailsLoading ? (
                  <p className="text-sm text-gray-500">Loading…</p>
                ) : (
                  <ul className="mb-4 space-y-2">
                    {allowedEmails.map((email) => (
                      <li key={email} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white border border-gray-200">
                        <span className="text-sm text-gray-800 truncate">{email}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          disabled={removeEmailLoading === email || allowedEmails.length <= 1}
                          className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {removeEmailLoading === email ? '…' : 'Remove'}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <form onSubmit={handleAddEmail} className="flex gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Add email"
                    className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 bg-white focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={addEmailLoading}
                    className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 font-medium text-sm disabled:opacity-50"
                  >
                    {addEmailLoading ? '…' : 'Add'}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="lg:col-span-4 rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
              <p className="text-gray-700">
                You signed in with Google. To create events, upload photos, and manage allowed admin emails, sign in with
                the admin email and password (the account configured in the gallery backend).
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
