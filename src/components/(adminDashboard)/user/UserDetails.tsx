import { TUser } from "@/types";
import { Avatar, Modal } from "antd";
import moment from "moment";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: TUser | null;
  setOpen: (collapsed: TUser | null) => void;
};

const UserDetails = ({ open: user, setOpen }: TPropsType) => {
  return (
    <Modal
      open={!!user}
      footer={null}
      centered={true}
      onCancel={() => setOpen(null)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        padding: "0px",
      }}
    >
      <div className='bg-[#111827]'>
        <div className='flex justify-between items-center'>
          <div></div>
          <div
            className='size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500'
            onClick={() => setOpen(null)}
          >
            <RiCloseLargeLine size={14} className='text-red-600 group-hover:text-red-100 group' />
          </div>
        </div>
        <div className='w-fit mx-auto relative'>
          <Avatar src={user?.profilePicture || "/user_image1.png"} size={150} />
        </div>
        <div className='mt-10  '>
          <div className='flex justify-between bg-[#21424617] py-3 px-2 border-b '>
            <h4>User name </h4>
            <p className='font-medium'>{user?.name}</p>
          </div>

          <div className='flex justify-between py-3  px-2 border-b'>
            <h4>Email </h4>
            <p className='font-medium'>{user?.email}</p>
          </div>

          <div className='flex justify-between bg-[#21424617] py-3 px-2 border-b'>
            <h4>Contact Number </h4>
            <p className='font-medium'>{user?.phoneNumber || "N/A"}</p>
          </div>

          <div className='flex justify-between py-3 px-2 border-b'>
            <h4>Date of Join </h4>
            <p className='font-medium'>{moment(user?.createdAt).format("LL")}</p>
          </div>

          {/*<div className='flex justify-between bg-[#21424617] py-3 px-2 border-b'>
            <h4>Location </h4>
            <p className='font-medium'></p>
          </div>*/}
          {/*<div className='flex justify-between  py-3 px-2 border-b'>
            <h4>Account Type </h4>
            <p className='font-medium capitalize'>{user?.role}</p>
          </div>*/}
          <div className='flex justify-between  bg-[#21424617] py-3 px-2 border-b'>
            <h4>Role</h4>
            <p className='font-medium capitalize'>{user?.role}</p>
          </div>
          {/*<div className='flex justify-between   py-3 px-2 border-b'>
            <h4>Subscription Plan </h4>
            <p className='font-medium'>Basic</p>
          </div>
          <div className='flex justify-between  bg-[#21424617] py-3 px-2 border-b'>
            <h4>Company name </h4>
            <p className='font-medium'>N/A</p>
          </div>
          <div className='flex justify-between py-3 px-2 border-b'>
            <h4>Streak Progress </h4>
            <p className='font-medium'>5 days streak</p>
          </div>*/}
          <div className='flex justify-between  bg-[#21424617] py-3 px-2 border-b'>
            <h4>Status </h4>
            <p className='font-medium'>{user?.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
