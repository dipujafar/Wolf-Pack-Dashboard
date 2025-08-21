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
import { useCreatePrizeMutation } from "@/redux/api/prizeApi";
import { useUploadFilesMutation } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// 🎯 Schema for entries (client-side only)
const entrySchema = z.object({
  name: z.string().min(1, "Entry name is required"),
  rank: z.number().min(1).max(3),
});

// 🎯 Schema for creating prize
const createPrizeSchema = z.object({
  name: z.string().min(1, "Prize name is required"),
  month: z.number().min(1).max(12),
  year: z.number().min(2024),
  entries: z.array(entrySchema).length(3, "Exactly 3 entries are required"),
});

// 🎯 Type for create form
export type CreatePrizeFormData = z.infer<typeof createPrizeSchema>;

// Month options
export const months = [
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

interface CreatePrizeFormProps {
  onSuccess: () => void;
}

const prizeLabels = ["First Prize", "Second Prize", "Third Prize"];

export default function CreatePrizeForm({ onSuccess }: CreatePrizeFormProps) {
  const [createPrize, { isLoading }] = useCreatePrizeMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFilesMutation();

  // ✅ Track preview images and raw files
  const [iconPreviews, setIconPreviews] = useState<(string | null)[]>([null, null, null]);
  const [iconFiles, setIconFiles] = useState<(File | null)[]>([null, null, null]);

  const form = useForm<CreatePrizeFormData>({
    resolver: zodResolver(createPrizeSchema),
    defaultValues: {
      name: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      entries: [
        { name: "", rank: 1 },
        { name: "", rank: 2 },
        { name: "", rank: 3 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  const onSubmit = async (data: CreatePrizeFormData) => {
    const entriesWithRanks = data.entries.map((entry, index) => ({
      ...entry,
      rank: index + 1, // Automatically assign rank based on position
    }));

    try {
      // Upload icons before creating prize
      const uploadedEntries = await Promise.all(
        entriesWithRanks.map(async (entry, index) => {
          const file = iconFiles[index];
          if (file) {
            const formData = new FormData();
            formData.append("files", file);
            const { data: res } = await uploadFile(formData).unwrap();
            return { ...entry, icon: res[0]?.url, iconPath: res[0]?.path };
          }
          return entry;
        }),
      );

      const payload = {
        ...data,
        entries: uploadedEntries,
      };

      await createPrize(payload).unwrap();
      Success_model({ title: "Prize created successfully!" });
      onSuccess();
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message || "Failed to create prize" });
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
            {fields.map((entry, index) => (
              <div
                key={entry.id}
                className='flex flex-col gap-4 p-4 border border-gray-700 rounded-lg'
              >
                <div className='flex flex-col md:flex-row md:items-end gap-4'>
                  {/* Entry Name */}
                  <FormField
                    control={form.control}
                    name={`entries.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='text-gray-300'>{prizeLabels[index]}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Enter ${prizeLabels[index].toLowerCase()}`}
                            className='bg-gray-700 border-gray-600 text-white'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Entry Icon Upload */}
                <div>
                  <Label className='text-gray-300'>Upload Entry Icon</Label>
                  <div className='flex items-center space-x-4 mt-2'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          const newPreviews = [...iconPreviews];
                          const newFiles = [...iconFiles];
                          newPreviews[index] = url;
                          newFiles[index] = file;
                          setIconPreviews(newPreviews);
                          setIconFiles(newFiles);
                        }
                      }}
                      className='bg-gray-700 border-gray-600 text-white'
                    />
                    {iconPreviews[index] && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          const newPreviews = [...iconPreviews];
                          const newFiles = [...iconFiles];
                          newPreviews[index] = null;
                          newFiles[index] = null;
                          setIconPreviews(newPreviews);
                          setIconFiles(newFiles);
                        }}
                        className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  {/* Preview */}
                  {iconPreviews[index] && (
                    <div className='w-20 h-20 border border-gray-600 rounded overflow-hidden mt-2'>
                      <Image
                        width={80}
                        height={80}
                        src={iconPreviews[index]! || "/placeholder.svg"}
                        alt={`${prizeLabels[index]} icon`}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className='flex justify-end'>
          <Button disabled={isLoading || isUploading} type='submit' className='bg-gray-900 text-white px-6 py-2'>
            {isLoading ? "Creating..." : "Create Prize"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

type Item = { name: string; rank: number };
export function hasDuplicateRank(items: Item[]): boolean {
  const seen = new Set<number>();
  for (const item of items) {
    if (seen.has(item.rank)) return true;
    seen.add(item.rank);
  }
  return false;
}
