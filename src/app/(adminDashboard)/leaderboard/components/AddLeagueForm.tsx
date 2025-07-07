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

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  commissionRate: z
    .string()
    .min(1, {
      message: "Commission rate is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Commission rate must be a positive number.",
    }),
  status: z.string({ required_error: "Please select a status." }),
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
    defaultValues: {
      name: "",
      commissionRate: "",
      status: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission here
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className='sm:max-w-[500px] bg-gray-900 border-gray-800 text-white max-h-screen overflow-y-auto scroll-hide'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle className='text-xl font-semibold text-center'>Closer management</DialogTitle>
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
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Assigned Client</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={"1"}>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5'>
                      <SelectValue placeholder='Select Client to assign' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-700'>
                      {[{ id: "1", name: "Acme Corp" }].map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id}
                          className='text-white hover:bg-gray-700 focus:bg-gray-700'
                        >
                          {client.name}
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
              name='commissionRate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Commission Rate</FormLabel>
                  <FormControl>
                    <div className='flex items-center relative'>
                      <Input
                        type='number'
                        placeholder='Enter Monthly Target'
                        {...field}
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5'
                      />
                      <span className='absolute right-2 h-4 w-4 opacity-50'>%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
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
