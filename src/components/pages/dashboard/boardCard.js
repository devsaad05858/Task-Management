import DateIcon from "@/components/icon/dateIcon";
import React, { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BoardCardUser from "./boardCardUser";
import CardDropdown from "@/components/dropdown/cardDropDown";

const BoardCard = ({ task }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideDropdown =
        showDropdownRef.current &&
        showDropdownRef.current.contains(event.target);

      if (!isClickInsideDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg border border-primary/20 px-2.5 py-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          className={`px-2.5 py-[3px] rounded-[32px] text-[10px] lexend-deca-font capitalize ${
            task.priority === "urgent"
              ? "bg-red/35 text-red"
              : task.priority === "high"
              ? "bg-yellow/35 text-yellow"
              : task.priority === "medium"
              ? "bg-blue/15 text-blue"
              : task.priority === "low" && "bg-lightBlue/35 text-lightBlue"
          }`}
        >
          {task.priority ?? "--"}
        </button>
        <div
          className="relative"
          ref={showDropdownRef}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <BiDotsVerticalRounded className="text-xl text-primary cursor-pointer" />
          {showDropdown && <CardDropdown task={task} />}
        </div>
      </div>
      <div className="flex flex-col gap-[2px] lexend-deca-font">
        <h1 className="text-lightBlack font-medium ">
          {task.title ?? "No Title"}
        </h1>
        <p className="text-gray text-[10px]">
          by {task.createdBy.name ?? "--"}
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs lexend-deca-font text-[#797979]">
        <DateIcon />
        Due Date {formatDate(task.endDate) ?? "--"}
      </div>
      <div className="flex items-center">
        {task?.assignedUsers?.map((user, index) => (
          <BoardCardUser
            user={user}
            key={"user--" + user?.name + user?.id}
            className={`-ml-3 ${index === 0 ? "ml-0" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardCard;
