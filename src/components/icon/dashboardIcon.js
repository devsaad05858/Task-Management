import { useRouter } from "next/router";
import React from "react";

const DashboardIcon = ({ isFullWidth, isActive, path }) => {
  return (
    <svg
      width={isFullWidth ? 31 : 50}
      height={isFullWidth ? 30 : 50}
      className=""
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.75 27.5H19.25C25.5 27.5 28 25 28 18.75V11.25C28 5 25.5 2.5 19.25 2.5H11.75C5.5 2.5 3 5 3 11.25V18.75C3 25 5.5 27.5 11.75 27.5Z"
        fill="white"
        fillOpacity={`${isFullWidth || isActive(path) ? "0.2" : "5%"}`}
      />
      <path
        d="M9.66248 18.1125L12.6375 14.25C13.0625 13.7 13.85 13.6 14.4 14.025L16.6875 15.825C17.2375 16.25 18.025 16.15 18.45 15.6125L21.3375 11.8875"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 10C27.5711 10 29.25 8.32107 29.25 6.25C29.25 4.17893 27.5711 2.5 25.5 2.5C23.4289 2.5 21.75 4.17893 21.75 6.25C21.75 8.32107 23.4289 10 25.5 10Z"
        fill="white"
      />
    </svg>
  );
};

export default DashboardIcon;
