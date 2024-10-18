import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../common/button";
import User from "../icon/userIcon";
import CalendarIcon from "../icon/calendarIcon";
import FlagIcon from "../icon/flagIcon";
import ClipBoardIcon from "../icon/clipBoardIcon";
import AssignDropDown from "../dropdown/assignDropDown";
import DateDropDown from "../dropdown/dateDropDown";
import PriorityDropDown from "../dropdown/priorityDropDown";
import { useUi } from "@/hooks/useUserInterface";
import axios from "axios";
import toast from "react-hot-toast";
import { useTask } from "@/hooks/useTask";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../languageSwitcher/languageContext";

const CreateTaskModal = () => {
  const { addNewTask, editTask } = useTask();
  const { hideModal, modalState } = useUi();
  const { task } = modalState;
  const { t } = useTranslation("common");
  const { direction } = useLanguage();

  const mappedAssignedUsers =
    task?.assignedUsers?.map((item) => item?._id) || [];

  const [taskName, setTaskName] = useState(task?.title || "");
  const [assignedUsers, setAssignedUsers] = useState(mappedAssignedUsers);
  const [dueDate, setDueDate] = useState({
    startDate: task?.startDate,
    endDate: task?.endDate,
  });
  const [priority, setPriority] = useState(task?.priority || undefined);

  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const assignDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAssign =
        assignDropdownRef.current &&
        assignDropdownRef.current.contains(event.target);
      const isClickInsideDate =
        dateDropdownRef.current &&
        dateDropdownRef.current.contains(event.target);
      const isClickInsidePriority =
        priorityDropdownRef.current &&
        priorityDropdownRef.current.contains(event.target);

      if (
        !isClickInsideAssign &&
        !isClickInsideDate &&
        !isClickInsidePriority
      ) {
        setShowAssignDropdown(false);
        setShowDateDropdown(false);
        setShowPriorityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const createOrUpdateTask = async () => {
    try {
      const taskData = {
        title: taskName,
        assignedUsers,
        startDate: dueDate.startDate,
        endDate: dueDate.endDate,
        priority,
      };

      let response;
      if (task) {
        response = await axios.put(`/api/tasks/${task._id}`, taskData);
        editTask(task._id, response.data);
      } else {
        response = await axios.post("/api/tasks", taskData);
        addNewTask(response.data);
      }

      if (response && response.status === (task ? 200 : 201)) {
        hideModal();
        toast.success(task ? t("task_updated") : t("task_created"));
      }
    } catch (error) {
      toast.error(
        "Failed to " + (task ? "update" : "create") + " task: " + error.message
      );
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center overflow-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-11/12 md:w-[590px] mx-auto"
      >
        <div className="p-4 md:p-5 border-b border-lightBlue/20 w-full flex items-center justify-between">
          <h1 className="text-primary text-xl md:text-2xl font-medium lexend-deca-font">
            {task ? t("update_task") : t("create_task")}
          </h1>
          <RxCross2
            onClick={hideModal}
            className="text-xl text-primary cursor-pointer"
          />
        </div>
        <div className="p-5 md:p-6 flex flex-col w-full gap-6">
          <h1 className="text-base md:text-lg font-medium lexend-deca-font">
            {t("task_name")}
          </h1>
          <div className="relative">
            <div
              className={`absolute top-2 ${
                direction === "ltr" ? "left-2.5" : "right-2.5"
              } `}
            >
              <ClipBoardIcon />
            </div>
            <textarea
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className={`w-full rounded-md min-h-36 bg-lightBlue/15 pt-1.5 pl-9 ${
                direction === "ltr" ? "pr-2.5" : "pr-10"
              }  text-lightBlue lexend-deca-font outline-none font-light resize-none text-sm md:text-base`}
              placeholder={t("task_name")}
            />
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <div
              ref={assignDropdownRef}
              onClick={() => {
                setShowAssignDropdown(!showAssignDropdown);
                setShowDateDropdown(false);
                setShowPriorityDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text={t("assign")}
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<User />}
              />
              {showAssignDropdown && (
                <AssignDropDown
                  onSelect={(users) => setAssignedUsers(users)}
                  assignedUsers={assignedUsers}
                />
              )}
            </div>
            <div
              ref={dateDropdownRef}
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowPriorityDropdown(false);
                setShowAssignDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text={t("due_date")}
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<CalendarIcon />}
              />
              {showDateDropdown && (
                <DateDropDown
                  onSelectDate={(date) => setDueDate(date)}
                  dueDate={dueDate}
                />
              )}
            </div>
            <div
              ref={priorityDropdownRef}
              onClick={() => {
                setShowPriorityDropdown(!showPriorityDropdown);
                setShowDateDropdown(false);
                setShowAssignDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text={t("priority")}
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<FlagIcon />}
              />
              {showPriorityDropdown && (
                <PriorityDropDown
                  selectedpriority={priority}
                  setPriority={setPriority}
                  onSelectPriority={(priority) => setPriority(priority)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-6 px-5 md:px-9 border-t border-zinc-300 flex justify-end">
          <Button
            padding="py-2.5 px-5"
            buttonColor="primary"
            radius="rounded-lg"
            color="white"
            className="lexend-deca-font font-light text-xs md:text-sm"
            text={task ? t("update_task") : t("create_task")}
            animation
            onClick={createOrUpdateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
