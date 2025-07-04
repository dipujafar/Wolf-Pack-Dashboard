import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProfileInformation() {
  return (
    <div className="">
      <Card className="bg-white/15 border border-none">
        <CardContent className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 p-1">
                <div className="w-full h-full rounded-full bg-stone-800 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/hr-image.png"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-sm">
              <div className="text-center md:text-left">
                <div className="text-stone-400 mb-1">Name</div>
                <div className="text-stone-200 font-medium">Alex Johnson</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-stone-400 mb-1">Contact</div>
                <div className="text-stone-200 font-medium">
                  contact2345@gmail.com
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-stone-400 mb-1">Date of Join</div>
                <div className="text-stone-200 font-medium">April 1, 2025</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Revenue */}
            <div className=" bg-stone-800/50 rounded-lg p-4">
              <div className="text-stone-400 text-sm mb-1">Total Revenue</div>
              <div className="text-stone-200 text-xl font-bold">€150,000</div>
            </div>

            {/* Deals Closed */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Deals Closed</div>
              <div className="text-stone-200 text-xl font-bold">15</div>
            </div>

            {/* Status */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Status</div>
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                Active
              </Badge>
            </div>

            {/* Avg Deal Size */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Avg. Deal Size</div>
              <div className="text-stone-200 text-xl font-bold">€6,000</div>
            </div>

            {/* Monthly Target */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Monthly Target</div>
              <div className="text-stone-200 text-lg font-bold">€25,000</div>
              <div className="text-amber-400 text-sm">(90% achieved)</div>
            </div>

            {/* Leaderboard */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Leaderboard</div>
              <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                Gold League
              </Badge>
            </div>

            {/* Commission Rate */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-1">Commission Rate</div>
              <div className="text-stone-200 text-xl font-bold">15%</div>
            </div>

            {/* Badge */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="text-stone-400 text-sm mb-2">Badge</div>
              <div className="space-y-1">
                <div className="text-stone-200 text-sm font-medium">
                  2 earned
                </div>
                <div className="text-stone-400 text-xs">
                  (First 10k Month, Top Closer of the week)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
