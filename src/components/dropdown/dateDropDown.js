import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/common/button";
import DateIcon from "@/components/icon/dateIcon";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../languageSwitcher/languageContext";

const DateDropDown = ({ onSelectDate, dueDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState("startDate");
  const { t } = useTranslation("common");
  const direction = useLanguage();

  useEffect(() => {
    if (dueDate?.startDate) {
      setStartDate(new Date(dueDate.startDate));
    }
    if (dueDate?.endDate) {
      setEndDate(new Date(dueDate.endDate));
    }
  }, [dueDate]);

  const handleDateChange = (date, type) => {
    if (type === "startDate") {
      setStartDate(date);
      onSelectDate({ startDate: date, endDate }); // only update startDate
    } else {
      setEndDate(date);
      onSelectDate({ startDate, endDate: date }); // only update endDate
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-[298px] border border-lightBlue/20 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="pb-4 flex items-center gap-2.5 border-b border-lightBlue/20 w-full justify-between">
          <Button
            onClick={() => setShowCalendar("startDate")}
            padding={`py-2 ${
              direction === "ltr" ? "pr-7 pl-2.5" : "pl-7 pr-2.5"
            } `}
            buttonColor={`${
              showCalendar === "startDate" ? "lightBlue" : "white"
            }`}
            color="bg-lightBlue"
            className="text-xs font-light lexent-deca-font bg-opacity-15 w-full border border-lightBlue/15"
            radius="rounded-lg"
            text={t("start_date")}
            icon={<DateIcon />}
          />
          <Button
            onClick={() => setShowCalendar("endDate")}
            padding={`py-2 ${
              direction === "ltr" ? "pr-7 pl-2.5" : "pl-7 pr-2.5"
            } `}
            buttonColor={`${
              showCalendar === "endDate" ? "lightBlue" : "white"
            }`}
            color="bg-lightBlue"
            className="text-xs font-light lexent-deca-font bg-opacity-15 w-full border border-lightBlue/15"
            radius="rounded-lg"
            text={t("end_date")}
            icon={<DateIcon />}
          />
        </div>
        {showCalendar === "startDate" ? (
          <Calendar
            value={startDate}
            onChange={(e) => handleDateChange(e.value, "startDate")}
            inline
            showIcon
            dateFormat="yy-mm-dd"
          />
        ) : (
          <Calendar
            value={endDate}
            onChange={(e) => handleDateChange(e.value, "endDate")}
            inline
            showIcon
            dateFormat="yy-mm-dd"
          />
        )}
      </div>
    </motion.div>
  );
};

export default DateDropDown;
