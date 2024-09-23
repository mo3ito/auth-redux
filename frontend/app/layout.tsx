import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import ToastifyProvider from "@/providers/ToastifyProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="en">
      <ReduxProvider>
        <body>
          {children}
          <ToastifyProvider />
        </body>
      </ReduxProvider>
    </html>
  );
}