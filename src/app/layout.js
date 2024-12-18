// app/layout.js (Server-side component)
import React from "react";
import NavbarWithSubmenu from "./components/navibar";
import '../app/globals.css';
import ScrollToTopButton from "./components/scrol_to_top";
import { meta } from "./components/head_tag";
import { loadEnvConfig } from '@next/env';
import Footer from "./components/footer";
import Head from "next/head";
import AdBlockDetection from "./components/AdBlockDetection";

// Load environment variables
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const metadata = () => {
  return meta;
};

export default function RootLayout({ children }) {
  return (
    <html>
      <Head>
       </Head>
      <body className="bg-gray-100">
        <NavbarWithSubmenu />
        <AdBlockDetection />
        <ScrollToTopButton />
        <main>{children}</main>
        <Footer />
       
      </body>
    </html>
  );
}
