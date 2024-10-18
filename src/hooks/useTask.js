import { taskAction } from "@/store/action/taskAction";
import { useAppDispatch, useAppSelector } from "./useStore";
import {
  addTask,
  updateTask,
  updateTaskStatus,
  deleteTask as removeTask,
} from "@/store/slices/task.slice";

export const useTask = () => {
  const state = useAppSelector((state) => state.getTasks);
  const dispatch = useAppDispatch();

  const refetchTask = () => dispatch(taskAction());

  const updateTasks = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, newStatus }));
  };

  const addNewTask = (task) => {
    dispatch(addTask(task));
  };

  const editTask = (taskId, updatedTask) => {
    dispatch(updateTask({ taskId, updatedTask }));
  };

  const deleteTaskById = (taskId) => {
    dispatch(removeTask(taskId));
  };

  return {
    ...state,
    refetchTask,
    updateTasks,
    editTask,
    addNewTask,
    deleteTask: deleteTaskById,
  };
};
