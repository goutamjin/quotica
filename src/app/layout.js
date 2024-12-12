// app/layout.js (Server-side component)
import React from "react";
import NavbarWithSubmenu from "./components/navibar";
import '../app/globals.css';
import BoxCardGrid from "./components/categories";
import ScrollToTopButton from "./components/scrol_to_top";
import HeadTag from "./components/head_tag";
import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)



export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <HeadTag/>
      <body className="bg-gray-100" >
        <NavbarWithSubmenu />
        <BoxCardGrid/>
        <ScrollToTopButton/>
        {/* <CookieConsent /> */}
       {/* Render the main content */}
        <main>{children}</main>

        <footer>© 2024 Quotica</footer>
      </body>
    </html>
  );
}
