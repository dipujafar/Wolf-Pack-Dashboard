"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
})

type FormValues = z.infer<typeof formSchema>

// Mock closer data
const closers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Mike Davis" },
  { id: "4", name: "Emily Brown" },
]

function AnimatedArrow() {
  return <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
}

export default function AddClientForm({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      serviceOffered: "",
      targetAudience: "",
      contactNumber: "",
      location: "",
      assignCloser: "",
      revenueTarget: "",
      commissionRate: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
    // Handle form submission here
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white max-h-screen overflow-y-auto scroll-hide">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-center">Client management</DialogTitle>
          <div className="border rounded-full flex justify-center items-center border-red-500">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Client Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Client Name"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceOffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Service Offered</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter service offered"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Target Audience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter target audience"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Contact number"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Location"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assignCloser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Assign Closer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 py-5">
                        <SelectValue placeholder="Enter assign closer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {closers.map((closer) => (
                        <SelectItem
                          key={closer.id}
                          value={closer.id}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {closer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="revenueTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Revenue Target</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <Input
                          type="number"
                          placeholder="Enter Revenue Target"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commissionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Commission Rate</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Enter Commission Rate"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 py-5 pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg group py-3 mt-6"
            >
              Save <AnimatedArrow />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
