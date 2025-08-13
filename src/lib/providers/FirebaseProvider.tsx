"use client";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/userApi";
import React, { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import CustomToast from "@/components/shared/CustomToast";
import { useGetNotificationsQuery } from "@/redux/api/notificationApi";
import { TUser } from "@/types";
import useFcmToken from "@/hooks/useFcmToken";
import { firebaseApp } from "../firebase/firebase";
const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const { refetch } = useGetNotificationsQuery([]);
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isLoading } = useGetProfileQuery([]);
  const user = data?.data as TUser;
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (fcmToken && notificationPermissionStatus === "granted" && !isLoading && !user?.fcmToken) {
      const formData = new FormData();

      const data = {
        fcmToken: fcmToken,
      };
      refetch();
      formData.append("data", JSON.stringify(data));
      updateProfile(formData);
    }
  }, [fcmToken, notificationPermissionStatus, updateProfile, isLoading, user, refetch]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.notification?.title && payload.notification?.body) {
          refetch();
          toast.custom((t) => (
            <CustomToast title={payload.notification?.title} body={payload.notification?.body} />
          ));
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [refetch]);

  return <>{children}</>;
};

export default FirebaseProvider;
