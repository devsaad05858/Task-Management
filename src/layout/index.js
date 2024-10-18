"use client";
import React from "react";
import { useRouter } from "next/router";
import AnimatedComponent from "./animateLayout";
import DefaultLayout from "./defaultLayout";

const MainLayout = ({ children, layout = "default", header = true }) => {
  const { pathname } = useRouter();
  const renderLayout = () => {
    if (layout === "default") {
      return <DefaultLayout header={header}>{children}</DefaultLayout>;
    } else if (layout === "none") {
      return children;
    }
    return null;
  };

  return (
    <AnimatedComponent key={"animate-div--" + pathname}>
      {renderLayout()}
    </AnimatedComponent>
  );
};

export default MainLayout;
