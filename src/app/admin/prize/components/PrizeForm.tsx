"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useGetAllPrizeQuery, useUpdatePrizeMutation } from "@/redux/api/prizeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spin } from "antd";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TPrize = {
  id: string;
  name: string;
  icon: string;
  iconPath: string;
  tierLevel: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

const prizeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Prize name is required"),
  icon: z.string().optional(),
  iconPath: z.string().optional(),
  tierLevel: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean(),
  file: z.any().optional(),
});

const formSchema = z.object({
  prizes: z.array(prizeSchema),
});

type FormData = z.infer<typeof formSchema>;

export default function PrizeForm() {
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  const [globalStartDate, setGlobalStartDate] = useState<Date | null>(null);
  const [globalEndDate, setGlobalEndDate] = useState<Date | null>(null);

  const { data, isLoading } = useGetAllPrizeQuery([]);
  const [updatePrizeApi] = useUpdatePrizeMutation();

  const prizes = data?.data || [];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { prizes: [] },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "prizes",
  });

  useEffect(() => {
    if (prizes?.length) {
      form.reset({
        prizes: prizes.map((p: TPrize) => ({
          id: p.id,
          name: p.name,
          icon: p.icon,
          iconPath: p.iconPath,
          tierLevel: p.tierLevel,
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate),
          isActive: p.isActive,
          file: undefined,
        })),
      });

      // initialize global dates from first prize
      setGlobalStartDate(new Date(prizes[0].startDate));
      setGlobalEndDate(new Date(prizes[0].endDate));
    }
  }, [prizes]);

  // Sync all prizes when global dates change
  useEffect(() => {
    if (globalStartDate && globalEndDate) {
      fields.forEach((_, index) => {
        form.setValue(`prizes.${index}.startDate`, globalStartDate);
        form.setValue(`prizes.${index}.endDate`, globalEndDate);
      });
    }
  }, [globalStartDate, globalEndDate, fields, form]);

  if (isLoading) {
    return <Spin size='large' />;
  }

  const handleFileChange = (prizeId: string, file: File | null) => {
    setSelectedFiles((prev) => ({ ...prev, [prizeId]: file }));
    if (file) {
      setPreviewUrls((prev) => ({ ...prev, [prizeId]: URL.createObjectURL(file) }));
    } else {
      setPreviewUrls((prev) => {
        const newUrls = { ...prev };
        delete newUrls[prizeId];
        return newUrls;
      });
    }
  };

  const updatePrize = async (prizeId: string, index: number) => {
    const prize = form.getValues(`prizes.${index}`);
    const file = selectedFiles[prizeId] || null;
    const formData = new FormData();
    const loader = toast.loading(`Updating Prize ${prize.tierLevel}...`);

    const payload = {
      name: prize.name,
      startDate: prize.startDate.toISOString(),
      endDate: prize.endDate.toISOString(),
      isActive: prize.isActive,
    };

    formData.append("data", JSON.stringify(payload));
    if (file) formData.append("file", file);

    try {
      await updatePrizeApi({ id: prize.id, data: formData }).unwrap();
      toast.dismiss(loader);
      Success_model({ title: `Prize ${prize.tierLevel} updated successfully!` });
    } catch (err: any) {
      toast.dismiss(loader);
      Error_Modal({ title: err?.data?.message });
    }
  };

  return (
    <div className='min-h-screen p-6'>
      <div className='mx-auto w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className='space-y-6'>
            {/* Global Date Pickers */}
            <Card className='bg-gray-900 border-gray-700'>
              <CardHeader>
                <CardTitle className='text-white'>Competition Dates</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Start Date */}
                <div>
                  <Label className='text-gray-300'>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white'
                      >
                        {globalStartDate ? format(globalStartDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={globalStartDate || undefined}
                        onSelect={(date) => date && setGlobalStartDate(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div>
                  <Label className='text-gray-300'>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white'
                      >
                        {globalEndDate ? format(globalEndDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={globalEndDate || undefined}
                        onSelect={(date) => date && setGlobalEndDate(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {fields.map((prize, index) => (
              <Card key={prize.id} className='bg-gray-800 border-gray-700'>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-white'>
                    Prize Tier (Top {form.watch(`prizes.${index}.tierLevel`)})
                  </CardTitle>
                  <div className='flex items-center space-x-2'>
                    {/*<FormField
                      control={form.control}
                      name={`prizes.${index}.isActive`}
                      render={({ field }) => (
                        <FormItem className='flex items-center space-x-2'>
                          <FormLabel className='text-gray-300'>Active</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />*/}
                    <Button
                      type='button'
                      size='sm'
                      onClick={() => updatePrize(prize.id, index)}
                      className='bg-yellow-600 hover:bg-yellow-700 text-white'
                    >
                      Update This Prize
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* File Upload */}
                  <div className='space-y-2'>
                    <Label className='text-gray-300'>Upload Image/Icon</Label>
                    <div className='flex items-center space-x-2'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleFileChange(prize.id, e.target.files?.[0] || null)}
                        className='bg-gray-700 border-gray-600 text-white'
                      />
                      {(previewUrls[prize.id] || form.watch(`prizes.${index}.icon`)) && (
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={() => handleFileChange(prize.id, null)}
                          className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    {(previewUrls[prize.id] || form.watch(`prizes.${index}.icon`)) && (
                      <div className='w-20 h-20 border border-gray-600 rounded overflow-hidden'>
                        <img
                          src={previewUrls[prize.id] || form.watch(`prizes.${index}.icon`)}
                          alt='Prize icon'
                          className='w-full h-full object-cover'
                        />
                      </div>
                    )}
                  </div>

                  {/* Prize Name */}
                  <FormField
                    control={form.control}
                    name={`prizes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-gray-300'>Prize Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Enter Prize Name'
                            className='bg-gray-700 border-gray-600 text-white'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start/End Dates (Read Only) */}
                  <div>
                    <Label className='text-gray-300'>Start Date</Label>
                    <div className='bg-gray-700 border-gray-600 text-white rounded px-3 py-2'>
                      {globalStartDate ? format(globalStartDate, "MM/dd/yyyy") : "--"}
                    </div>
                  </div>
                  <div>
                    <Label className='text-gray-300'>End Date</Label>
                    <div className='bg-gray-700 border-gray-600 text-white rounded px-3 py-2'>
                      {globalEndDate ? format(globalEndDate, "MM/dd/yyyy") : "--"}
                    </div>
                  </div>

                  {/* Tier Level */}
                  <FormField
                    control={form.control}
                    name={`prizes.${index}.tierLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-gray-300'>Tier Level</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className='bg-gray-600 text-gray-400' />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
}
