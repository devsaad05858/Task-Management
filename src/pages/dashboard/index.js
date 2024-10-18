import io from "socket.io-client";
import BoardContainer from "@/components/pages/dashboard/boardContainer";
import { allEnums } from "@/constants/enums";
import { useTask } from "@/hooks/useTask";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

let socket;

function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const { refetchTask, data: taskData, updateTasks } = useTask();
  const { query } = useSelector((state) => state.searchSlice);
  const { t } = useTranslation("common");

  useEffect(() => {
    refetchTask();
    setIsClient(true);
  }, []);

  const { data: session } = useSession();

  // Initialize socket connection and listen for notifications
  useEffect(() => {
    if (session) {
      const socket = io({
        path: "/api/socketio", // Ensure the path matches your server
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        const channelName = `notification-${session.user.id}`;
        console.log(channelName);

        // Listen for task notifications
        socket.on(channelName, (data) => {
          toast.success(data.message);
          refetchTask();
        });
      });

      socket.on("connect_error", (err) => {
        console.error("Connection failed:", err.message);
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [session]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch("/api/tasks/status", {
        taskId,
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success("Task status updated!");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId;
      const taskId = draggableId;

      updateTasks(taskId, newStatus);

      await updateTaskStatus(taskId, newStatus);
    }
  };

  const filteredTasks = query
    ? taskData.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      )
    : taskData;

  return (
    isClient && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Toaster />
        <div className="px-2 md:px-6 lg:px-8 xl:px-12 py-9 flex gap-4 w-full overflow-x-auto notification-scroll">
          {allEnums.boards.map(({ label, value }, index) => (
            <Droppable key={value} droppableId={value}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col"
                >
                  <BoardContainer
                    key={"board--" + label + index}
                    label={t(value)}
                    tasks={filteredTasks.filter(
                      (task) => task.status === value
                    )}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    )
  );
}

export default Dashboard;
