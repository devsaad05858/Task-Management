import React from "react";

const TaskIcon = ({ isFullWidth, isActive, path }) => {
  return (
    <svg
      width={isFullWidth ? 31 : 50}
      height={isFullWidth ? 30 : 50}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4625 11.1H22.025"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.97498 11.1L8.91248 12.0375L11.725 9.22501"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4625 19.85H22.025"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.97498 19.85L8.91248 20.7875L11.725 17.975"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
        fill="white"
        fillOpacity={`${isFullWidth || isActive(path) ? "0.2" : "5%"}`}
      />
    </svg>
  );
};

export default TaskIcon;
