"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download } from "lucide-react";
import { useGetSingleCloserQuery } from "@/redux/api/closerApi";
import { TCloser } from "@/types";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DealsHistoryDetailsContainer({ closerId }: { closerId: string }) {
  const router = useRouter();
  const { data, isLoading } = useGetSingleCloserQuery(closerId);
  const closerData = data?.data as TCloser;

  if (isLoading) {
    return (
      <div className='min-h-[calc(100vh-150px)] flex justify-center items-center text-amber-100 text-lg font-medium'>
        Loading deal details...
      </div>
    );
  }

  if (!closerData) {
    return (
      <div className='min-h-[calc(100vh-150px)] flex justify-center items-center text-amber-100 text-lg font-medium'>
        No deal found.
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-150px)] flex justify-center'>
      <Card className='bg-white/10 text-amber-50 border border-white/10 w-full max-w-5xl shadow-lg rounded-xl backdrop-blur-sm'>
        <ArrowLeft className='absolute top-2 left-2 cursor-pointer' onClick={() => router.back()} />
        <CardContent className='p-8 space-y-8'>
          {/* Header Section */}
          <section>
            <h2 className='text-lg font-semibold text-amber-300 mb-4'>Deal Information</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              <InfoItem label='Client Name' value={closerData.client?.name} />
              <InfoItem
                label='Start Date'
                value={closerData.dealDate ? moment(closerData.dealDate).format("LL") : "N/A"}
              />
              <InfoItem label='Status' value={closerData.status} />
            </div>
          </section>

          {/* Financial Section */}
          <section>
            <h2 className='text-lg font-semibold text-amber-300 mb-4'>Financial Details</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              <InfoItem
                label='Revenue Target'
                value={`€${closerData.client?.revenueTarget?.toLocaleString() || "0"}`}
              />
              <InfoItem
                label='Revenue Closed'
                value={`€${closerData.amount?.toLocaleString() || "0"}`}
              />
              <InfoItem
                label='Commission Rate'
                value={
                  closerData.client?.commissionRate ? `${closerData.client.commissionRate}%` : "N/A"
                }
              />
            </div>
          </section>

          {/* Notes Section */}
          <section>
            <h2 className='text-lg font-semibold text-amber-300 mb-3'>Notes</h2>
            <div className='bg-yellow-500/10 p-5 rounded-lg text-sm leading-relaxed border border-amber-500/20'>
              {closerData.notes || "No notes available."}
            </div>
          </section>

          {/* Documents Section */}
          <section>
            <h2 className='text-lg font-semibold text-amber-300 mb-4'>Documents</h2>
            {closerData.closerDocuments?.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {closerData.closerDocuments.map((doc, index) => (
                  <div
                    key={doc.id}
                    className='flex items-center justify-between bg-yellow-500/10 p-4 rounded-lg border border-amber-800/20 hover:border-amber-400 transition-colors'
                  >
                    <span className='text-sm font-medium truncate'>Document {index + 1}</span>
                    <Link href={doc.document} target='_blank' download>
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-amber-800 border-amber-700 text-amber-100 hover:bg-amber-700 hover:text-amber-50'
                      >
                        <Download className='w-4 h-4 mr-1' />
                        Export
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-amber-200'>No documents available.</p>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

/** Small reusable info display component */
function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
      <div className='text-amber-200 text-xs mb-1'>{label}</div>
      <div className='font-medium'>{value || "N/A"}</div>
    </div>
  );
}
