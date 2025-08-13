"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useReSetPasswordMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  setPassword?: string;
  reSetPassword?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPasswordForm = () => {
  const route = useRouter();

  const [resetPassword] = useReSetPasswordMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values?.setPassword !== values?.reSetPassword) {
      return Error_Modal({ title: "Password does not match" });
    }

    try {
      const res = await resetPassword({
        password: values?.setPassword,
      }).unwrap();
      if (res.success) {
        Success_model({ title: "Password reset successfully!!" });
        route.push("/login");
      }
    } catch (error:any) {
      Error_Modal(error?.data?.message);
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
        label='New Password'
        name='setPassword'
        rules={[{ required: true, message: "Please your set password!" }]}
      >
        <Input.Password
          size='large'
          className='placeholder:!text-[#818181] placeholder:!text-sm'
          placeholder='Set your password'
        />
      </Form.Item>

      <Form.Item<FieldType>
        label='Confirm New Password'
        name='reSetPassword'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          size='large'
          className='placeholder:!text-[#818181] placeholder:!text-sm'
          placeholder='Re-enter password'
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
      >
        Sign In <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
