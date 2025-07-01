import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Project {
  id: string;
  status: "New" | "Open" | "Closed";
  companyName: string;
  startDate: string;
  endingDate: string;
  revenueTarget: string;
  revenueClosed: string;
  commissionEarned: string;
  commissionRate: string;
}

const projects: Project[] = [
  {
    id: "#1",
    status: "New",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€0.00",
    commissionRate: "10%",
  },
  {
    id: "#1",
    status: "Open",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€0.00",
    commissionRate: "10%",
  },
  {
    id: "#1",
    status: "Open",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€0.00",
    commissionRate: "10%",
  },
  {
    id: "#1",
    status: "New",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€0.00",
    commissionRate: "10%",
  },
  {
    id: "#1",
    status: "Closed",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€3,000",
    commissionRate: "10%",
  },
  {
    id: "#1",
    status: "Closed",
    companyName: "TechSavy Solutions Ltd.",
    startDate: "25 May, 2025",
    endingDate: "N/A",
    revenueTarget: "€10,000",
    revenueClosed: "€0.00",
    commissionEarned: "€3,000",
    commissionRate: "10%",
  },
];

const getStatusVariant = (status: Project["status"]) => {
  switch (status) {
    case "New":
      return "default";
    case "Open":
      return "secondary";
    case "Closed":
      return "destructive";
    default:
      return "default";
  }
};

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "New":
      return "bg-green-500 hover:bg-green-600";
    case "Open":
      return "bg-blue-500 hover:bg-blue-600";
    case "Closed":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function DealsHistory() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {projects.map((project, index) => (
          <Card key={index} className="bg-white/20 border-none text-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700"
                  />
                  <span className="text-sm text-gray-400">{project.id}</span>
                </div>
                <Badge
                  className={`${getStatusColor(
                    project.status
                  )} text-white border-0 text-xs px-2 py-1`}
                >
                  {project.status}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold mb-4 text-white">
                {project.companyName}
              </h3>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Start Date -</span>
                  <span className="text-gray-300">{project.startDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Ending date -</span>
                  <span className="text-gray-300">{project.endingDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Revenue Target -</span>
                  <span className="text-gray-300">{project.revenueTarget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Revenue Closed -</span>
                  <span className="text-gray-300">{project.revenueClosed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Commission Earned -</span>
                  <span className="text-gray-300">
                    {project.commissionEarned}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Commission Rate -</span>
                  <span className="text-gray-300">
                    {project.commissionRate}
                  </span>
                </div>
              </div>

              <Link href={`/closer/1/1`}>
                <Button
                  variant="outline"
                  className="w-full bg-transparent  border-white text-gray-300 hover:bg-gray-200 hover:text-black"
                >
                  👁 View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
