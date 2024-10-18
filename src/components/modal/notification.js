import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../languageSwitcher/languageContext";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");
  const { direction } = useLanguage();

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/notifications", {
        params: { page: 1, limit: 10 }, // Adjust limit as needed
      });
      setNotifications(response.data.notifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications", error);
      setLoading(false);
    }
  };

  // Initialize socket connection and listen for notifications
  useEffect(() => {
    if (session) {
      // Ensure the socket connects to the right endpoint
      const socket = io({
        path: "/api/socketio", // Ensure the path matches your server
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        const channelName = `notification-${session.user.id}`;
        console.log(channelName);

        // Listen for task notifications
        socket.on(channelName, (data) => {
          fetchNotifications();
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

  // Initial fetch of notifications
  useEffect(() => {
    if (session) {
      fetchNotifications();
    }
  }, [session]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-64 md:w-[300px] bg-white rounded-md absolute top-20 ${
        direction === "ltr"
          ? "right-2 md:right-6 lg:right-8 xl:right-12"
          : "left-2 md:left-6 lg:left-8 xl:left-12"
      }`}
    >
      <Toaster />
      <div className="p-4 md:p-5 border-b border-lightBlue/20 w-full flex items-center justify-between bg-primary rounded-t-md">
        <h1 className="text-white text-base md:text-xl font-medium lexend-deca-font">
          {t("notifications")}
        </h1>
      </div>
      <div className="h-[450px] lg:h-[500px] overflow-y-scroll notification-scroll">
        {loading ? (
          <p className="text-center">{t("loading_notifications")}</p>
        ) : (
          notifications?.map((item, index) => (
            <div
              className="flex gap-1.5 p-4 md:p-5"
              key={"notifications--" + index}
            >
              <div className="flex flex-col gap-2.5 w-full">
                <div className="w-full flex items-center">
                  <h1 className="text-xs lexend-deca-font text-black">
                    {item?.name}{" "}
                    <span className="text-gray">{item?.message}</span>
                  </h1>
                </div>
                <p className="text-xs text-gray">
                  {new Date(item?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
