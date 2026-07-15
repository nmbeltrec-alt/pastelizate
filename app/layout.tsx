import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pastelízate | Crea tu pastelito',
  description:
    'Arma tu propio personaje pastelito dominicano con IA y descárgalo como sticker.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#7a1f30',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-crema-50">{children}</body>
    </html>
  );
}
