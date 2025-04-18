
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GemIcon, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  // Define search states for enquiry data
  const [enquirySearchKey, setEnquirySearchKey] = useState<string>("");
  const [enquirySearchValue, setEnquirySearchValue] = useState<string>("");
  
  // Define search states for active tradeline data
  const [tradelineSearchKey, setTradelineSearchKey] = useState<string>("");
  const [tradelineSearchValue, setTradelineSearchValue] = useState<string>("");

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

  // Get enquiry data keys for dropdown
  const enquiryKeys = uw?.enquiryData && uw.enquiryData.length > 0 
    ? Object.keys(uw.enquiryData[0]) 
    : [];

  // Get tradeline data keys for dropdown
  const tradelineKeys = uw?.activeTradelineData && uw.activeTradelineData.length > 0 
    ? Object.keys(uw.activeTradelineData[0]) 
    : [];

  // Filter enquiry data based on search
  const filteredEnquiryData = React.useMemo(() => {
    if (!uw?.enquiryData || !enquirySearchKey || !enquirySearchValue) {
      return uw?.enquiryData || [];
    }

    return uw.enquiryData.filter(item => {
      const itemValue = item[enquirySearchKey as keyof typeof item];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(enquirySearchValue.toLowerCase());
      } else if (typeof itemValue === 'number') {
        return itemValue.toString().includes(enquirySearchValue);
      }
      return false;
    });
  }, [uw?.enquiryData, enquirySearchKey, enquirySearchValue]);

  // Filter tradeline data based on search
  const filteredTradelineData = React.useMemo(() => {
    if (!uw?.activeTradelineData || !tradelineSearchKey || !tradelineSearchValue) {
      return uw?.activeTradelineData || [];
    }

    return uw.activeTradelineData.filter(item => {
      const itemValue = item[tradelineSearchKey as keyof typeof item];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(tradelineSearchValue.toLowerCase());
      } else if (typeof itemValue === 'number') {
        return itemValue.toString().includes(tradelineSearchValue);
      }
      return false;
    });
  }, [uw?.activeTradelineData, tradelineSearchKey, tradelineSearchValue]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Hello User</h1>
        <p className="text-sm text-gray-400">{uuid}</p>
      </div>

      <div className="relative px-8">
        <h2 className="text-xl font-semibold mb-4">Eligible Products</h2>
        <Carousel>
          <CarouselContent>
            {eligible_products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="bg-white border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform duration-200">
                  <GemIcon className="w-6 h-6 mx-auto mb-2 text-purple-500" />
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
        <Card className="p-6 shadow-sm bg-white/90 backdrop-blur-sm">
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

        <Card className="p-6 shadow-sm bg-white/90 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Enquiry Data</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="w-1/3">
              <Select value={enquirySearchKey} onValueChange={setEnquirySearchKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field to search" />
                </SelectTrigger>
                <SelectContent>
                  {enquiryKeys.map(key => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 relative">
              <Input
                placeholder={enquirySearchKey ? `Search by ${enquirySearchKey}...` : "Select a field first"}
                value={enquirySearchValue}
                onChange={(e) => setEnquirySearchValue(e.target.value)}
                disabled={!enquirySearchKey}
                className="pl-8"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
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
              {filteredEnquiryData.length > 0 ? (
                filteredEnquiryData.map((enquiry, index) => (
                  <TableRow key={index}>
                    <TableCell>{enquiry.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
                    <TableCell>{enquiry.creditorName}</TableCell>
                    <TableCell>{new Date(enquiry.inquiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>{enquiry.inquiryType}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    {enquirySearchKey && enquirySearchValue 
                      ? "No matching data found" 
                      : "No data available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6 shadow-sm bg-white/90 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Active Tradeline Data</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="w-1/3">
              <Select value={tradelineSearchKey} onValueChange={setTradelineSearchKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field to search" />
                </SelectTrigger>
                <SelectContent>
                  {tradelineKeys.map(key => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 relative">
              <Input
                placeholder={tradelineSearchKey ? `Search by ${tradelineSearchKey}...` : "Select a field first"}
                value={tradelineSearchValue}
                onChange={(e) => setTradelineSearchValue(e.target.value)}
                disabled={!tradelineSearchKey}
                className="pl-8"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
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
                {filteredTradelineData.length > 0 ? (
                  filteredTradelineData.map((tradeline, index) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      {tradelineSearchKey && tradelineSearchValue 
                        ? "No matching data found" 
                        : "No data available"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataDisplay;
