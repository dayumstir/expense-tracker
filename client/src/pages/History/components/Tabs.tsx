import React from "react";

type TabsProps = {};

export default function Tabs({}: TabsProps) {
  return (
    <div className="tabs mx-auto mt-4" >
      <a className="tab w-1/3">Date</a>
      <a className="tab tab-active w-1/3">Month</a>
      <a className="tab w-1/3">Year</a>
    </div>
  );
}
