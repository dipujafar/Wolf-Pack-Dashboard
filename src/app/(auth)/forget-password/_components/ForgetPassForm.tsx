"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useForgetPassMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgetPassForm = () => {
  const route = useRouter();

  const [forgetPassword, { isLoading }] = useForgetPassMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await forgetPassword(values).unwrap();
      Success_model({ title: "An otp sent to your email" });
      sessionStorage.setItem("token", res?.data?.token);
      sessionStorage.setItem("email", values?.email as string);
      route.push("/verify-email");
    } catch (error: any) {
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
      <Form.Item<FieldType>
        label='Email'
        name='email'
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input
          size='large'
          className='placeholder:!text-[#818181] placeholder:!text-sm'
          placeholder='Email'
        />
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
        loading={isLoading}
      >
        Send OTP
        <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default ForgetPassForm;
