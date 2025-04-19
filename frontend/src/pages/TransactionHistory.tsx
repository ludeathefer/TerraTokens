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
import { gql, useQuery } from "@apollo/client";
import {
  TransactedToken,
  TransactedTokensData,
} from "../types/transactedTypes";
import { useStore } from "../hooks/use-store";

export const GET_TRANSACTED_TOKENS = gql`
  query GetTransactedTokens {
    transactedTokens {
      id
      quantity
      price
      createdAt
      landToken {
        landId
        name
        totalTokens
        currentPrice
        propertyType
        propertySize
        propertySizeUnit
        landmark
        distanceFromLandmark
        distanceUnit
        propertyDescription
        latitude
        longitude
        prices {
          date
          value
        }
      }
      from {
        publicKey
        username
      }
      to {
        publicKey
        username
      }
    }
  }
`;

const generateRandomProfitLoss = () => {
  return Number((Math.random() * 2000 - 1000).toFixed(2)); // Random profit/loss between -1000 and 1000
};

const TransactionHistory = () => {
  const authToken = useStore().jwt;
  const myPublicKey = useStore().userPublicKey;
  const [filters, setFilters] = useState({});

  const navigate = useNavigate();
  // const openFilterDialog = () => {
  //   console.log("Hello");
  // };

  const { data, loading, error } = useQuery<TransactedTokensData>(
    GET_TRANSACTED_TOKENS
  );
  console.log(data?.transactedTokens?.[0]?.landToken.prices);

  const filteredTransactions = data?.transactedTokens.filter(
    (transaction: TransactedToken) =>
      transaction.from.publicKey === myPublicKey ||
      transaction.to.publicKey === myPublicKey
  );

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
              {/* <FilterDialog onApplyFilters={handleApplyFilters} /> */}
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
                {filteredTransactions?.map((transaction, index) => {
                  const profitLoss = generateRandomProfitLoss();
                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        onClick={() =>
                          navigate(
                            `/land-detail/${transaction?.landToken?.name}-${transaction?.landToken?.landId}`
                          )
                        }
                      >
                        <TableCell>
                          <LandInfo
                            tokenCode={`${transaction?.landToken?.name}-${transaction?.landToken?.landId}`}
                            propertyLocation={`${transaction?.landToken?.distanceFromLandmark} from ${transaction?.landToken?.landmark}`}
                            propertyType={transaction?.landToken?.propertyType}
                          />
                        </TableCell>
                        <TableCell className="text-black text-sm font-normal">
                          {transaction?.createdAt}
                        </TableCell>
                        <TableCell className="text-black text-sm font-normal">
                          {transaction?.from?.publicKey === myPublicKey
                            ? "Sold"
                            : "Bought"}
                        </TableCell>
                        <TableCell className="text-black text-sm font-bold">
                          {transaction?.quantity}
                        </TableCell>
                        <TableCell className="text-[#0c8ce9] text-sm font-semibold">
                          Rs {transaction?.price}
                        </TableCell>
                        <TableCell
                          className={`text-sm font-semibold ${
                            profitLoss > 0 ? "text-[#179413]" : "text-red-500"
                          }`}
                        >
                          {profitLoss > 0 ? `+${profitLoss}` : profitLoss}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
