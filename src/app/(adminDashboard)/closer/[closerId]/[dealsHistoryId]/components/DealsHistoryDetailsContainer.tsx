import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download } from "lucide-react"

export default function DealsHistoryDetailsContainer() {
  return (
    <div className="min-h-[calc(100vh-150px)] flex justify-center items-center" >
      <Card className="bg-white/15 text-amber-50 border-none">
        <CardContent className="p-6 space-y-6">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-amber-200 mb-1">Client Name</div>
              <div className="font-medium">TechSavy Solutions</div>
            </div>
            <div>
              <div className="text-amber-200 mb-1">Start Date</div>
              <div className="font-medium">April 1, 2025</div>
            </div>
            <div>
              <div className="text-amber-200 mb-1">Ending Date</div>
              <div className="font-medium">May 1, 2025</div>
            </div>
            <div className="md:col-start-2 lg:col-start-4">
              <div className="text-amber-200 mb-1">Status</div>
              <div className="font-medium">Closed</div>
            </div>
          </div>

          {/* Financial Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-amber-200 mb-1">Revenue Target</div>
              <div className="font-medium">€10,000</div>
            </div>
            <div>
              <div className="text-amber-200 mb-1">Revenue Closed</div>
              <div className="font-medium">€8,000</div>
            </div>
            <div className="md:col-start-1 md:row-start-2">
              <div className="text-amber-200 mb-1">Commission Rate</div>
              <div className="font-medium">€8,000</div>
            </div>
            <div className="md:col-start-2 md:row-start-2">
              <div className="text-amber-200 mb-1">Progress</div>
              <div className="space-y-2">
                <div className="font-medium">80%</div>
                <Progress value={80} className="h-2 bg-amber-800">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: "80%" }}
                  />
                </Progress>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <div className="text-amber-200 text-sm">Notes</div>
            <div className="text-sm leading-relaxed bg-yellow-500/10 p-4 rounded-lg">
              Successfully closed this deal with XYZ Coaching Academy. The client was initially hesitant about the price
              but I worked with them to customize the coaching package, offering additional support during the program.
              We agreed on a final price of $7,500. The contract was signed on June 26th after the client reviewed the
              terms and conditions. I followed up with them after the proposal was sent and answered any final questions
              they had about the program.
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-3">
            <div className="text-amber-200 text-sm">Document</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between bg-yellow-500/10 p-3 rounded-lg border border-amber-800/20">
                <span className="text-sm font-medium">Signed Contract.pdf</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-amber-800 border-amber-700 text-amber-100 hover:bg-amber-700 hover:text-amber-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between bg-yellow-500/10 p-3 rounded-lg border border-amber-800/20">
                <span className="text-sm font-medium">Invoice.pdf</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-amber-800 border-amber-700 text-amber-100 hover:bg-amber-700 hover:text-amber-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
