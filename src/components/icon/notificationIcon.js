import React from "react";

const NotificationIcon = ({ isFullWidth, isActive, path }) => {
  return (
    <svg
      width={isFullWidth ? 31 : 50}
      height={isFullWidth ? 30 : 50}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0261 2.5C10.4261 2.5 6.70109 6.225 6.70109 10.825V13.45C6.70109 14.3 6.35109 15.575 5.91359 16.3L4.32609 18.95C3.35109 20.5875 4.02609 22.4125 5.82609 23.0125C11.8011 25 18.2636 25 24.2386 23.0125C25.9261 22.45 26.6511 20.475 25.7386 18.95L24.1511 16.3C23.7136 15.575 23.3636 14.2875 23.3636 13.45V10.825C23.3511 6.25 19.6011 2.5 15.0261 2.5Z"
        fill="white"
        fillOpacity={`${isFullWidth || isActive(path) ? "0.2" : "5%"}`}
      />
      <path
        d="M15 8.04999V12.2125"
        stroke="white"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M19.1625 23.525C19.1625 25.8125 17.2875 27.6875 15 27.6875C13.8625 27.6875 12.8125 27.2125 12.0625 26.4625C11.3125 25.7125 10.8375 24.6625 10.8375 23.525"
        fill="white"
      />
    </svg>
  );
};

export default NotificationIcon;
