"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  serviceOffered: z.string().min(1, {
    message: "Service offered is required.",
  }),
  targetAudience: z.string().min(1, {
    message: "Target audience is required.",
  }),
  contactNumber: z.string().min(1, {
    message: "Contact number is required.",
  }),
  location: z.string().min(1, {
    message: "Location is required.",
  }),
  assignCloser: z.string().min(1, {
    message: "Please assign a closer.",
  }),
  revenueTarget: z
    .string()
    .min(1, {
      message: "Revenue target is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Revenue target must be a positive number.",
    }),
  commissionRate: z
    .string()
    .min(1, {
      message: "Commission rate is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
      message: "Commission rate must be between 0 and 100.",
    }),
});

type FormValues = z.infer<typeof formSchema>;
const ClientDetails = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "John Doe",
      serviceOffered:
        "Software Development Company, Service Offered Web Development, SEO, UI/UX Design",
      targetAudience: "Small Business, Startup  ",
      contactNumber: "8801245697",
      location: "USA",
      assignCloser: "#000",
      revenueTarget: "10000",
      commissionRate: "10",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission here
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <FormField
          control={form.control}
          name='clientName'
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

        <>
          <FormField
            control={form.control}
            name='contactNumber'
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
            name='serviceOffered'
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
        </>

        <FormField
          control={form.control}
          name='assignCloser'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Assign Closer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5'>
                    <SelectValue placeholder='Enter assign closer' />
                  </SelectTrigger>
                </FormControl>
                {/*<SelectContent className='bg-gray-800 border-gray-700'>
                  {closers.map((closer) => (
                    <SelectItem
                      key={closer.id}
                      value={closer.id}
                      className='text-white hover:bg-gray-700 focus:bg-gray-700'
                    >
                      {closer.name}
                    </SelectItem>
                  ))}
                </SelectContent>*/}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <>
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
        </>

        <div className='flex gap-x-4 col-span-full'>
          <Button
            type='submit'
            size={"lg"}
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg group py-3 mt-6'
          >
            Save <AnimatedArrow />
          </Button>
          <Button
            size={"lg"}
            className='w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg group py-3 mt-6'
          >
            Cancel <AnimatedArrow />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientDetails;
