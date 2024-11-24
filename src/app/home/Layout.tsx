import { ReactNode } from "react";
import Footer from "@/components/Footer";
import styles from "@/app/main.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Adjust the path based on your globals.css location.
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reantia",
  description:
    "Easily access and download a wide range of IT eBooks. Browse by category and get the resources you need with just a click—no limits, no hassle. Dive into your next great read today!",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${inter.className} text-base-content`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className={styles.menu}>
            <Sidebar />
          </div>
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <div className="sticky top-0 z-10">
              <Navbar />
            </div>
            {/* Content */}
            <main className="flex-1 overflow-y-auto p-2 bg-base-200">
              {children}
            </main>
            {/* Footer */}
            <div className="sticky bottom-0">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
