import React from "react";

const FlagIcon = ({ color }) => {
  return (
    <svg
      className="h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 21 20"
      fill={color ? color : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.02856 1.69269V18.3073"
        stroke={`${color ? color : "#5A6A85"}`}
        strokeWidth="1.35938"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.02856 3.35419H14.3327C16.5757 3.35419 17.0741 4.60028 15.4958 6.17867L14.4989 7.17554C13.8343 7.84012 13.8343 8.92007 14.4989 9.50158L15.4958 10.4985C17.0741 12.0768 16.4926 13.3229 14.3327 13.3229H5.02856"
        stroke={`${color ? color : "#5A6A85"}`}
        strokeWidth="1.35938"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FlagIcon;
