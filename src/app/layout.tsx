import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solace Health - Find Your Patient Advocate',
  description:
    'Connect with expert patient advocates who can help you navigate the healthcare system and solve any medical problem, covered by insurance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body text-neutral-black min-h-screen antialiased">{children}</body>
    </html>
  );
}
