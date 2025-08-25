"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Download } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleClientQuery } from "@/redux/api/clientApi";
import { TClient } from "@/types";
import DealsHistoryDetailsContainer from "@/app/admin/closer/[closerId]/[dealsHistoryId]/components/DealsHistoryDetailsContainer";

const formSchema = z.object({
  revenueTarget: z.string({ message: "Please enter a valid number." }),
  revenueClosed: z.string({ message: "Please enter a valid number." }),
  status: z.string({ required_error: "Please select a status." }),
  assignedClient: z.string().min(1, { message: "Please select a client to assign." }),
  endingDate: z.date(),
  commission: z
    .string({ message: "Please enter a valid number." })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Monthly target must be a positive number.",
    }),
  progress: z.string({ message: "Please enter a valid number." }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CloserDetails = ({ clientId }: { clientId: string }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      revenueTarget: "",
      revenueClosed: "",
      assignedClient: "",
      commission: "",
      progress: "",
      status: "",
      endingDate: new Date(),
      notes:
        "Successfully closed this deal with XYZ Coaching Academy. The client was initially hesitant about the price but I worked with them to customize the coaching package, offering additional support during the program. We agreed on a final price of $7,500. The contract was signed on June 28th after the client reviewed the terms and conditions. I followed up with them after the proposal was sent and answered any final questions they had about the program. ",
    },
  });

  const clients = [
    { id: "1", name: "Acme Corp" },
    { id: "2", name: "TechStart Inc" },
    { id: "3", name: "Global Solutions" },
    { id: "4", name: "Innovation Labs" },
  ];

  const statuses = ["Pending", "In Progress", "Completed"];

  function onSubmit(values: FormValues) {
    form.reset();
  }

  const { data, isLoading } = useGetSingleClientQuery(clientId);
  const clientData = data?.data as TClient;

  if (isLoading) {
    return (
      <div className='min-h-[calc(100vh-150px)] flex justify-center items-center text-amber-100 text-lg font-medium'>
        Loading...
      </div>
    );
  }


  if (!clientData?.closer?.id) {
    return (
      <div className='min-h-[calc(100vh-150px)] flex justify-center items-center text-amber-100 text-lg font-medium'>
        No deal found.
      </div>
    );
  }

  return (
    //<Form {...form}>
    //  <form
    //    onSubmit={form.handleSubmit(onSubmit)}
    //    className='grid grid-cols-1 lg:grid-cols-2 gap-4'
    //  >
    //    {/* Assigned Client */}
    //    <FormField
    //      control={form.control}
    //      name='assignedClient'
    //      render={({ field }) => (
    //        <FormItem className='col-span-full'>
    //          <FormLabel className='text-white'>Assigned Client</FormLabel>
    //          <Select onValueChange={field.onChange} defaultValue={field.value}>
    //            <FormControl>
    //              <SelectTrigger className='bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5'>
    //                <SelectValue placeholder='Select Client to assign' />
    //              </SelectTrigger>
    //            </FormControl>
    //            <SelectContent className='bg-gray-800 border-gray-700'>
    //              {clients.map((client) => (
    //                <SelectItem
    //                  key={client.id}
    //                  value={client.id}
    //                  className='text-white hover:bg-gray-700 focus:bg-gray-700'
    //                >
    //                  {client.name}
    //                </SelectItem>
    //              ))}
    //            </SelectContent>
    //          </Select>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Revenue Target */}
    //    <FormField
    //      control={form.control}
    //      name='revenueTarget'
    //      render={({ field }) => (
    //        <FormItem>
    //          <FormLabel className='text-white'>Revenue Target</FormLabel>
    //          <FormControl>
    //            <div className='relative'>
    //              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
    //                $
    //              </span>
    //              <Input
    //                type='number'
    //                placeholder='Enter Revenue Target'
    //                {...field}
    //                className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pl-8'
    //              />
    //            </div>
    //          </FormControl>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Revenue Closed */}
    //    <FormField
    //      control={form.control}
    //      name='revenueClosed'
    //      render={({ field }) => (
    //        <FormItem>
    //          <FormLabel className='text-white'>Revenue Closed</FormLabel>
    //          <FormControl>
    //            <div className='relative'>
    //              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
    //                $
    //              </span>
    //              <Input
    //                type='number'
    //                placeholder='Enter Revenue Closed'
    //                {...field}
    //                className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pl-8'
    //              />
    //            </div>
    //          </FormControl>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Commission */}
    //    <FormField
    //      control={form.control}
    //      name='commission'
    //      render={({ field }) => (
    //        <FormItem>
    //          <FormLabel className='text-white'>Commission</FormLabel>
    //          <FormControl>
    //            <Input
    //              type='number'
    //              placeholder='Enter Commission'
    //              {...field}
    //              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
    //            />
    //          </FormControl>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Progress */}
    //    <FormField
    //      control={form.control}
    //      name='progress'
    //      render={({ field }) => (
    //        <FormItem>
    //          <FormLabel className='text-white'>Progress (%)</FormLabel>
    //          <FormControl>
    //            <Input
    //              type='number'
    //              placeholder='Enter Progress'
    //              {...field}
    //              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
    //            />
    //          </FormControl>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Status */}
    //    <FormField
    //      control={form.control}
    //      name='status'
    //      render={({ field }) => (
    //        <FormItem>
    //          <FormLabel className='text-white'>Status</FormLabel>
    //          <Select onValueChange={field.onChange} defaultValue={field.value}>
    //            <FormControl>
    //              <SelectTrigger className='bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5'>
    //                <SelectValue placeholder='Select Status' />
    //              </SelectTrigger>
    //            </FormControl>
    //            <SelectContent className='bg-gray-800 border-gray-700'>
    //              {statuses.map((status) => (
    //                <SelectItem
    //                  key={status}
    //                  value={status}
    //                  className='text-white hover:bg-gray-700 focus:bg-gray-700'
    //                >
    //                  {status}
    //                </SelectItem>
    //              ))}
    //            </SelectContent>
    //          </Select>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Ending Date */}
    //    <FormField
    //      control={form.control}
    //      name='endingDate'
    //      render={({ field }) => (
    //        <FormItem className='flex flex-col mt-2'>
    //          <FormLabel className='text-white'>Ending Date</FormLabel>
    //          <Popover>
    //            <PopoverTrigger asChild className='py-5'>
    //              <FormControl>
    //                <Button
    //                  variant='outline'
    //                  className={cn(
    //                    "w-full pl-3 text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700 focus:border-yellow-500",
    //                    !field.value && "text-gray-400",
    //                  )}
    //                >
    //                  {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
    //                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
    //                </Button>
    //              </FormControl>
    //            </PopoverTrigger>
    //            <PopoverContent className='w-auto p-0 bg-gray-800 border-gray-700' align='start'>
    //              <Calendar
    //                mode='single'
    //                selected={field.value}
    //                onSelect={field.onChange}
    //                disabled={(date) => date < new Date("1900-01-01")}
    //                initialFocus
    //                className='bg-gray-800 text-white'
    //              />
    //            </PopoverContent>
    //          </Popover>
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    {/* Notes */}
    //    <FormField
    //      control={form.control}
    //      name='notes'
    //      render={({ field }) => (
    //        <FormItem className='col-span-full'>
    //          <FormLabel className='text-white'>Ending Date</FormLabel>
    //          <Textarea
    //            placeholder='Enter Notes'
    //            rows={4}
    //            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5'
    //            {...field}
    //          />
    //          <FormMessage />
    //        </FormItem>
    //      )}
    //    />

    //    <div className='col-span-full space-y-4'>
    //      <h2 className='text-lg font-semibold text-white'>Document</h2>
    //      <div className='grid grid-cols-2 gap-4'>
    //        <div className='space-y-3'>
    //          <h3 className='font-semibold text-white'>Signed Contract.pdf</h3>
    //          <a href='' download className='block'>
    //            <Button className='w-full'>
    //              <Download className='text-white' /> Export
    //            </Button>
    //          </a>
    //        </div>
    //        <div className='space-y-3'>
    //          <h3 className='font-semibold text-white'>Invoice.pdf</h3>
    //          <a href='download' download className='block'>
    //            <Button className='w-full'>
    //              <Download className='text-white' /> Export
    //            </Button>
    //          </a>
    //        </div>
    //      </div>
    //    </div>

    //    <Button
    //      type='submit'
    //      size={"lg"}
    //      className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg group py-5'
    //    >
    //      Save <AnimatedArrow />
    //    </Button>
    //    <Button
    //      size={"lg"}
    //      className='w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg group py-5'
    //    >
    //      Cancel <AnimatedArrow />
    //    </Button>
    //  </form>
    //</Form>
    <>
      <DealsHistoryDetailsContainer closerId={clientData?.closer?.id} />
    </>
  );
};

export default CloserDetails;
