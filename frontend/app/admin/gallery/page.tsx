import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import AdminGalleryClient from './AdminGalleryClient';

export default async function AdminGalleryPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect('/admin');
  }

  return (
    <AdminGalleryClient
      user={{
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        galleryToken: (session.user as { galleryToken?: string }).galleryToken,
      }}
    />
  );
}
