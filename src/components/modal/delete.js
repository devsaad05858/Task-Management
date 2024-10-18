import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../common/button";
import { useUi } from "@/hooks/useUserInterface";
import axios from "axios";
import toast from "react-hot-toast";
import { useTask } from "@/hooks/useTask";
import { useTranslation } from "react-i18next";

const Delete = () => {
  const { deleteTask } = useTask();
  const { modalState, hideModal } = useUi();
  const { task } = modalState;
  const { t } = useTranslation("common");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/tasks/${task._id}`);

      if (response.status === 200) {
        toast.success("Task deleted successfully");
        hideModal();
        deleteTask(task._id);
      }
    } catch (error) {
      toast.error(
        `Failed to delete task: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center overflow-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-11/12 md:w-[590px] mx-auto flex flex-col items-center py-5 px-16 gap-4"
      >
        <RiDeleteBinLine className="text-6xl text-red p-3 bg-red/10 rounded-full" />
        <h1 className="text-primary text-xl mb-5">
          {t("confirmation_message")}
        </h1>
        <div className="flex items-center gap-5 w-full">
          <Button
            text={t("cancel")}
            className="w-full"
            variant="outline"
            onClick={hideModal}
          />
          <Button
            text={t("delete")}
            className="w-full"
            animation
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Delete;
