require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.GALLERY_PORT || 7001;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.GALLERY_DB || process.env.MONGODB_DB || 'smartmumbaisolution';
const JWT_SECRET = process.env.GALLERY_JWT_SECRET || process.env.NEXTAUTH_SECRET || 'change-me';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI (set in .env.local or gallery-backend/.env)');
}

// Cloudinary (images stored in cloud, not on server)
const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_API_SECRET;
if (CLOUDINARY_CLOUD && CLOUDINARY_KEY && CLOUDINARY_SECRET) {
  cloudinary.config({ cloud_name: CLOUDINARY_CLOUD, api_key: CLOUDINARY_KEY, api_secret: CLOUDINARY_SECRET });
}

const client = new MongoClient(MONGODB_URI);
let db;

app.use(express.json({ limit: '10mb' }));

const allowedOrigins = (process.env.GALLERY_ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Application-Source'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

const GALLERY_EVENTS_COLLECTION = 'galleryEvents';
const ALLOWED_ADMIN_EMAILS_COLLECTION = 'allowedAdminEmails';

function normalizeEmail(email) {
  return String(email || '').toLowerCase().trim();
}

/** Upload a buffer to Cloudinary; returns secure_url or null on failure */
function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve) => {
    if (!CLOUDINARY_CLOUD || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
      return resolve(null);
    }
    const opts = { folder: 'gallery', ...options };
    const uploadStream = cloudinary.uploader.upload_stream(opts, (err, result) => {
      if (err) {
        console.error('[cloudinary] upload error:', err.message);
        return resolve(null);
      }
      resolve(result?.secure_url || null);
    });
    uploadStream.end(buffer);
  });
}

function formatEvent(event) {
  return {
    id: event._id?.toString?.() ?? String(event._id),
    title: event.title || '',
    description: event.description || '',
    eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : '',
    location: event.location || '',
    isFeatured: Boolean(event.isFeatured),
    isPublished: Boolean(event.isPublished),
    source: 'gallery-backend',
    images: Array.isArray(event.images) ? event.images.map((img, idx) => ({
      id: img._id?.toString?.() ?? String(img._id ?? idx),
      imageUrl: img.imageUrl || '',
      altText: img.altText || '',
      displayOrder: img.displayOrder ?? idx,
      isFeatured: Boolean(img.isFeatured),
    })) : [],
    createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null,
    updatedAt: event.updatedAt ? new Date(event.updatedAt).toISOString() : null,
  };
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
}

// Health
app.get('/api/gallery/health', (_req, res) => {
  res.json({ success: true, message: 'Gallery backend healthy', timestamp: new Date().toISOString() });
});

// Public gallery: published events
app.get('/api/gallery/events', async (req, res) => {
  const featured = req.query.featured === 'true';
  const limit = Math.min(parseInt(req.query.limit || '50', 10) || 50, 200);
  const offset = parseInt(req.query.offset || '0', 10) || 0;

  const query = { isPublished: true, ...(featured ? { isFeatured: true } : {}) };

  const collection = db.collection(GALLERY_EVENTS_COLLECTION);
  const events = await collection.find(query).sort({ eventDate: -1, displayOrder: 1 }).skip(offset).limit(limit).toArray();
  const total = await collection.countDocuments(query);
  res.json({ success: true, total, events: events.map(formatEvent) });
});

app.get('/api/gallery/events/:id', async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId, isPublished: true });
  if (!event) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, event: formatEvent(event) });
});

// Check if email is allowed (used by NextAuth for Google; requires internal secret)
app.get('/api/admin/check-allowed', async (req, res) => {
  const secret = req.headers['x-internal-secret'];
  const expectedSecret = process.env.NEXTAUTH_SECRET || process.env.GALLERY_JWT_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const email = normalizeEmail(req.query.email);
  if (!email) return res.status(400).json({ success: false, allowed: false });
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const doc = await coll.findOne({ email });
  res.json({ allowed: !!doc });
});

// Issue gallery JWT for an allowed email (used when user signs in with Google so they get galleryToken)
app.post('/api/admin/token-for-email', async (req, res) => {
  const secret = req.headers['x-internal-secret'];
  const expectedSecret = process.env.NEXTAUTH_SECRET || process.env.GALLERY_JWT_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const email = normalizeEmail(req.body?.email);
  if (!email) return res.status(400).json({ success: false, error: 'Email required' });
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const doc = await coll.findOne({ email });
  if (!doc) return res.status(403).json({ success: false, error: 'Email not allowed' });
  const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token });
});

// Admin settings: list allowed emails (JWT required)
app.get('/api/admin/settings/allowed-emails', authRequired, async (_req, res) => {
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const docs = await coll.find({}).toArray();
  const emails = docs.map((d) => d.email).filter(Boolean);
  res.json({ emails });
});

app.post('/api/admin/settings/allowed-emails', authRequired, async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  if (!email) return res.status(400).json({ success: false, error: 'Email required' });
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  await coll.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
  res.json({ success: true, email });
});

app.delete('/api/admin/settings/allowed-emails', authRequired, async (req, res) => {
  const email = normalizeEmail(req.query.email);
  if (!email) return res.status(400).json({ success: false, error: 'Email required' });
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const count = await coll.countDocuments({});
  if (count <= 1) {
    return res.status(400).json({ success: false, error: 'Cannot remove the last allowed admin' });
  }
  await coll.deleteOne({ email });
  res.json({ success: true });
});

// Admin auth: login to get JWT (only if email is in allowed list)
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH; // bcrypt hash

  if (!adminEmail || !adminPasswordHash) {
    return res.status(500).json({ success: false, error: 'Admin credentials not configured' });
  }
  if (!email || !password) return res.status(400).json({ success: false, error: 'Missing credentials' });
  const normalized = normalizeEmail(email);
  if (normalized !== normalizeEmail(adminEmail)) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(String(password), String(adminPasswordHash));
  if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });

  const allowedColl = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const allowed = await allowedColl.findOne({ email: normalized });
  if (!allowed) {
    return res.status(403).json({ success: false, error: 'Access denied. Your email is not allowed to use the admin panel.' });
  }

  const token = jwt.sign({ email: adminEmail, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token });
});

// Admin: upload event + images (stored on Cloudinary)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/admin/gallery/events', authRequired, upload.array('images', 20), async (req, res) => {
  const { title, description, eventDate, location } = req.body || {};
  const isFeatured = String(req.body?.isFeatured || 'false') === 'true';
  const isPublished = String(req.body?.isPublished || 'true') === 'true';

  if (!title || !description || !eventDate || !location) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  if (!CLOUDINARY_CLOUD || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
    return res.status(503).json({ success: false, error: 'Cloudinary not configured (CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET)' });
  }

  const _id = new ObjectId();
  const eventIdStr = _id.toString();
  const files = req.files || [];
  const images = [];

  for (let idx = 0; idx < files.length; idx++) {
    const f = files[idx];
    const imageUrl = await uploadToCloudinary(f.buffer, { public_id: `${eventIdStr}/${Date.now()}_${idx}` });
    if (imageUrl) {
      images.push({
        _id: new ObjectId(),
        imageUrl,
        altText: '',
        displayOrder: idx,
        isFeatured: idx === 0,
        uploadedAt: new Date(),
      });
    }
  }

  const doc = {
    _id,
    title,
    description,
    eventDate: new Date(eventDate),
    location,
    isFeatured,
    isPublished,
    displayOrder: 0,
    images,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: req.user?.email || null,
  };

  await db.collection(GALLERY_EVENTS_COLLECTION).insertOne(doc);
  res.status(201).json({ success: true, event: formatEvent(doc) });
});

app.get('/api/admin/gallery/events', authRequired, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10) || 100, 500);
  const offset = parseInt(req.query.offset || '0', 10) || 0;
  const events = await db.collection(GALLERY_EVENTS_COLLECTION).find({}).sort({ eventDate: -1, createdAt: -1 }).skip(offset).limit(limit).toArray();
  const total = await db.collection(GALLERY_EVENTS_COLLECTION).countDocuments({});
  res.json({ success: true, total, events: events.map(formatEvent) });
});

// Admin: get single event (including unpublished)
app.get('/api/admin/gallery/events/:id', authRequired, async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, event: formatEvent(event) });
});

// Admin: update event fields
app.patch('/api/admin/gallery/events/:id', authRequired, async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const { title, description, eventDate, location, isFeatured, isPublished } = req.body || {};
  const update = { updatedAt: new Date() };
  if (title !== undefined) update.title = String(title);
  if (description !== undefined) update.description = String(description);
  if (eventDate !== undefined) update.eventDate = new Date(eventDate);
  if (location !== undefined) update.location = String(location);
  if (typeof isFeatured === 'boolean') update.isFeatured = isFeatured;
  if (typeof isPublished === 'boolean') update.isPublished = isPublished;
  const result = await db.collection(GALLERY_EVENTS_COLLECTION).updateOne({ _id: objectId }, { $set: update });
  if (result.matchedCount === 0) return res.status(404).json({ success: false, error: 'Not found' });
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  res.json({ success: true, event: formatEvent(event) });
});

// Admin: delete event
app.delete('/api/admin/gallery/events/:id', authRequired, async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const result = await db.collection(GALLERY_EVENTS_COLLECTION).deleteOne({ _id: objectId });
  if (result.deletedCount === 0) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true });
});

// Admin: add images to existing event
app.patch('/api/admin/gallery/events/:id/images', authRequired, upload.array('images', 20), async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) return res.status(404).json({ success: false, error: 'Not found' });
  if (!CLOUDINARY_CLOUD || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
    return res.status(503).json({ success: false, error: 'Cloudinary not configured' });
  }
  const existingImages = Array.isArray(event.images) ? event.images : [];
  const files = req.files || [];
  const eventIdStr = objectId.toString();
  for (let idx = 0; idx < files.length; idx++) {
    const f = files[idx];
    const imageUrl = await uploadToCloudinary(f.buffer, { public_id: `${eventIdStr}/${Date.now()}_${existingImages.length + idx}` });
    if (imageUrl) {
      existingImages.push({
        _id: new ObjectId(),
        imageUrl,
        altText: '',
        displayOrder: existingImages.length,
        isFeatured: existingImages.length === 0,
        uploadedAt: new Date(),
      });
    }
  }
  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: existingImages, updatedAt: new Date() } }
  );
  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  res.json({ success: true, event: formatEvent(updated) });
});

// Admin: remove one image from event
app.delete('/api/admin/gallery/events/:id/images/:imageId', authRequired, async (req, res) => {
  let objectId; let imageObjectId;
  try {
    objectId = new ObjectId(req.params.id);
    imageObjectId = new ObjectId(req.params.imageId);
  } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) return res.status(404).json({ success: false, error: 'Not found' });
  const images = Array.isArray(event.images) ? event.images : [];
  const filtered = images.filter((img) => String(img._id) !== String(imageObjectId));
  if (filtered.length === images.length) return res.status(404).json({ success: false, error: 'Image not found' });
  for (let i = 0; i < filtered.length; i++) filtered[i].displayOrder = i;
  if (filtered.length > 0 && !filtered.some((img) => img.isFeatured)) filtered[0].isFeatured = true;
  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: filtered, updatedAt: new Date() } }
  );
  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  res.json({ success: true, event: formatEvent(updated) });
});

// Admin: reorder images (body: { order: [imageId1, imageId2, ...] })
app.patch('/api/admin/gallery/events/:id/images/reorder', authRequired, async (req, res) => {
  let objectId;
  try { objectId = new ObjectId(req.params.id); } catch { return res.status(404).json({ success: false, error: 'Not found' }); }
  const { order } = req.body || {};
  if (!Array.isArray(order) || order.length === 0) {
    return res.status(400).json({ success: false, error: 'order array required' });
  }
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) return res.status(404).json({ success: false, error: 'Not found' });
  const images = Array.isArray(event.images) ? [...event.images] : [];
  const orderIds = order.map((id) => (typeof id === 'string' && ObjectId.isValid(id) ? new ObjectId(id) : null)).filter(Boolean);
  const reordered = [];
  for (const oid of orderIds) {
    const img = images.find((i) => String(i._id) === String(oid));
    if (img) reordered.push(img);
  }
  const remaining = images.filter((i) => !orderIds.some((oid) => String(oid) === String(i._id)));
  const merged = [...reordered, ...remaining];
  merged.forEach((img, idx) => { img.displayOrder = idx; });
  if (merged.length > 0 && !merged.some((img) => img.isFeatured)) merged[0].isFeatured = true;
  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: merged, updatedAt: new Date() } }
  );
  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  res.json({ success: true, event: formatEvent(updated) });
});

async function start() {
  await client.connect();
  db = client.db(DB_NAME);

  const seedEmail = normalizeEmail(process.env.ADMIN_EMAIL || 'neerajkushwaha0401@gmail.com');
  const allowedColl = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  if (seedEmail) {
    await allowedColl.updateOne({ email: seedEmail }, { $setOnInsert: { email: seedEmail } }, { upsert: true });
    console.log('[gallery-backend] ensured allowed admin email:', seedEmail);
  }

  app.listen(PORT, () => {
    console.log(`[gallery-backend] listening on http://localhost:${PORT}`);
    console.log(`[gallery-backend] public API: http://localhost:${PORT}/api/gallery/events`);
  });
}

start().catch((e) => {
  console.error('[gallery-backend] failed to start', e);
  process.exit(1);
});

