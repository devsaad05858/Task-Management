import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import React, { useState } from "react";

const DefaultLayout = ({ header, children }) => {
  const [isFullWidth, setIsFullWidth] = useState(true);

  return (
    <div className="flex bg-primary/10 min-h-screen">
      <SideBar isFullWidth={isFullWidth} setIsFullWidth={setIsFullWidth} />
      <div className="w-full flex justify-start lg:justify-end">
        <div
          className={`${
            isFullWidth
              ? "w-full lg:w-[calc(100vw-271px)] xl:w-[calc(100vw-311px)]"
              : "w-full lg:w-[calc(100vw-100px)]"
          } transition-all duration-300`}
        >
          {header && <Header />}
          <div className="w-full overflow-y-auto overflow-x-hidden">
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DefaultLayout;
