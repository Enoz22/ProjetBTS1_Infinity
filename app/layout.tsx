import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infinity Loc',
  description: 'Location de voiture de luxe en ligne',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="fr" data-theme="dracula">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}