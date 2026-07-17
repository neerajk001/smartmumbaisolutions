import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.GALLERY_DB || process.env.MONGODB_DB || 'smartmumbaisolution';
const ALLOWED_ADMIN_EMAILS_COLLECTION = 'allowedAdminEmails';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI!);
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

let dbInstance: Db | null = null;
let seeded = false;

async function seedAdminEmail(db: Db) {
  if (seeded) return;
  seeded = true;
  const seedEmail = (process.env.ADMIN_EMAIL || 'neerajkushwaha0401@gmail.com').toLowerCase().trim();
  if (seedEmail) {
    const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
    await coll.updateOne({ email: seedEmail }, { $setOnInsert: { email: seedEmail } }, { upsert: true });
    console.log('[gallery] ensured allowed admin email:', seedEmail);
  }
}

export async function getDb(): Promise<Db> {
  if (dbInstance) return dbInstance;
  const client = await getClientPromise();
  dbInstance = client.db(DB_NAME);
  await seedAdminEmail(dbInstance);
  return dbInstance;
}

export function getDbName(): string {
  return DB_NAME;
}

