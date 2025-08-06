import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { useState } from "react";
import { Error_Modal, Success_model } from "@/lib/utils";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const ChangePasswordModal = ({ open, setOpen }: TPropsType) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: any) => {
    if (values?.newPassword !== values?.confirmPassword) {
      return Error_Modal({ title: "Password does not match" });
    }

    try {
      await changePassword({
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
      }).unwrap();
      Success_model({ title: "Password change successfully!!" });
      dispatch(logout());
      router.refresh();
      router.push("/login");
    } catch (error: any) {
      Error_Modal(error?.data?.message);
    }
  };
  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        style={{
          minWidth: "max-content",
        }}
      >
        <div className='py-14'>
          <div
            className='w-12 h-12 bg-main-color  absolute top-2 right-2 rounded-full cursor-pointer'
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color='#fff' className='absolute top-1/3 left-1/3' />
          </div>

          {/* header */}
          <div>
            <h4 className=' text-2xl font-medium text-center'>Change Password</h4>
            <p className='mt-1 text-center'>Your password must be 8-10 character long.</p>
          </div>

          {/* form */}
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: "",
                  colorText: "#000",
                  colorTextPlaceholder: "#000",
                },
                Form: {
                  labelColor: "var(--color-primary-gray)",
                  labelFontSize: 14,
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout='vertical'
              style={{
                maxWidth: 500,
                marginTop: "25px",
              }}
            >
              {/*  input old password */}
              <Form.Item
                label='Old Password'
                name='oldPassword'
                rules={[{ required: true, message: "Please Enter Old Password" }]}
              >
                <Input.Password
                  size='large'
                  className='text-white'
                  placeholder='Enter old password '
                />
              </Form.Item>

              {/*  input  new Password*/}
              <Form.Item
                label='New password'
                name='newPassword'
                rules={[{ required: true, message: "Please Enter New  Password" }]}
              >
                <Input.Password
                  size='large'
                  className='text-white'
                  placeholder='Set new password'
                />
              </Form.Item>

              {/* input  confirm number  */}
              <Form.Item
                label='Re-enter new password'
                name='confirmPassword'
                rules={[{ required: true, message: "Please Re-enter new password" }]}
              >
                <Input.Password
                  size='large'
                  className='text-white'
                  placeholder='Re-enter new password'
                />
              </Form.Item>

              {/*<p
                onClick={() => {
                  setOpen(false);
                  setOpenModal(true);
                }}
                className='mb-5 font-medium cursor-pointer text-gray-600'
              >
                Forget password?
              </p>*/}

              <Button
                htmlType='submit'
                size='large'
                block
                className='!py-6 border-main-color'
                loading={isLoading}
              >
                Update Password
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
      {/* forget password Modal */}
      {/*<ForgetPasswordModal open={openModal} setOpen={setOpenModal}></ForgetPasswordModal>*/}
    </>
  );
};

export default ChangePasswordModal;
