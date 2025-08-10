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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateBadgeMutation } from "@/redux/api/badgeApi"; // Adjust path
import { Error_Modal, Success_model } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  icon: z.instanceof(File, { message: "Image is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  dealCount: z.coerce.number().min(1, { message: "Deal count must be at least 1." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddBadgeForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [createBadge, { isLoading }] = useCreateBadgeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dealCount: 1,
      icon: undefined as unknown as File,
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();

    // Append file
    formData.append("file", values.icon);

    // Append data object as JSON string
    formData.append(
      "data",
      JSON.stringify({
        name: values.name,
        description: values.description,
        dealCount: values.dealCount,
      }),
    );

    try {
      await createBadge(formData).unwrap();
      setOpen(false);
      form.reset();
      Success_model({ title: "Badge created successfully!!" });
    } catch (err:any) {
      console.error("Badge creation failed", err);
      Error_Modal({ title: err?.data?.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className='sm:max-w-[500px] bg-gray-900 border-gray-800 text-white'>
        <DialogHeader className='flex justify-between items-center'>
          <DialogTitle>Add Badge</DialogTitle>
          <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
            <X className='h-4 w-4 text-red-500' />
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Icon Upload */}
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image/Icon</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className='bg-gray-800 border-gray-700 text-white py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter badge name'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter badge description'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deal Count */}
            <FormField
              control={form.control}
              name='dealCount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deal Count</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter deal count'
                      {...field}
                      className='bg-gray-800 border-gray-700 text-white py-5'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isLoading} className='w-full bg-yellow-500 py-5'>
              Save <AnimatedArrow />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
