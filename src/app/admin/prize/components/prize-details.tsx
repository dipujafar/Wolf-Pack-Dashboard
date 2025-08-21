"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Medal,
  Crown,
  Award,
  Edit,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useGetSinglePrizeQuery } from "@/redux/api/prizeApi";
import { TSinglePrizeData } from "@/types";

interface PrizeDetailsProps {
  prize: {
    id: string;
    name: string;
    month: number;
    year: number;
    isActive: boolean;
    icon: string;
    entries: Array<{
      id: string;
      name: string;
      rank: number;
      icon: string;
    }>;
    topUsers: Array<{
      id: string;
      name: string;
      profilePicture: string;
      salesCount: number;
      dealCount: number;
      dealClosedCount: number;
    }>;
  };
  onEdit: () => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className='h-5 w-5 text-yellow-500' />;
    case 2:
      return <Medal className='h-5 w-5 text-gray-400' />;
    case 3:
      return <Award className='h-5 w-5 text-amber-600' />;
    default:
      return <Trophy className='h-5 w-5 text-gray-500' />;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    case 2:
      return "bg-gradient-to-r from-gray-400 to-gray-500";
    case 3:
      return "bg-gradient-to-r from-amber-500 to-amber-600";
    default:
      return "bg-gradient-to-r from-gray-600 to-gray-700";
  }
};

export default function PrizeDetails({ prize, onEdit }: PrizeDetailsProps) {
  const { data, isLoading } = useGetSinglePrizeQuery(prize.id, { skip: !prize.id });

  const prizeData = data?.data as TSinglePrizeData;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='space-y-6'>
      <Card className='bg-[#fff]/15 border border-[#EBEBEB]/50'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              {/*<Image
                width={64}
                height={64}
                src={prizeData.icon || "/placeholder.svg"}
                alt={prizeData.name}
                className='w-16 h-16 rounded-lg object-cover'
              />*/}
              <div>
                <CardTitle className='text-2xl text-gray-100'>{prizeData?.name}</CardTitle>
                <p className='text-gray-300'>
                  {months[prizeData.month - 1]} {prizeData.year}
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <Badge
                variant={prizeData.isActive ? "default" : "secondary"}
                className={
                  prizeData.isActive ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                }
              >
                {prizeData.isActive ? "Active" : "Ended"}
              </Badge>
              <Button
                onClick={onEdit}
                variant='outline'
                className='border-gray-900 text-white hover:text-white hover:bg-gray-900 bg-gray-900'
              >
                <Edit className='h-4 w-4 mr-2' />
                Edit Prize
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center space-x-3'>
              <Users className='h-5 w-5 text-gray-300' />
              <div>
                <p className='text-sm text-gray-400'>Total Entries</p>
                <p className='text-gray-200'>{prizeData.entries.length} participants</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <TrendingUp className='h-5 w-5 text-gray-300' />
              <div>
                <p className='text-sm text-gray-400'>Top Performers</p>
                <p className='text-gray-200'>{prizeData.topUsers.length} users</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='bg-[#fff]/15 border border-[#EBEBEB]/50'>
          <CardHeader>
            <CardTitle className='text-gray-100 flex items-center'>
              <Users className='h-5 w-5 mr-2' />
              Competition Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {prizeData.entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className='flex items-center justify-between p-3 rounded-lg border border-gray-300/10'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>{getRankIcon(entry.rank)}</div>
                    <Image
                      width={32}
                      height={32}
                      src={entry.icon || "/placeholder.svg"}
                      alt={entry.name}
                      className='w-8 h-8 rounded-full object-cover'
                    />
                    <div>
                      <p className='text-gray-200 font-medium'>{entry.name}</p>
                      <p className='text-gray-400 text-sm'>Participant</p>
                    </div>
                  </div>
                  <Badge className={`${getRankColor(entry.rank)} text-white border-0`}>
                    Rank {entry.rank}
                  </Badge>
                </div>
              ))}
              {prizeData.entries.length === 0 && (
                <div className='text-center py-8'>
                  <Users className='h-12 w-12 text-gray-500 mx-auto mb-3' />
                  <p className='text-gray-400'>No entries yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className='bg-[#fff]/15 border border-[#EBEBEB]/50'>
          <CardHeader>
            <CardTitle className='text-gray-100 flex items-center'>
              <TrendingUp className='h-5 w-5 mr-2' />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {prizeData.topUsers && prizeData.topUsers.length > 0 ? (
                prizeData.topUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className='p-4 rounded-lg border border-gray-300/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  >
                    <div className='flex items-center space-x-3 mb-3'>
                      <Image
                        width={40}
                        height={40}
                        src={user.profilePicture || "/placeholder.svg"}
                        alt={user.name}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex-1'>
                        <p className='text-gray-200 font-medium'>{user.name}</p>
                        <Badge className='bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs'>
                          Top Performer #{index + 1}
                        </Badge>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 gap-3 text-sm'>
                      <div className='flex items-center space-x-2'>
                        <TrendingUp className='h-4 w-4 text-green-400' />
                        <div>
                          <p className='text-gray-400'>Sales</p>
                          <p className='text-gray-200 font-medium'>{user.salesCount}</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Target className='h-4 w-4 text-blue-400' />
                        <div>
                          <p className='text-gray-400'>Deals</p>
                          <p className='text-gray-200 font-medium'>{user.dealCount}</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <CheckCircle className='h-4 w-4 text-purple-400' />
                        <div>
                          <p className='text-gray-400'>Closed</p>
                          <p className='text-gray-200 font-medium'>{user.dealClosedCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8'>
                  <TrendingUp className='h-12 w-12 text-gray-500 mx-auto mb-3' />
                  <p className='text-gray-400 mb-2'>No top performers yet</p>
                  <p className='text-gray-500 text-sm'>
                    Performance data will appear here once available
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/*<Card className='border border-gray-300/20'>
        <CardHeader>
          <CardTitle className='text-gray-100'>Prize Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center p-4 rounded-lg border border-gray-300/10'>
              <Users className='h-8 w-8 text-blue-400 mx-auto mb-2' />
              <p className='text-2xl font-bold text-gray-200'>{prizeData.entries.length}</p>
              <p className='text-gray-400 text-sm'>Total Entries</p>
            </div>
            <div className='text-center p-4 rounded-lg border border-gray-300/10'>
              <TrendingUp className='h-8 w-8 text-green-400 mx-auto mb-2' />
              <p className='text-2xl font-bold text-gray-200'>{prizeData.topUsers.length}</p>
              <p className='text-gray-400 text-sm'>Top Performers</p>
            </div>
            <div className='text-center p-4 rounded-lg border border-gray-300/10'>
              <Trophy className='h-8 w-8 text-yellow-400 mx-auto mb-2' />
              <p className='text-2xl font-bold text-gray-200'>
                {prizeData.topUsers.reduce((sum, user) => sum + user.salesCount, 0)}
              </p>
              <p className='text-gray-400 text-sm'>Total Sales</p>
            </div>
          </div>
        </CardContent>
      </Card>*/}
    </div>
  );
}
