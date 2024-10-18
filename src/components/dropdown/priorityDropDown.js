import React from "react";
import { motion } from "framer-motion";
import FlagIcon from "../icon/flagIcon";
import { MdBlock } from "react-icons/md";
import { allEnums } from "@/constants/enums";
import { useTranslation } from "react-i18next";

const PriorityDropDown = ({
  selectedpriority,
  onSelectPriority,
  setPriority,
}) => {
  const { t } = useTranslation("common");
  const handlePrioritySelect = (priority) => {
    onSelectPriority(priority);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-32 border border-lightBlue/20 z-10 flex flex-col gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2.5 pb-0 w-full">
        {allEnums.priority.map((priority, index) => {
          return (
            <div
              key={"priority--" + index}
              onClick={() => handlePrioritySelect(priority.value)}
              className={`w-full py-1.5 px-2.5 flex items-center gap-1.5 font-light text-lightBlue lexend-deca-font text-xs ${
                selectedpriority === priority.value && "bg-lightBlue/10"
              } hover:bg-lightBlue/10 rounded-md cursor-pointer transition-all duration-300 mb-[2px]`}
            >
              <FlagIcon color={priority.color} />
              {t(priority.value)}
            </div>
          );
        })}
      </div>
      <hr className="border border-lightBlue/25" />
      <div onClick={() => setPriority(null)} className="w-full px-2.5 pb-2.5">
        <div className="w-full py-1.5 px-2.5 flex items-center gap-1.5 font-light text-lightBlue lexend-deca-font text-xs hover:bg-lightBlue/10 rounded-md cursor-pointer transition-all duration-300">
          <MdBlock className="text-lg text-lightBlue" />
          {t("clear_all")}
        </div>
      </div>
    </motion.div>
  );
};

export default PriorityDropDown;
