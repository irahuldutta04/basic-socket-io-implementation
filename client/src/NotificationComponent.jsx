import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to fetch notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Initial fetch of notifications when component mounts
    fetchNotifications();

    // Listen for 'newProduct' event from the server
    socket.on("newProduct", () => {
      // When a new product is created, fetch notifications again
      fetchNotifications();
    });

    // Clean up function to remove the event listener when component unmounts
    return () => {
      socket.off("newProduct");
    };
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
