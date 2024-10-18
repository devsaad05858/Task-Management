import Notification from "@/models/Notification";

const sendNotification = async (taskId, userIds, message, io) => {
  try {
    console.log("Sending notification start");

    // Create notifications in the database for all users in parallel
    await Promise.all(
      userIds.map(async (userId) => {
        const channelName = `notification-${userId.toString()}`;
        console.log(channelName);

        // Create the notification in the database
        await Notification.create({
          user: userId,
          message,
          taskId,
        });

        // Emit the notification via socket.io to the user's specific room
        io.emit(channelName, { message, taskId });
      })
    );
  } catch (error) {
    console.error("Error sending notification", error);
  }
};

export default sendNotification;
