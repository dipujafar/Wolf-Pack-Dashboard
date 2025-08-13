"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useGetBadgesQuery, useGetSingleUserQuery } from "@/redux/api/userApi";
import { TBadges, TUser } from "@/types";
import { Spin } from "antd";

export default function ProfileInformation({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleUserQuery(id);
  const userData = data?.data as TUser;
  const { data: badgesData, isLoading: isLoadingBadges } = useGetBadgesQuery(id);
  const badgeResult = badgesData?.data as TBadges;

  if (isLoading || isLoadingBadges) {
    return <Spin />;
  }

  return (
    <div>
      <Card className='bg-white/15 border border-none'>
        <CardContent className='p-6 space-y-6'>
          {/* Profile Section */}
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative'>
              <div className='w-32 h-32 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 p-1'>
                <div className='w-full h-full rounded-full bg-stone-800 flex items-center justify-center overflow-hidden'>
                  <Image
                    src={userData?.profilePicture}
                    alt='Profile'
                    width={120}
                    height={120}
                    className='rounded-full object-cover'
                  />
                </div>
              </div>
            </div>

            {/* Personal Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-sm'>
              <div className='text-center md:text-left'>
                <div className='text-stone-400 mb-1'>Name</div>
                <div className='text-stone-200 font-medium'>{userData?.name}</div>
              </div>
              <div className='text-center md:text-left'>
                <div className='text-stone-400 mb-1'>Email</div>
                <div className='text-stone-200 font-medium'>{userData?.email}</div>
              </div>
              <div className='text-center md:text-left'>
                <div className='text-stone-400 mb-1'>Contact</div>
                <div className='text-stone-200 font-medium'>{userData?.phoneNumber}</div>
              </div>

              <div className='text-center md:text-left'>
                <div className='text-stone-400 mb-1'>Date of Join</div>
                <div className='text-stone-200 font-medium'>{userData?.createdAt}</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Total Revenue */}
            <div className=' bg-stone-800/50 rounded-lg p-4'>
              <div className='text-stone-400 text-sm mb-1'>Total Revenue</div>
              <div className='text-stone-200 text-xl font-bold'>€{userData?.salesCount}</div>
            </div>

            {/* Deals Closed */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Deals Closed</div>
              <div className='text-stone-200 text-xl font-bold'>{userData?.dealClosedCount}</div>
            </div>

            {/* Status */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Status</div>
              <Badge
                className={`${
                  userData?.isActive
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                {userData?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Avg Deal Size */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Avg. Deal Size</div>
              <div className='text-stone-200 text-xl font-bold'>
                €{userData?.avgDealAmount.toFixed(2)}
              </div>
            </div>

            {/* Monthly Target */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Monthly Target</div>
              <div className='text-stone-200 text-lg font-bold'>€{userData?.monthlyTarget}</div>
              <div className='text-amber-400 text-sm'>
                ({userData?.monthlyTargetPercentage}% achieved)
              </div>
            </div>

            {/* Leaderboard */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Leaderboard</div>
              <Badge className='bg-amber-600 hover:bg-amber-700 text-white'>{userData?.rank}</Badge>
            </div>

            {/* Commission Rate */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-1'>Total Commission</div>
              <div className='text-stone-200 text-xl font-bold'>{userData?.commission || 0}</div>
            </div>

            {/* Badge */}
            <div className='bg-stone-800/50 rounded-lg p-4 border border-stone-700'>
              <div className='text-stone-400 text-sm mb-2'>Badge</div>
              <div className='space-y-1'>
                <div className='text-stone-200 text-sm font-medium'>
                  {badgeResult?.data?.length} earned
                </div>
                <div className='text-stone-400 text-xs'>
                  (
                  {badgeResult?.data
                    ?.slice(0, 3)
                    .map((badge) => badge.name)
                    .join(", ")}
                  )
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
