import React from "react";
import Header from "@/components/header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-grow px-6 py-2 sm:px-14 sm:py-6 md:px-32 md:py-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
