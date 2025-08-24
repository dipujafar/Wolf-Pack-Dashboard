"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn, Error_Modal, Success_model } from "@/lib/utils";
import {
  useCreatePromotionalMessageMutation,
  useDeletePromotionMutation,
  useGetAllPromotionsQuery,
} from "@/redux/api/settingsApi";
import type { TResponse } from "@/types";
import type { TableProps } from "antd";
import { Popconfirm, Table, Tag } from "antd";
import { format } from "date-fns";
import { CalendarIcon, Clock, PlusCircle, Search, Trash2, X } from "lucide-react";
import moment, { isDate } from "moment";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface FormValues {
  title: string;
  message: string;
  date: Date | undefined;
  time: string;
  sendEmail: boolean;
  specificEmails: string[];
}

interface TPromotion {
  id: string;
  title: string;
  emails: string[];
  message: string;
  isTrigger: boolean;
  datetime: string;
}

const PromotionalMessagesContainer = () => {
  const route = useRouter();

  const [addCloserModal, setAddCloserModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");

  const [formData, setFormData] = useState<FormValues>({
    title: "",
    message: "",
    date: undefined,
    time: "",
    sendEmail: false,
    specificEmails: [],
  });

  const { data, isLoading } = useGetAllPromotionsQuery([
    { label: "page", value: page.toString() },
    { label: "limit", value: pageSize.toString() },
    { label: "searchTerm", value: search },
  ]);

  const [deletePromotion, { isLoading: isDeleteLoading }] = useDeletePromotionMutation();

  const [createPromotionalMessage, { isLoading: isCreateLoading }] =
    useCreatePromotionalMessageMutation();

  const promotionData = data as TResponse<TPromotion[]>;
  const meta = promotionData?.meta;

  const handleDeletePromotion = async (id: string) => {
    try {
      await deletePromotion(id).unwrap();
      Success_model({ title: "Promotional message deleted successfully" });
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleCreatePromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        message: formData.message,
        datetime:
          formData.date &&
          formData.time &&
          `${moment(formData.date).format("YYYY-MM-DD")} ${formData.time}`,
        emails: formData.specificEmails,
      };

      await createPromotionalMessage({ ...payload }).unwrap();

      Success_model({ title: "Promotional message created successfully" });

      setAddCloserModal(false);
      setFormData({
        title: "",
        message: "",
        date: undefined,
        time: "",
        sendEmail: false,
        specificEmails: [],
      });
      setEmailInput("");
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleInputChange = (field: keyof FormValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEmail = () => {
    const trimmedEmail = emailInput.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      Error_Modal({ title: "Please enter an email address" });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      Error_Modal({ title: "Please enter a valid email address" });
      return;
    }

    if (formData.specificEmails.includes(trimmedEmail)) {
      Error_Modal({ title: "Email already added" });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      specificEmails: [...prev.specificEmails, trimmedEmail],
    }));
    setEmailInput(""); // Clear the email input after adding
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      specificEmails: prev.specificEmails.filter((e) => e !== email),
    }));
  };

  const handleRemoveDate = () => {
    setFormData((prev) => ({
      ...prev,
      date: undefined,
    }));
  };

  const handleRemoveTime = () => {
    setFormData((prev) => ({
      ...prev,
      time: "",
    }));
  };

  const columns: TableProps<TPromotion>["columns"] = [
    {
      title: "Serial",
      dataIndex: "id",
      align: "center",
      width: 80,
      render: (_, __, index) => (
        <span className='font-medium'>#{(page - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "left",
      render: (title) => <span className='font-medium'>{title}</span>,
    },
    {
      title: "Emails",
      dataIndex: "emails",
      align: "left",
      render: (emails: string[]) => (
        <div className='flex flex-wrap gap-1'>
          {emails?.length
            ? emails.map((email, index) => (
                <Tag key={index} color='gold' className='text-xs'>
                  {email}
                </Tag>
              ))
            : "SEND INTO ALL-USERS"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isTrigger",
      align: "center",
      render: (status) => (
        <Tag color={status ? "green" : "red"} className='text-xs'>
          {status ? "Triggered Successfully" : "Not Triggered"}
        </Tag>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      align: "left",
      width: 300,
      render: (message) => (
        <p className='truncate max-w-xs' title={message}>
          {message}
        </p>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      align: "center",
      render: (date) => (isDate(data) ? moment(date).format("LLL") : date),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title='Are you sure to delete this promotion?'
          description={`This action cannot be undone.`}
          onConfirm={() => handleDeletePromotion(record?.id)}
          okText='Yes'
          cancelText='No'
        >
          <Button
            variant='ghost'
            size='sm'
            className='text-destructive hover:text-destructive hover:bg-destructive/10'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className='mx-auto space-y-6'>
        {/* Header Section */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <span
              onClick={() => route.back()}
              className='cursor-pointer bg-main-color p-2 rounded-full'
            >
              <FaArrowLeft size={20} color='#fff' />
            </span>
            <h4 className='text-2xl font-medium text-text-color'>Promotional Messages</h4>
          </div>
          <div>
            <Dialog open={addCloserModal} onOpenChange={setAddCloserModal}>
              <DialogTrigger asChild>
                <Button className='flex items-center gap-2 h-11 px-6 bg-[#111827]'>
                  <PlusCircle className='h-4 w-4' />
                  Create Promotional Message
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle>Create Promotional Message</DialogTitle>
                  <DialogClose>
                    <X className='h-4 w-4 cursor-pointer' />
                  </DialogClose>
                </DialogHeader>
                <form onSubmit={handleCreatePromotion} className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input
                      id='title'
                      placeholder='Enter promotion title'
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='message'>Promotional Message</Label>
                    <Textarea
                      id='message'
                      placeholder='Enter your promotional message here...'
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label>Select Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={formData.date}
                            onSelect={(date) => handleInputChange("date", date)}
                          />
                        </PopoverContent>
                      </Popover>
                      {formData.date && (
                        <Button
                          variant='outline'
                          className='mt-2 w-full text-destructive'
                          onClick={handleRemoveDate}
                        >
                          Remove Date
                        </Button>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='time'>Select Time (Optional)</Label>
                      <div className='relative'>
                        <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='time'
                          type='time'
                          className='pl-10'
                          value={formData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                        />
                      </div>
                      {formData.time && (
                        <Button
                          variant='outline'
                          className='mt-2 w-full text-destructive'
                          onClick={handleRemoveTime}
                        >
                          Remove Time
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='sendEmail'
                        checked={formData.sendEmail}
                        onCheckedChange={(checked) => handleInputChange("sendEmail", checked)}
                      />
                      <Label htmlFor='sendEmail' className='text-sm font-medium'>
                        Send to specific emails
                      </Label>
                    </div>

                    {formData.sendEmail && (
                      <div className='space-y-3'>
                        <Label htmlFor='specificEmail'>Add Email Addresses</Label>
                        <div className='flex gap-2'>
                          <Input
                            id='specificEmail'
                            type='email'
                            placeholder='Enter email address'
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyPress={handleEmailKeyPress}
                          />
                          <Button
                            type='button'
                            onClick={handleAddEmail}
                            className='bg-[#111827] text-white whitespace-nowrap'
                          >
                            Add Email
                          </Button>
                        </div>

                        {formData.specificEmails.length > 0 && (
                          <div className='space-y-2'>
                            <Label className='text-sm text-muted-foreground'>
                              Added Emails ({formData.specificEmails.length}):
                            </Label>
                            <div className='flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md min-h-[40px]'>
                              {formData.specificEmails.map((email, index) => (
                                <div
                                  key={index}
                                  className='inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm'
                                >
                                  <span>{email}</span>
                                  <button
                                    type='button'
                                    onClick={() => handleRemoveEmail(email)}
                                    className='ml-1 text-yellow-600 hover:text-yellow-800 focus:outline-none'
                                  >
                                    <X className='h-3 w-3' />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Button type='submit' disabled={isCreateLoading} className='w-full bg-[#111827]'>
                    Create Promotion
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className='bg-[#fff]/15 border border-[#EBEBEB]/50'>
          <CardContent className='p-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute border-none outline-none ring-0 left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search promotional messages...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='pl-10 placeholder:text-white text-white'
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className='bg-transparent border-none shadow-none'>
          <CardHeader>
            <CardTitle className='text-white'>Promotional Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={columns}
              loading={isLoading}
              dataSource={promotionData?.data ?? []}
              rowKey='id'
              pagination={{
                current: page,
                pageSize: pageSize,
                total: meta?.total || 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (newPage, newPageSize) => {
                  setPage(newPage);
                  setPageSize(newPageSize || 10);
                },
              }}
              scroll={{ x: 800 }}
              className='ant-table-custom'
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromotionalMessagesContainer;
