import type { Metadata } from "next";
import "./globals.css";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// className={`${geistSans.variable} ${geistMono.variable}`}

export const metadata: Metadata = {
  title: "3D Plan Onlain",
  description: "3D Plan Onlain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <head>
        <meta name='description' content='3D Plan Onlain' />
        <meta name='keywords' content='3D Plan Onlain' />
        <title>3D Plan Onlain</title>
      </head>
      <body>
        <div className='app'>
          {children}
        </div>
      </body>
    </html>
  );
}
