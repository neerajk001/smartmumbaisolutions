'use client';

import { useState, useEffect } from 'react';

type ImageItem = { id: string; imageUrl: string; altText?: string; displayOrder: number; isFeatured?: boolean };

type EventData = {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
  images: ImageItem[];
};

type Props = {
  event: EventData;
  token: string;
  backendBase: string;
  onSaved: () => void;
  onCancel: () => void;
};

export default function AdminEventEdit({ event, token, backendBase, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [eventDate, setEventDate] = useState(event.eventDate.slice(0, 10));
  const [location, setLocation] = useState(event.location);
  const [isFeatured, setIsFeatured] = useState(event.isFeatured);
  const [isPublished, setIsPublished] = useState(event.isPublished);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setImages([...event.images].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
  }, [event.images]);

  const moveImage = (index: number, dir: -1 | 1) => {
    const next = [...images];
    const ni = index + dir;
    if (ni < 0 || ni >= next.length) return;
    [next[index], next[ni]] = [next[ni], next[index]];
    setImages(next);
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    setRemovedImageIds((prev) => [...prev, imageId]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${backendBase}/api/admin/gallery/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          eventDate,
          location: location.trim(),
          isFeatured,
          isPublished,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update event');

      for (const imageId of removedImageIds) {
        await fetch(`${backendBase}/api/admin/gallery/events/${event.id}/images/${imageId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (newFiles && newFiles.length > 0) {
        const form = new FormData();
        for (let i = 0; i < newFiles.length; i++) form.append('images', newFiles[i]);
        await fetch(`${backendBase}/api/admin/gallery/events/${event.id}/images`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
      }

      const order = images.map((img) => img.id);
      if (order.length > 0) {
        await fetch(`${backendBase}/api/admin/gallery/events/${event.id}/images/reorder`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ order }),
        });
      }

      setMessage({ type: 'success', text: 'Event updated.' });
      setTimeout(() => onSaved(), 800);
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to update' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border-2 border-orange-200 shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Edit event</h3>
      {message && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
              required
            />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded border-2 border-gray-300 text-orange-500 focus:ring-orange-500" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded border-2 border-gray-300 text-orange-500 focus:ring-orange-500" />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Photos (reorder with arrows, remove to delete)</label>
          <ul className="space-y-2 mb-2">
            {images.map((img, idx) => (
              <li key={img.id} className="flex items-center gap-3 py-2 border-b border-gray-100 rounded-lg bg-gray-50 px-3">
                <img src={img.imageUrl} alt={img.altText || ''} className="w-16 h-16 object-cover rounded-lg" />
                <span className="text-sm text-gray-600 flex-1">Order {idx + 1}</span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                    ↑
                  </button>
                  <button type="button" onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                    ↓
                  </button>
                  <button type="button" onClick={() => removeImage(img.id)} className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mb-2">Add more photos</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewFiles(e.target.files || null)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:font-medium"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
