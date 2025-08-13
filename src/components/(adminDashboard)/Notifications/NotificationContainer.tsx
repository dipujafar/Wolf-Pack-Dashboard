"use client";

import { Pagination, Spin, Empty, Button } from "antd";
import { useState } from "react";
import moment from "moment";
import { Trash2 } from "lucide-react";
import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useTestNotificationMutation,
} from "@/redux/api/notificationApi";
import { TNotification, TResponse } from "@/types";
import { Success_model } from "@/lib/utils";

const NotificationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching, refetch } = useGetNotificationsQuery([
    {
      label: "page",
      value: currentPage.toString(),
    },
    {
      label: "limit",
      value: pageSize.toString(),
    },
  ]);

  const [deleteNotification, { isLoading: isDeleting }] = useDeleteNotificationMutation();
  const [deleteAllNotification, { isLoading: isDeletingAll }] = useDeleteAllNotificationsMutation();
  const [create, { isLoading: isCreating }] = useTestNotificationMutation();

  const notificationResult = data?.data as TResponse<TNotification[]>;
  const meta = notificationResult?.meta;
  const notifications = notificationResult?.data || [];

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      //refetch();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotification(undefined).unwrap();
      Success_model({ title: "All notifications deleted successfully" });
    } catch (err) {
      console.error("Failed to delete all notifications", err);
    }
  };
  const testNotification = async () => {
    try {
      await create(undefined).unwrap();
      //Success_model({ title: "All notifications deleted successfully" });
    } catch (err) {
      console.error("Failed to delete all notifications", err);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='min-h-[80vh] p-7'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl text-text-color font-semibold'>Notifications</h1>
        {notifications.length > 0 && (
          <Button danger type='primary' onClick={handleDeleteAll} loading={isDeletingAll}>
            Delete All
          </Button>
        )}
        <Button danger type='primary' onClick={handleDeleteAll} loading={isDeletingAll}>
          Create Test Notification
        </Button>
      </div>
      <hr />

      {/* Notification List */}
      <div className='mt-6 space-y-5'>
        {notifications.length === 0 ? (
          <Empty description='No notifications found' />
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className='flex items-center gap-x-4 bg-white shadow rounded-lg p-4'
            >
              <div className='flex-1'>
                <div className='flex justify-between gap-x-2 items-center'>
                  <h5 className='font-medium text-lg text-text-color'>{notification.title}</h5>
                  <p className='text-gray-500 text-sm'>
                    {moment(notification.createdAt).fromNow()}
                  </p>
                </div>
                <p className='text-gray-500'>{notification.body}</p>
              </div>

              {/* delete single notification */}
              <div
                className='bg-[#D30000]/20 size-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-[#D30000]/40 transition'
                onClick={() => handleDeleteNotification(notification.id)}
              >
                <Trash2 color='#D30000' size={20} className={isDeleting ? "opacity-50" : ""} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {meta && meta.total > pageSize && (
        <div className='w-max mt-6 ml-auto'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={meta.total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
