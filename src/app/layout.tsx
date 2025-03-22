
'use client';

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import App from "@/App";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <App>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gray-50 p-8">
              {children}
            </main>
          </div>
        </App>
        <Toaster />
      </body>
    </html>
  );
}
