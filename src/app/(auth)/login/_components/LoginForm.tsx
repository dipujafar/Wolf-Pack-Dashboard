"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Success_model } from "@/lib/utils";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const userData = { email: values?.email, password: values?.password };
      const res = await login(userData).unwrap();

      if (res?.data?.accessToken) {
        Success_model({ title: "Login Successful" });
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),
            token: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          }),
        );

        router.push("/");
        router.refresh();
      }

      router.push("/");
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
      style={{ width: "354px" }}
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
        <Input size='large' type='email' placeholder='User Email' />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size='large' placeholder='Password' />
      </Form.Item>

      <Form.Item<FieldType> name='remember' valuePropName='checked'>
        <Flex justify='space-between' align='center'>
          <Checkbox>
            <p className=' font-semibold text-[#818181]'>Remember me</p>
          </Checkbox>
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className='font-semibold text-[#091A72]'>Forgot Password?</p>
          </Link>
        </Flex>
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
        Sign In
        <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default LoginForm;
