"use client";

import { Error_Modal, Success_model } from "@/lib/utils";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/api/settingsApi";
import { TSettings } from "@/types";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsConditionsEditor = () => {
  const route = useRouter();
  const [value, setValue] = useState("");
  const [updateSetting] = useUpdateSettingsMutation();

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  const { data, isLoading } = useGetSettingsQuery([]);
  const settingsData = data?.data as TSettings;

  const handleUpdateSettings = async () => {
    try {
      await updateSetting({
        terms: value,
      }).unwrap();

      Success_model({ title: "Settings updated successfully" });
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };
  useEffect(() => {
    if (settingsData) {
      setValue(settingsData.terms);
    }
  }, [settingsData]);

  return (
    <>
      <div className='flex items-center gap-2'>
        <span
          onClick={() => route.back()}
          className='cursor-pointer bg-main-color p-2 rounded-full'
        >
          <FaArrowLeft size={20} color='#fff' />
        </span>
        <h4 className='text-2xl font-medium text-text-color'>Terms & Conditions</h4>
      </div>
      <ReactQuill
        modules={moduleConest}
        theme='snow'
        value={value}
        onChange={setValue}
        placeholder='Start writing ......'
        style={{
          border: "1px solid #EFE8FD",
          marginTop: "20px",
          borderRadius: "10px",
          background: "#68c0a114",
        }}
      />
      <Button
        size='large'
        className='bg-[#fcb806] hover:!bg-[#fcb806]/90 text-white hover:!text-white border-none'
        block
        style={{
          marginTop: "20px",
        }}
        onClick={handleUpdateSettings}
        disabled={!value || isLoading}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(TermsConditionsEditor), {
  ssr: false,
});
