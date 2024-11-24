import { Inter } from "next/font/google";
import Script from "next/script";
import "../app/globals.css";
import Sidebar from "@/components/Sidebar";
import styles from "@/app/main.module.css";
import Navbar from "./Navbar";


const inter = Inter({ subsets: ["latin"] });

export default function Layout1({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-y-auto">
          <Navbar />
          <div className="overflow-y-auto">
            <>{children}</>
          </div>
        </div>
      </div>
    </div>
  );
}