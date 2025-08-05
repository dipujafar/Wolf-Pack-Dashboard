"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Success_model } from "@/lib/utils";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type FieldType = {
  otp?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const VerifyEmailForm = () => {
  const route = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [reSendOtp] = useResendOtpMutation();

  //handle otp verification
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await verifyOtp({ otp: Number(values?.otp) }).unwrap();
      if (res.success) {
        //sessionStorage.setItem("token", res?.data?.token);
        Success_model({ title: "Otp verified successfully." });
        sessionStorage.removeItem("email");
        route.push("/reset-password");
      }
    } catch (error) {
      // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
      Error_Modal({ title: error?.data?.message });
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      route.replace("/login");
    }
  }, []);

  // handle re-sen otp
  const handleResend = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const res = await reSendOtp({ email }).unwrap();
      sessionStorage.setItem("token", res?.data?.token);
      Success_model({ title: "An otp re-sent to your email" });
    } catch (error) {
      // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
    >
      <Form.Item<FieldType> name='otp'>
        <Input.OTP size='large' />
      </Form.Item>

      <Button
        style={{
          background: "linear-gradient(180deg, #FCB806 0.89%, #1A2935 100.89%)",
          boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className='group'
        htmlType='submit'
        size='large'
        block
      >
        Verify Email <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default VerifyEmailForm;
