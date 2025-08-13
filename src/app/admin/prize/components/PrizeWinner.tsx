"use client";

import { useGetPrizeWinnersQuery } from "@/redux/api/userApi";
import moment from "moment";
import Image from "next/image";

type TPrizeWinner = {
  id: string;
  prizeId: string;
  userId: string;
  position: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
    dealClosedCount: number;
    salesCount: number;
    dealCount: number;
  };
  prize: {
    id: string;
    name: string;
    icon: string;
    iconPath: string;
    tierLevel: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

const PrizeWinner = () => {
  const { data, isLoading, isError } = useGetPrizeWinnersQuery([]);

  // data?.data is array of TPrizeWinner
  const prizeWinners = data?.data as TPrizeWinner[] | undefined;

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500 font-medium'>Failed to load prize winners.</div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      {/* Winners List */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {prizeWinners && prizeWinners.length > 0 ? (
          prizeWinners.map((winner) => (
            <div
              key={winner.id}
              className='bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center border hover:shadow-lg transition'
            >
              <div className='relative w-20 h-20 mb-3'>
                <Image
                  src={winner.user.profilePicture || "/default-avatar.png"}
                  alt={winner.user.name}
                  fill
                  className='rounded-full object-cover'
                />
              </div>
              <h2 className='text-lg font-semibold'>{winner.user.name}</h2>
              <div className='mt-2 text-sm text-gray-600'>
                Sales: <span className='font-medium'>{winner.user.salesCount}</span>
              </div>
              <div className='text-sm text-gray-600'>
                Deals: <span className='font-medium'>{winner.user.dealCount}</span>
              </div>
              <div className='text-xs text-gray-400 mt-1'>
                Won: {winner.prize.name} <br />
                On: {moment(winner.createdAt).format("MMM Do, YYYY")}
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center text-gray-500'>No prize winners found.</div>
        )}
      </div>
    </div>
  );
};

export default PrizeWinner;
