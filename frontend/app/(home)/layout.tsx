import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="mt-20 pb-4 w-full max-w-[1280px] px-6 flex flex-col flex-grow">
        {children}
      </div>
      <Navbar />
    </>
  );
}
