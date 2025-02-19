import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });
import dotenv from 'dotenv';

dotenv.config();

export const metadata = {
  title: 'hoteb.ai',
  description:
    'hoteb.ai: Your AI Medical companion. Powered by LLMs, it enhances your conversations, content creation, and more!',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
