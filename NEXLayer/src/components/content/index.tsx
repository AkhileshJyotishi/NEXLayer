"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tab";
interface ContentSectionProps {
  tabs: { value: string; label: string; content: JSX.Element }[];
}

const ContentSection: React.FC<ContentSectionProps> = ({
  tabs
}) => {


  return (
    <div className="mt-24 z-40 w-11/12 h-full sm:w-[90%] sm:h-[90%] my-auto rounded-md     mx-auto p-1 sm:p-4 text-white shadow-md">
      <Tabs defaultValue={tabs[0].value} className="  sm:flex sm:flex-col h-full ">
        <TabsList className="flex gap-4  sm:flex-row w-full">
          {tabs.map((tab) => (

            <TabsTrigger key={tab.value} value={tab.value} className="text-xl w-[150px]">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="h-[90%]" tabIndex={undefined}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

    </div>
  );
};

export default ContentSection;
