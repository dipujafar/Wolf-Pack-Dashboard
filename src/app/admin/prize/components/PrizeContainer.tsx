"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllPrizeQuery } from "@/redux/api/prizeApi";
import { TPrize } from "@/types";
import { Spin } from "antd";
import { Filter, Plus, Trophy, Users } from "lucide-react";
import { useState } from "react";
import CreatePrizeForm, { months } from "./create-prize-form";
import EditPrizeForm from "./edit-prize-form";
import PrizeDetails from "./prize-details";

// Mock data
const currentYear = new Date().getFullYear();
const startYear = 2024;

// Ensure we start from 2024, and include the current year + next 3 years
const yearsArray = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index,
);

export default function PrizeManagement() {
  const [currentView, setCurrentView] = useState<"list" | "create" | "edit" | "details">("list");
  const [selectedPrize, setSelectedPrize] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<string>(String(currentYear));
  const { data, isLoading } = useGetAllPrizeQuery([{ label: "year", value: selectedYear }]);

  const prizeData = (data?.data as TPrize[]) || [];
  const handleViewPrize = (prize: any) => {
    setSelectedPrize(prize);
    setCurrentView("details");
  };

  const handleEditPrize = (prize: any) => {
    setSelectedPrize(prize);
    setCurrentView("edit");
  };

  if (currentView === "create") {
    return (
      <div>
        <div className='mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold text-gray-900'>Create New Prize</h1>
            <Button
              onClick={() => setCurrentView("list")}
              variant='outline'
              className='bg-gray-900 text-white'
            >
              Back to List
            </Button>
          </div>
          <CreatePrizeForm onSuccess={() => setCurrentView("list")} />
        </div>
      </div>
    );
  }

  if (currentView === "edit" && selectedPrize) {
    return (
      <div className='bg-[#fff]/15 border border-[#EBEBEB]/50 p-6'>
        <div className=''>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold text-gray-900'>Edit Prize</h1>
            <Button
              onClick={() => setCurrentView("list")}
              variant='outline'
              className='bg-gray-900 text-white'
            >
              Back to List
            </Button>
          </div>
          <EditPrizeForm prize={selectedPrize} onSuccess={() => setCurrentView("list")} />
        </div>
      </div>
    );
  }

  if (currentView === "details" && selectedPrize) {
    return (
      <div className='bg-[#fff]/15 border border-[#EBEBEB]/50 p-6'>
        <div className='mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold text-gray-900'>Prize Details</h1>
            <Button
              onClick={() => setCurrentView("list")}
              variant='outline'
              className='bg-gray-900 text-white'
            >
              Back to List
            </Button>
          </div>
          <PrizeDetails prize={selectedPrize} onEdit={() => handleEditPrize(selectedPrize)} />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#fff]/15 p-6'>
      <div className='mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Prize Management</h1>
            <p className='text-gray-400'>Manage yearly prizes and track winners</p>
          </div>
          <Button onClick={() => setCurrentView("create")} className='bg-gray-900 text-white'>
            <Plus className='h-4 w-4 mr-2' />
            Create Prize
          </Button>
        </div>

        {/* Filters */}
        <Card className='bg-[#fff]/15 border border-[#EBEBEB]/50 mb-6 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-white flex items-center'>
              <Filter className='h-5 w-5 mr-2 text-white' />
              Filter Prizes
            </CardTitle>
          </CardHeader>
          <CardContent className='flex gap-4'>
            <div className='flex-1'>
              <label className='text-white text-sm mb-2 block'>Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className='bg-gray-100 border border-gray-300 text-gray-900'>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent className='bg-white border-gray-300'>
                  {yearsArray.map((year) => (
                    <SelectItem key={year} value={year.toString()} className='text-gray-900'>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Prize Grid */}
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[200px]'>
            <Spin />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {prizeData.map((prize) => (
              <Card
                key={prize.id}
                className='bg-[#fff]/15 border border-[#EBEBEB]/50 shadow-sm text-white'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                        <Trophy className='h-6 w-6 text-white' />
                      </div>
                      <div>
                        <CardTitle className='text-gray-100 text-lg'>{prize.name}</CardTitle>
                        <p className='text-gray-300 text-sm'>
                          {months[prize.month - 1]?.name} {prize.year}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={prize.isActive ? "default" : "outline"}
                      className={
                        prize.isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 border-gray-600"
                      }
                    >
                      {prize.isActive ? "Active" : "Ended"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <h4 className='text-gray-200 text-sm font-medium mb-2'>Top Entries</h4>
                    <div className='space-y-2'>
                      {prize.entries.slice(0, 3).map((entry: any, index: number) => (
                        <div
                          key={entry.id}
                          className='flex items-center space-x-2 p-2 bg-gray-800/30 rounded'
                        >
                          <img
                            src={entry.icon || "/placeholder.svg"}
                            alt={entry.name}
                            className='w-6 h-6 rounded object-cover'
                          />
                          <span className='text-gray-200 text-sm flex-1'>{entry.name}</span>
                          <Badge
                            variant='outline'
                            className='bg-gray-700 text-gray-300 border-gray-600 text-xs'
                          >
                            #{entry.rank}
                          </Badge>
                        </div>
                      ))}
                      {prize.entries.length > 3 && (
                        <p className='text-gray-400 text-xs text-center'>
                          +{prize.entries.length - 3} more entries
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center text-gray-300'>
                      <Users className='h-4 w-4 mr-1' />
                      {prize.entries.length} Entries
                    </div>
                    <div className='flex items-center text-gray-300'>
                      <Trophy className='h-4 w-4 mr-1' />
                      Monthly Prize
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      onClick={() => handleViewPrize(prize)}
                      variant='outline'
                      size='sm'
                      className='flex-1 bg-gray-900 hover:bg-gray-900 border-gray-600 text-gray-100 hover:text-white'
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleEditPrize(prize)}
                      variant='outline'
                      size='sm'
                      className='flex-1 bg-gray-900 hover:bg-gray-900  border-gray-600 text-gray-100 hover:text-white'
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {prizeData.length === 0 && (
          <Card className='bg-white border border-gray-300 shadow-sm'>
            <CardContent className='text-center py-12'>
              <Trophy className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>No prizes found</h3>
              <p className='text-gray-600 mb-4'>No prizes match your current filter criteria.</p>
              <Button onClick={() => setCurrentView("create")} className='bg-gray-900 text-white'>
                <Plus className='h-4 w-4 mr-2' />
                Create First Prize
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
