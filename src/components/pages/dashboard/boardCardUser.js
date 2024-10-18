import Image from "next/image";
import React from "react";

const BoardCardUser = ({ user, className }) => {
  return (
    <div
      className={`h-8 w-8 rounded-full border-2 border-white ${className} cursor-pointer`}
    >
      <Image
        title={user?.name}
        height={3233}
        width={3233}
        alt="user-img"
        src={user?.imageUrl || "/images/default-user.png"}
        className="rounded-full h-8 w-8"
      />
    </div>
  );
};

export default BoardCardUser;
