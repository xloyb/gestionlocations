"use client";
/* eslint-disable @next/next/no-img-element */
import styles from "@/app/main.module.css";
import Footer from "@/components/Footer";
import Hero from "@/components/index/Hero";
import IndexNav from "@/components/index/IndexNav";

const Homepage = () => {
  const Settings = {
    sitename: "Gestion Location",
    announcement: "Welcome to our platform!",
    offer: "Get 20% off on all services this month!",
    logo: "/path/to/logo.png",
    theme: "dark",
    discordLogs: true,
    exchangeSystem: true,
    storeSystem: true,
    ticketSystem: true,
  };

  return (
    <div className="h-screen flex flex-col" suppressHydrationWarning>
      <div className="flex-grow bg-base-200">
        <IndexNav />
        <Hero />

      </div>

      <div className="sticky bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
