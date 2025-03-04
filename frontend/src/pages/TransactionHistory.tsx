import { BellDot, Plus, Filter, ArrowRightFromLine } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Label } from "../components/ui/label";
import LandInfo from "../components/common/LandInfo";
import { DatePickerWithRange } from "../components/ui/date-picker";
import React from "react";

interface TableToken {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  boughtDate: string;
  amount: number;
  profitLoss: number;
  tokenPrice: number;
}

const transactions = [
  {
    tokenCode: "KTM-1154W5",
    propertyLocation: "Kathmandu Ward 1",
    propertyType: "commercial",
    transactionDate: "2023-01-01",
    transactionType: "Bought",
    amount: 10,
    tokenPrice: 1000,
    profitLoss: 50,
  },
  {
    tokenCode: "KTM-1154W6",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    transactionDate: "2023-02-01",
    transactionType: "Sold",
    amount: 20,
    tokenPrice: 500,
    profitLoss: -20,
  },
];

const TransactionHistory = () => {
  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg w-full h-full border border-[#848484] border-opacity-35 px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold text-black text-3xl">
              Transaction History
            </h1>
            <h5 className="font-semibold text-[#7d7d7d] text-md">
              View all your past transactions
            </h5>
          </div>

          <Button
            variant="outline"
            className="h-12  bg-white border-black border-opacity-15 shadow-sm"
          >
            <ArrowRightFromLine />
            Export
          </Button>
        </div>
        <Separator className="mb-4" />

        {/* Content Section */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-row w-full gap-4 items-center">
            <Button className="h-10 bg-none border-black border-opacity-15">
              <Filter />
              Filter
            </Button>
            <DatePickerWithRange />
          </div>
          <ScrollArea className="w-full h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium">Token</TableHead>
                  <TableHead className="text-xs font-medium">
                    Transaction Date
                  </TableHead>
                  <TableHead className="text-xs font-medium">
                    Bought/Sold
                  </TableHead>
                  <TableHead className="text-xs font-medium">Number</TableHead>
                  <TableHead className="text-xs font-medium">
                    Price for Token
                  </TableHead>
                  <TableHead className="text-xs font-medium">
                    Profit/Loss
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>
                        <LandInfo
                          tokenCode={transaction.tokenCode}
                          propertyLocation={transaction.propertyLocation}
                          propertyType={"commercial"}
                        />
                      </TableCell>
                      <TableCell className="text-black text-sm font-normal">
                        {transaction.transactionDate}
                      </TableCell>
                      <TableCell className="text-black text-sm font-normal">
                        {transaction.transactionType}
                      </TableCell>
                      <TableCell className="text-black text-sm font-bold">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="text-[#0c8ce9] text-sm font-semibold">
                        Rs {transaction.tokenPrice}
                      </TableCell>
                      <TableCell
                        className={`text-sm font-semibold ${
                          transaction.profitLoss > 0
                            ? "text-[#179413]"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.profitLoss > 0
                          ? `+${transaction.profitLoss}`
                          : transaction.profitLoss}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
