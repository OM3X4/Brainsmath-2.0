import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "./Components/Navbar";
import { FontProvider } from "./context/FontContext";
import { Roboto, JetBrains_Mono , IBM_Plex_Sans , Ubuntu} from 'next/font/google';
import Footer from "./Components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'], // Choose the weights you need
  display: 'swap',
  variable: '--font-ibm' // optional for CSS variables
})

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
    <html lang="en" className={`
      ${roboto.variable}
      ${jetbrains.variable}
      ${ibmPlexSans.variable}
      ${ubuntu.variable}
      ${geistSans.variable}
      ${geistMono.variable}
    `}>
        {/* Google Analytics script for loading gtag.js */}

      <Head>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `
          }}
        ></script>
      </Head>
      <body
        className={` antialiased overflow-x-hidden bg-background w-screen h-screen`}
        style={{ fontFamily: 'var(--font-ubuntu)' }}
      >
        <GoogleAnalytics gaId="G-S42CJ0GTXJ" />
        <FontProvider>
          <div className="w-screen min-h-screen">
            <Navbar />
            {children}
          </div>
          <Footer />
        </FontProvider>
      </body>
    </html>
  );
}
