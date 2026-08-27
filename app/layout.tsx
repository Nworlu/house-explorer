import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const display = Newsreader({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "HomeView", template: "%s · HomeView" },
  description: "Data-driven 3D property exploration for the web.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html>;
}
