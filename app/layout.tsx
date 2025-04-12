import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "./Components/Navbar";
import {Ubuntu} from "next/font/google"

const ubuntu = Ubuntu({
    variable: "--font-ubuntu",
    weight: ["300", "400" , "500" , "700"],
    subsets: ["latin"]
})


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brainsmath | Mental Math Test",
  description: "Mental Math Testing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </Head>
      <body
        className={`${ubuntu.variable} antialiased overflow-x-hidden bg-background w-screen h-screen`}
        style={{ fontFamily: 'var(--font-ubuntu)' }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
