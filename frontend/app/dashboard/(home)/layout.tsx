import React from "react";

export default function Layout({
  children,
  applications,
}: Readonly<{ children: React.ReactNode; applications: React.ReactNode }>) {
  return (
    <>
      {children}
      {applications}
    </>
  );
}
