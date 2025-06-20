import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  addNotification,
} from "../features/notifications/notificationSlice";
import { io } from "socket.io-client";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
    const socket = io();
    socket.on("customerAdded", (data) => {
      dispatch(
        addNotification({
          type: "customerAdded",
          message: "New customer added",
          data,
        })
      );
    });
    socket.on("paymentReceived", (data) => {
      dispatch(
        addNotification({
          type: "paymentReceived",
          message: "Payment received",
          data,
        })
      );
    });
    socket.on("paymentOverdue", (data) => {
      dispatch(
        addNotification({
          type: "paymentOverdue",
          message: "Payment overdue",
          data,
        })
      );
    });
    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <div className="max-h-64 overflow-y-auto w-80 bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul>
        {list.map((n, i) => (
          <li key={i} className="border-b py-2 text-sm">
            <span className="font-semibold">[{n.type}]</span> {n.message}
            {n.data && (
              <span className="text-gray-500 ml-2">
                {JSON.stringify(n.data)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;
