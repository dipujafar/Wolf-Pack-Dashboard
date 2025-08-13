"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { useGetSingleClientQuery, useUpdateClientMutation } from "@/redux/api/clientApi";
import { TClient, TUser } from "@/types";
import { useEffect, useState } from "react";
import { useAllUserQuery } from "@/redux/api/userApi";
import Image from "next/image";
import { SelectItemIndicator } from "@radix-ui/react-select";
import { Error_Modal, Success_model } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().optional(),
  offer: z.string().optional(),
  targetAudience: z.string().optional(),
  contact: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  userId: z.string().optional(),
  revenueTarget: z.string().optional(),
  //.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
  //  message: "Revenue target must be a positive number.",
  //}),
  commissionRate: z.string().optional(),
  //.refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
  //  message: "Commission rate must be between 0 and 100.",
  //}),
});

type FormValues = z.infer<typeof formSchema>;
const ClientDetails = ({ id }: { id: string }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      offer: "",
      targetAudience: "",
      contact: "",
      location: "",
      userId: "",
      revenueTarget: "",
      commissionRate: "",
    },
  });

  const { data, isLoading } = useGetSingleClientQuery(id);
  const clientData = data?.data as TClient;
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  useEffect(() => {
    if (clientData) {
      const updatedValues = {
        name: clientData.name || "",
        offer: clientData.offer || "",
        targetAudience: clientData.targetAudience || "",
        contact: clientData.contact || "",
        location: clientData.location || "",
        userId: clientData.userId || "",
        revenueTarget: clientData.revenueTarget?.toString() || "",
        commissionRate: clientData.commissionRate?.toString() || "",
      };
      form.reset(updatedValues);
    }
  }, [clientData]);

  const { data: users, isLoading: isLoadingUsers } = useAllUserQuery([
    { label: "limit", value: "99999999999" },
  ]);

  const usersData = (users?.data as TUser[]) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      await updateClient({
        id: id,
        data: {
          name: values.name,
          offer: values.offer,
          targetAudience: values.targetAudience,
          contact: values.contact,
          location: values.location,
          userId: values.userId,
          revenueTarget: Number(values.revenueTarget),
          commissionRate: Number(values.commissionRate),
        },
      }).unwrap();
      form.reset();
      Success_model({ title: "Client updated successfully!!" });
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <>
      <Form {...form} key={clientData?.id}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='userId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Assign Closer</FormLabel>
                <Select
                  disabled={isLoadingUsers}
                  onValueChange={field.onChange}
                  defaultValue={field.value || clientData?.userId}
                >
                  <FormControl>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5'>
                      <SelectValue placeholder='Enter assign closer' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-gray-800 border-gray-700'>
                    {usersData.map((closer) => (
                      <SelectItem
                        key={closer.id}
                        value={closer.id}
                        className='text-white hover:bg-gray-700 focus:bg-gray-700 '
                      >
                        <div className='flex items-center gap-x-2 '>
                          <Image
                            src={closer?.profilePicture}
                            width={20}
                            height={20}
                            className='rounded-full aspect-square'
                            alt='user-icon'
                          />
                          <p>{closer.name}</p>
                        </div>
                        <SelectItemIndicator className='text-white' />
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Client Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Client Name'
                    {...field}
                    className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='offer'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Service Offered</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter service offered'
                    {...field}
                    className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 min-h-[80px] resize-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='targetAudience'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Target Audience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter target audience'
                    {...field}
                    className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 min-h-[80px] resize-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Contact number'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Location'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='revenueTarget'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Revenue Target</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                        $
                      </span>
                      <Input
                        type='number'
                        placeholder='Enter Revenue Target'
                        {...field}
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pl-8'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='commissionRate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Commission Rate</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='number'
                        placeholder='Enter Commission Rate'
                        {...field}
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pr-8'
                      />
                      <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                        %
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            size={"lg"}
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg group py-3 mt-6'
            disabled={!form.formState.isValid || isUpdating}
          >
            Save <AnimatedArrow />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ClientDetails;
