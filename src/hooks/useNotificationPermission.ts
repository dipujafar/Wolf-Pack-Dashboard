import { messaging } from "@/lib/firebase/firebase";
import { getToken } from "firebase/messaging";
import { useEffect } from "react";

export const useNotificationPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      if (!messaging) {
        console.warn("Firebase Messaging is not initialized.");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
          });
          console.log("Notification token:", token);
        } catch (error) {
          console.error("Failed to retrieve token:", error);
        }
      } else {
        console.warn("Notification permission denied.");
      }
    };
    requestPermission();
  }, []);
};
