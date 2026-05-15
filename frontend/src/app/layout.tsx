import './globals.css';
import type { Metadata } from 'next';
import ToasterProvider from '@/components/toaster-provider';

export const metadata: Metadata = {
  title: 'Booking Website',
  description: 'Modern room booking platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
