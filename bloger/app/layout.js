import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Binary Tech",
  description: "The blogging site about Programming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" 
    suppressHydrationWarning={true} 
    >
       
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html >
  );
}
