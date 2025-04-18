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
import React, { useState, useEffect } from "react";
import { TableToken, tokens } from "../components/common/tokensData";
import transactions from "../components/common/transactions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import FilterDialog from "../components/dialogs/FilterDialog";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const [filters, setFilters] = useState({});
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const navigate = useNavigate();
  // const openFilterDialog = () => {
  //   console.log("Hello");
  // };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    const filtered = transactions.filter((transaction) => {
      const matchesTransactionType = appliedFilters.transactionType
        ? transaction.transactionType === appliedFilters.transactionType
        : true;
      const matchesPriceRange =
        (!appliedFilters.minPrice ||
          transaction.tokenPrice >= appliedFilters.minPrice) &&
        (!appliedFilters.maxPrice ||
          transaction.tokenPrice <= appliedFilters.maxPrice);
      const matchesProfitLoss = appliedFilters.profitLoss
        ? (appliedFilters.profitLoss === "profit" &&
            transaction.profitLoss > 0) ||
          (appliedFilters.profitLoss === "loss" && transaction.profitLoss <= 0)
        : true;

      return matchesTransactionType && matchesPriceRange && matchesProfitLoss;
    });

    setFilteredTransactions(filtered);
  };

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
            className="h-12 bg-white border-black text-black border-opacity-15 shadow-sm"
          >
            <ArrowRightFromLine />
            Export
          </Button>
        </div>
        <Separator className="mb-4" />

        {/* Content Section */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-row w-full gap-4 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 bg-none border-black border-opacity-15 text-black bg-white "
                >
                  <Filter />
                  Filter
                </Button>
              </DialogTrigger>
              <FilterDialog onApplyFilters={handleApplyFilters} />
            </Dialog>
            <DatePickerWithRange className="text-black" />
          </div>
          <ScrollArea className="w-full h-[31rem]">
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
                {filteredTransactions.map((transaction, index) => (
                  <React.Fragment key={index}>
                    <TableRow
                      onClick={() =>
                        navigate(`/land-detail/${transaction.tokenCode}`)
                      }
                    >
                      <TableCell>
                        <LandInfo
                          tokenCode={transaction.tokenCode}
                          propertyLocation={transaction.propertyLocation}
                          propertyType={transaction.propertyType}
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
