"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  assignedClient: z.string().min(1, {
    message: "Please select a client to assign.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  monthlyTarget: z
    .string()
    .min(1, {
      message: "Monthly target is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Monthly target must be a positive number.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock client data
const clients = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "TechStart Inc" },
  { id: "3", name: "Global Solutions" },
  { id: "4", name: "Innovation Labs" },
];

export default function AddCloserForm({
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
      email: "",
      assignedClient: "",
      monthlyTarget: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission here
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white max-h-screen overflow-y-auto scroll-hide">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-center">
            Closer management
          </DialogTitle>
          <div className="border rounded-full flex justify-center items-center  border-red-500">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-6 w-6 hover:bg-gray-700 rounded-full"
            >
              <X className="h-4 w-4" color="#ef4444" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter closer Name"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter closer email address"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedClient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Assigned Client</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5">
                        <SelectValue placeholder="Select Client to assign" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
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
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="py-5">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700 focus:border-yellow-500",
                            !field.value && "text-gray-400"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Enter Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-gray-800 border-gray-700"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Monthly Target</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Monthly Target"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold  rounded-lg group py-5"
            >
              Save <AnimatedArrow />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
