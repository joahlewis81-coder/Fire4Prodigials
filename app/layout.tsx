import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://fire4prodigals.com"),
  title: { default: "Fire4Prodigals", template: "%s · Fire4Prodigals" },
  description:
    "Fire4Prodigals brings prayer, encouragement, recovery support, and resource connections to people across North Carolina and beyond. Come as you are.",
  icons: { icon: "/brand/logo.png" },
  openGraph: { images: ["/images/photos/prayer-circle.webp"] },
};

export const viewport: Viewport = { themeColor: "#0d0b0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
