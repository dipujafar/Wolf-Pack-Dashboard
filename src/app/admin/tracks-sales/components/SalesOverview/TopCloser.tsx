"use client";
import { useTopUsersQuery } from "@/redux/api/userApi";
import type { TAchievement, TResponse } from "@/types";
import Image from "next/image";
import { useState } from "react";

type TDataType = {
  label: string;
  value: {
    id: string;
    name: string;
    profilePicture: string | null;
    myAchievements?: {
      id: string;
      userId: string;
      achievementId: string;
      createdAt: string;
      updatedAt: string;
      achievement: TAchievement;
    }[];
    closer?: {
      id: string;
      clientId: string;
      userId: string;
      proposition: string;
      dealDate: string;
      status: string;
      amount: number;
      notes: string;
      createdAt: string;
      updatedAt: string;
    }[];
    dealClosedCount?: number;
    salesCount?: number;
    revenue?: number;
    dealCount?: number;
    monthlyTarget?: number;
    _count?: {
      closer: number;
    };
  } | null;
};

const TopClosers = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useTopUsersQuery([
    {
      label: "page",
      value: page.toString(),
    },
    {
      label: "limit",
      value: pageSize.toString(),
    },
  ]);

  const result = data as TResponse<TDataType[]>;
  const leaderboardData = result?.data || [];

  const dealCategories = leaderboardData.filter((item) => item.label.includes("deals"));

  const revenueCategories = leaderboardData.filter((item) => item.label.includes("revenue"));

  const formatLabel = (label: string) => {
    return label
      .replace("Most_", "")
      .replace("_", " ")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const calculateRevenue = (deals: any[] = []) => {
    return deals.reduce((total, deal) => total + (deal.amount || 0), 0);
  };

  const renderLeaderboardCard = (category: TDataType, type: "deals" | "revenue", index: number) => {
    const { label, value } = category;

    return (
      <div
        key={label}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50 rounded-lg p-6'
      >
        <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
          {type === "deals" ? (
            <svg className='w-5 h-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          ) : (
            <svg className='w-5 h-5 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z' />
            </svg>
          )}
          {formatLabel(label)}
        </h3>

        {!value ? (
          <div className='text-center py-8'>
            <div className='text-gray-400 text-sm'>No data available</div>
          </div>
        ) : (
          <div className='space-y-4'>
            {/* Winner Card */}
            <div className='bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <Image
                    className='rounded-full aspect-square object-cover border-2 border-yellow-400'
                    src={
                      value.profilePicture ||
                      "/placeholder.svg?height=60&width=60&query=user profile"
                    }
                    alt='profile-picture'
                    width={60}
                    height={60}
                  />
                  {/*<div className='absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
                    {index + 1}
                  </div>*/}
                </div>

                <div className='flex-1'>
                  <h4 className='text-white font-semibold text-lg'>{value.name}</h4>

                  {/* Stats */}
                  <div className='flex gap-4 mt-2'>
                    {type === "deals" ? (
                      <>
                        <div className='text-sm'>
                          <span className='text-gray-400'>Deals: </span>
                          <span className='text-white font-medium'>
                            {value.closer?.length || value.dealCount || value._count?.closer || 0}
                          </span>
                        </div>
                        <div className='text-sm'>
                          <span className='text-gray-400'>Revenue: </span>
                          <span className='text-green-400 font-medium'>
                            €{value.closer ? calculateRevenue(value.closer) : value.revenue || 0}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='text-sm'>
                          <span className='text-gray-400'>Revenue: </span>
                          <span className='text-green-400 font-medium'>
                            €{value.revenue || calculateRevenue(value.closer || [])}
                          </span>
                        </div>
                        <div className='text-sm'>
                          <span className='text-gray-400'>Deals: </span>
                          <span className='text-white font-medium'>
                            {value.dealCount || value._count?.closer || 0}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Achievements */}
                  {value.myAchievements && value.myAchievements.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {value.myAchievements.slice(0, 2).map((achievement, index) => (
                        <div
                          key={index}
                          className='px-2 py-1 text-xs rounded-sm bg-yellow-500/20 text-yellow-400 flex items-center gap-1'
                        >
                          <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 16 16'>
                            <path d='M9.97066 7.34322H6.55735C6.41601 7.34322 6.28045 7.28707 6.18051 7.18712C6.08056 7.08718 6.02441 6.95163 6.02441 6.81028C6.02441 6.66894 6.08056 6.53338 6.18051 6.43344C6.28045 6.33349 6.41601 6.27734 6.55735 6.27734H9.97066C10.112 6.27734 10.2476 6.33349 10.3475 6.43344C10.4475 6.53338 10.5036 6.66894 10.5036 6.81028C10.5036 6.95163 10.4475 7.08718 10.3475 7.18712C10.2476 7.28707 10.112 7.34322 9.97066 7.34322Z' />
                          </svg>
                          <span>{achievement?.achievement?.achievement?.name}</span>
                        </div>
                      ))}
                      {value.myAchievements.length > 2 && (
                        <div className='px-2 py-1 text-xs rounded-sm bg-gray-600 text-gray-300'>
                          +{value.myAchievements.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-white'>Top Closers</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse'
            >
              <div className='h-6 bg-gray-700 rounded mb-4'></div>
              <div className='h-20 bg-gray-700 rounded'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-2xl font-semibold text-white'>Top Closers</h1>

      {/* Deals Section */}
      {dealCategories.length > 0 && (
        <div>
          <h2 className='text-xl font-medium text-white mb-4 flex items-center gap-2'>
            <svg className='w-6 h-6 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            Most Deals
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dealCategories.map((category, index) =>
              renderLeaderboardCard(category, "deals", index),
            )}
          </div>
        </div>
      )}

      {/* Revenue Section */}
      {revenueCategories.length > 0 && (
        <div>
          <h2 className='text-xl font-medium text-white mb-4 flex items-center gap-2'>
            <svg className='w-6 h-6 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z' />
            </svg>
            Most Revenue
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {revenueCategories.map((category, index) =>
              renderLeaderboardCard(category, "revenue", index),
            )}
          </div>
        </div>
      )}

      {leaderboardData.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 text-lg'>No leaderboard data available</div>
        </div>
      )}
    </div>
  );
};

export default TopClosers;
