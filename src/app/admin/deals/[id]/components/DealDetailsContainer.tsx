"use client";

import { useGetSingleCloserQuery, useUpdateCloserMutation } from "@/redux/api/closerApi";
import type { TCloser } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  DollarSign,
  MapPin,
  Phone,
  Target,
  Percent,
  FileText,
  User,
  Mail,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { Error_Modal, Success_model } from "@/lib/utils";

const DealDetailsContainer = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleCloserQuery(id, { skip: !id });
  const dealData = data?.data as TCloser;

  const [updateCloser, { isLoading: isUpdating }] = useUpdateCloserMutation();

  const handleUpdateCloser = async ({ id, status }: { id: string; status: string }) => {
    try {
      await updateCloser({ id, data: { status } }).unwrap();
      Success_model({ title: "Closer updated successfully" });
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6 text-white'>
        <div className='animate-pulse'>
          <div className='h-8 bg-white/20 rounded w-1/3 mb-6'></div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-6'>
              <div className='h-48 bg-white/20 rounded'></div>
              <div className='h-64 bg-white/20 rounded'></div>
            </div>
            <div className='space-y-6'>
              <div className='h-32 bg-white/20 rounded'></div>
              <div className='h-48 bg-white/20 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dealData) {
    return (
      <div className='max-w-6xl mx-auto text-center py-12 text-white'>
        <p className='text-white/70'>Deal not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-sky-500/20 text-sky-300";
      case "CLOSED":
        return "bg-emerald-500/20 text-emerald-300";
      case "REJECTED":
        return "bg-rose-500/20 text-rose-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className='space-y-6 text-white'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Deal Details</h1>
          <p className='text-white/70'>Created on {formatDate(dealData.createdAt)}</p>
        </div>
        <Badge className={getStatusColor(dealData.status)}>{dealData.status}</Badge>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Deal Information */}
          <Card className='bg-white/10 backdrop-blur border border-white/20 text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5' />
                Deal Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Proposition</h3>
                <p className='text-white/70'>{dealData.proposition}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex  gap-3'>
                  <DollarSign className='h-4 w-4 text-emerald-400' />
                  <div>
                    <p className='text-sm text-white/70'>Deal Amount</p>
                    <p className='font-semibold'>{formatCurrency(dealData.amount)}</p>
                  </div>
                </div>

                <div className='flex  gap-3'>
                  <CalendarDays className='h-4 w-4 text-sky-400' />
                  <div>
                    <p className='text-sm text-white/70'>Deal Date</p>
                    <p className='font-semibold'>{formatDate(dealData.dealDate)}</p>
                  </div>
                </div>
              </div>

              {dealData.notes && (
                <>
                  <Separator className='bg-white/20' />
                  <div>
                    <h4 className='font-medium mb-2'>Notes</h4>
                    <p className='text-white/70'>{dealData.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card className='bg-white/10 backdrop-blur border border-white/20 text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='font-semibold text-lg'>{dealData.client.name}</h3>
                <p className='text-white/70'>{dealData.client.offer}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex gap-3'>
                  <Phone className='h-4 w-4 text-emerald-400' />
                  <div>
                    <p className='text-sm text-white/70'>Contact</p>
                    <p className='font-medium'>{dealData.client.contact}</p>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <MapPin className='h-4 w-4 text-rose-400' />
                  <div>
                    <p className='text-sm text-white/70'>Location</p>
                    <p className='font-medium'>{dealData.client.location}</p>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <Target className='h-4 w-4 text-sky-400' />
                  <div>
                    <p className='text-sm text-white/70'>Revenue Target</p>
                    <p className='font-medium'>{formatCurrency(dealData.client.revenueTarget)}</p>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <Percent className='h-4 w-4 text-violet-400' />
                  <div>
                    <p className='text-sm text-white/70'>Commission Rate</p>
                    <p className='font-medium'>{dealData.client.commissionRate}%</p>
                  </div>
                </div>
              </div>

              <div>
                <p className='text-sm text-white/70 mb-2'>Target Audience</p>
                <p className='font-medium'>{dealData.client.targetAudience}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* User Information */}
          <Card className='bg-white/10 backdrop-blur border border-white/20 text-white'>
            <CardHeader>
              <CardTitle className='text-lg'>Assigned User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-3 mb-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage
                    src={dealData.user.profilePicture || "/placeholder.svg"}
                    alt={dealData.user.name}
                  />
                  <AvatarFallback>{dealData.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold'>{dealData.user.name}</p>
                  <p className='text-sm text-white/70'>ID: {dealData.user.registeredId}</p>
                </div>
              </div>
              <div className='flex items-center gap-2 text-sm text-white/70'>
                <Mail className='h-4 w-4' />
                {dealData.user.email}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className='bg-white/10 backdrop-blur border border-white/20 text-white'>
            <CardHeader>
              <CardTitle className='text-lg'>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {dealData.closerDocuments && dealData.closerDocuments.length > 0 ? (
                <div className='space-y-3'>
                  {dealData.closerDocuments.map((doc, index) => (
                    <div
                      key={doc.id}
                      className='flex items-center justify-between p-3 border border-white/20 rounded-lg'
                    >
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-sky-400' />
                        <span className='text-sm font-medium'>Document {index + 1}</span>
                      </div>
                      <Button variant='ghost' size='sm' asChild>
                        <a
                          href={doc.document}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sky-400 hover:underline'
                        >
                          <ExternalLink className='h-4 w-4' />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-white/70 text-sm'>No documents available</p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className='bg-white/10 backdrop-blur border border-white/20 text-white'>
            <CardHeader>
              <CardTitle className='text-lg'>Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 '>
              <Button
                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
                disabled={dealData.status !== "OPEN" || isUpdating}
                onClick={() => handleUpdateCloser({ id: dealData.id, status: "CLOSED" })}
              >
                <CheckCircle className='h-4 w-4 mr-2' />
                Approve Deal
              </Button>
              <Button
                className='w-full bg-rose-600 hover:bg-rose-700 text-white'
                disabled={dealData.status !== "OPEN" || isUpdating}
                onClick={() => handleUpdateCloser({ id: dealData.id, status: "REJECTED" })}
              >
                <XCircle className='h-4 w-4 mr-2' />
                Reject Deal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsContainer;
