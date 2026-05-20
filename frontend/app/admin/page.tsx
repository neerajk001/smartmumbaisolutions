import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import AdminLoginClient from './AdminLoginClient';

export default async function AdminPage() {
  const session = await getServerSession();
  if (session?.user) {
    redirect('/admin/gallery');
  }
  return <AdminLoginClient />;
}
