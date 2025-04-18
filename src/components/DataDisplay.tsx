
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GemIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface DataDisplayProps {
  data: {
    data: {
      data: {
        uuid: string;
        master: {
          uuid: string;
          eligible_products: string[];
        };
        uw: {
          uuid: string;
          key: string;
          appliedDateNesfb: string;
          ntcFlag: boolean;
          policyVersion: string;
          tuEnquiriesLast30Days: number;
          totalActiveTradelines: number;
          totalCurrentBalance: number;
          totalEmiAmount: number;
          enquiryData: Array<{
            amount: number;
            creditorName: string;
            inquiryDate: string;
            inquiryType: string;
          }>;
          activeTradelineData: Array<{
            accountOpenedDate: string;
            amountPastDue: number;
            count30Plus12m: number;
            creditorName: string;
            currentBalance: number;
            emi: number;
            highBalance: number;
            loanType: string;
            max30Plus12m: number;
            mob: number;
            tenure: number;
          }>;
          touchPoint: string;
        };
      };
    };
  };
}

const DataDisplay = ({ data }: DataDisplayProps) => {
  // Safely access nested properties
  const uuid = data?.data?.data?.uuid || "No UUID";
  const eligible_products = data?.data?.data?.master?.eligible_products || [];
  const uw = data?.data?.data?.uw;

  const displayableUwFields = [
    { key: "Key", value: uw?.key },
    { key: "Applied Date", value: new Date(uw?.appliedDateNesfb || "").toLocaleDateString() },
    { key: "NTC Flag", value: uw?.ntcFlag ? "Yes" : "No" },
    { key: "Policy Version", value: uw?.policyVersion },
    { key: "TU Enquiries (Last 30 Days)", value: uw?.tuEnquiriesLast30Days },
    { key: "Total Active Tradelines", value: uw?.totalActiveTradelines },
    { key: "Total Current Balance", value: uw?.totalCurrentBalance },
    { key: "Total EMI Amount", value: uw?.totalEmiAmount?.toFixed(2) },
    { key: "Touch Point", value: uw?.touchPoint },
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Hello User</h1>
        <p className="text-sm text-gray-400">{uuid}</p>
      </div>

      <div className="relative px-12">
        <h2 className="text-xl font-semibold mb-4">Eligible Products</h2>
        <Carousel>
          <CarouselContent>
            {eligible_products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="bg-white border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <GemIcon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-gray-800 font-medium capitalize">{product}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Underwriting Data</h2>
          <div className="grid grid-cols-2 gap-4">
            {displayableUwFields.map((field, index) => (
              <React.Fragment key={index}>
                <div className="text-gray-600 font-medium">{field.key}:</div>
                <div className="text-gray-900">{field.value}</div>
              </React.Fragment>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Enquiry Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Creditor Name</TableHead>
                <TableHead>Inquiry Date</TableHead>
                <TableHead>Inquiry Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uw?.enquiryData?.map((enquiry, index) => (
                <TableRow key={index}>
                  <TableCell>{enquiry.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
                  <TableCell>{enquiry.creditorName}</TableCell>
                  <TableCell>{new Date(enquiry.inquiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{enquiry.inquiryType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Tradeline Data</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creditor</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Current Balance</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Opening Date</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>MOB</TableHead>
                  <TableHead>High Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uw?.activeTradelineData?.map((tradeline, index) => (
                  <TableRow key={index}>
                    <TableCell>{tradeline.creditorName}</TableCell>
                    <TableCell>{tradeline.loanType}</TableCell>
                    <TableCell>{tradeline.currentBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
                    <TableCell>{tradeline.emi.toFixed(2)}</TableCell>
                    <TableCell>{new Date(tradeline.accountOpenedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{tradeline.tenure} months</TableCell>
                    <TableCell>{tradeline.mob}</TableCell>
                    <TableCell>{tradeline.highBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataDisplay;

