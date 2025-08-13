"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useCreateLeagueMutation } from "@/redux/api/leagueApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dealAmount: z
    .string()
    .min(1, {
      message: "Commission rate is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Commission rate must be a positive number.",
    }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddLeagueForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [createLeague, { isLoading }] = useCreateLeagueMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      console.log(values);
      // Handle form submission here
      await createLeague({ ...values, dealAmount: Number(values.dealAmount) }).unwrap();
      Success_model({ title: "League created successfully!!" });
      setOpen(false);
      form.reset();
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className='sm:max-w-[500px] bg-gray-900 border-gray-800 text-white max-h-screen overflow-y-auto scroll-hide'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle className='text-xl font-semibold text-center'>Add League</DialogTitle>
          <div className='border rounded-full flex justify-center items-center  border-red-500'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setOpen(false)}
              className='h-6 w-6 hover:bg-gray-700 rounded-full'
            >
              <X className='h-4 w-4' color='#ef4444' />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter closer Name'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='dealAmount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Deal Amount Limit</FormLabel>
                  <FormControl>
                    <div className='flex items-center relative'>
                      <Input
                        type='number'
                        placeholder='Enter Deal Amount'
                        {...field}
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5'
                      />
                      {/*<span className='absolute right-2 h-4 w-4 opacity-50'>%</span>*/}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Description</FormLabel>
                  <FormControl>
                    <div className='flex items-center relative'>
                      <Textarea
                        placeholder='Enter Deal Amount'
                        {...field}
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5'
                      />
                      {/*<span className='absolute right-2 h-4 w-4 opacity-50'>%</span>*/}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold  rounded-lg group py-5'
            >
              Save <AnimatedArrow />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
