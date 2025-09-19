"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useUpdatePrizeMutation } from "@/redux/api/prizeApi";
import { useUploadFilesMutation } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// 🎯 Schema
const entrySchema = z.object({
  name: z.string().min(1, "Entry name is required"),
  rank: z.number().min(1).max(3),
});

const updatePrizeSchema = z.object({
  name: z.string().min(1, "Prize name is required"),
  month: z.number().min(1).max(12),
  year: z.number().min(2024),
  entries: z.array(entrySchema).length(3, "Exactly 3 entries required"),
});

export type UpdatePrizeFormData = z.infer<typeof updatePrizeSchema>;

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const currentYear = new Date().getFullYear();
const startYear = 2024;
const yearsArray = Array.from(
  { length: currentYear - startYear + 4 },
  (_, index) => startYear + index,
);

interface EditPrizeFormProps {
  prize: any;
  onSuccess: () => void;
}

const prizeLabels = ["First Prize", "Second Prize", "Third Prize"];

export default function EditPrizeForm({ prize, onSuccess }: EditPrizeFormProps) {
  const [updatePrize, { isLoading }] = useUpdatePrizeMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFilesMutation();

  const [iconPreviews, setIconPreviews] = useState<string[]>(
    prize.entries.map((e: any) => e.icon || ""),
  );
  const [iconFiles, setIconFiles] = useState<(File | null)[]>(prize.entries.map(() => null));

  const form = useForm<UpdatePrizeFormData>({
    resolver: zodResolver(updatePrizeSchema),
    defaultValues: {
      name: prize.name,
      month: prize.month,
      year: prize.year,
      entries: prize.entries.map((e: any, i: number) => ({
        name: e.name,
        rank: i + 1,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  function hasDuplicateRank(items: { name: string; rank: number }[]) {
    const seen = new Set<number>();
    for (const item of items) {
      if (seen.has(item.rank)) return true;
      seen.add(item.rank);
    }
    return false;
  }

  const onSubmit = async (data: UpdatePrizeFormData) => {
    if (hasDuplicateRank(data.entries)) {
      return Error_Modal({ title: "Duplicate rank is not allowed" });
    }

    const entriesWithRanks = data.entries.map((entry, i) => ({ ...entry, rank: i + 1 }));

    try {
      const uploadedEntries = await Promise.all(
        entriesWithRanks.map(async (entry, i) => {
          const file = iconFiles[i];
          if (file) {
            const formData = new FormData();
            formData.append("files", file);
            const res = await uploadFile(formData).unwrap();
            return { ...entry, icon: res.data[0]?.url, iconPath: res.data[0]?.path };
          }
          return { ...entry, icon: iconPreviews[i] };
        }),
      );

      const payload = {
        ...data,
        entries: uploadedEntries?.map((entry) => {
          const data: any = { ...entry };
          data.id = prize.entries.find((e:any) => e.rank === entry.rank)?.id;
          return data;
        }),
      };



      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      await updatePrize({ id: prize.id, data: formData }).unwrap();
      Success_model({ title: "Prize updated successfully!" });
      onSuccess();
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message || "Failed to update prize" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Prize Details */}
        <Card className='bg-gray-900 border-gray-700'>
          <CardHeader>
            <CardTitle className='text-white text-lg font-semibold'>Prize Details</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>Prize Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter prize name'
                      className='bg-gray-700 border-gray-600 text-white'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>Month</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-gray-700 border-gray-600 text-white'>
                        <SelectValue placeholder='Select month' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-gray-800 border-gray-600'>
                      {months.map((month) => (
                        <SelectItem
                          key={month.value}
                          value={month.value.toString()}
                          className='text-white'
                        >
                          {month.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>Year</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-gray-700 border-gray-600 text-white'>
                        <SelectValue placeholder='Select year' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-gray-800 border-gray-600'>
                      {yearsArray.map((year) => (
                        <SelectItem key={year} value={year.toString()} className='text-white'>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Entries */}
        <Card className='bg-gray-900 border-gray-700'>
          <CardHeader>
            <CardTitle className='text-white text-lg font-semibold'>
              Prize Entries (Exactly 3)
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {fields.map((entry, i) => (
              <div
                key={entry.id}
                className='flex flex-col gap-4 p-4 border border-gray-700 rounded-lg'
              >
                <FormField
                  control={form.control}
                  name={`entries.${i}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>{prizeLabels[i]}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Enter ${prizeLabels[i].toLowerCase()}`}
                          className='bg-gray-700 border-gray-600 text-white'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Label className='text-gray-300'>Upload Entry Icon</Label>
                  <div className='flex items-center space-x-4 mt-2'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const newPreviews = [...iconPreviews];
                          const newFiles = [...iconFiles];
                          newPreviews[i] = URL.createObjectURL(file);
                          newFiles[i] = file;
                          setIconPreviews(newPreviews);
                          setIconFiles(newFiles);
                        }
                      }}
                      className='bg-gray-700 border-gray-600 text-white'
                    />
                    {iconPreviews[i] && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          const newPreviews = [...iconPreviews];
                          const newFiles = [...iconFiles];
                          newPreviews[i] = "";
                          newFiles[i] = null;
                          setIconPreviews(newPreviews);
                          setIconFiles(newFiles);
                        }}
                        className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                  {iconPreviews[i] && (
                    <div className='w-20 h-20 border border-gray-600 rounded overflow-hidden mt-2'>
                      <Image
                        width={80}
                        height={80}
                        src={iconPreviews[i]}
                        alt={`${prizeLabels[i]} icon`}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button
            disabled={isLoading || isUploading}
            type='submit'
            className='bg-gray-900 text-white px-6 py-2'
          >
            {isLoading ? "Updating..." : "Update Prize"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
