import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function ApplicationTabs() {
  return (
    <TabsList>
      <TabsTrigger value="responses">Responses</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
  );
}
