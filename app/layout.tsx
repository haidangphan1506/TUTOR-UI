import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

import {
  AuthProvider,
  ColorThemeProvider,
  QueryProvider,
  SocketProvider,
  ThemeProvider,
} from "@/components/providers";

import "./globals.css";

const THEME_INIT_SCRIPT = `(function(){try{var k='theme-preference';var t=localStorage.getItem(k);var d=document.documentElement;if(t==='dark')d.classList.add('dark');else if(t==='light')d.classList.remove('dark');else if(window.matchMedia('(prefers-color-scheme:dark)').matches)d.classList.add('dark');else d.classList.remove('dark');}catch(e){}})();`;

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tutor Pro",
    template: "%s | Tutor Pro",
  },
  description: "Theo doi thu chi va tai chinh ca nhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${beVietnamPro.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <QueryProvider>
          <ThemeProvider>
            <ColorThemeProvider>
              <AuthProvider>
                <SocketProvider>{children}</SocketProvider>
              </AuthProvider>
            </ColorThemeProvider>
          </ThemeProvider>
        </QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
