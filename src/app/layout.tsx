import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NameProvider } from "../Context/NameContext";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose what you need
  variable: "--font-poppins",
  display: "swap",
});
export const metadata: Metadata = {
  title: "LearnQ Quiz App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <NameProvider>{children}</NameProvider>
      </body>
    </html>
  );
}
