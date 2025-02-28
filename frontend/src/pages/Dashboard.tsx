import { BellDot, Plus, Filter } from "lucide-react";
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

interface TableToken {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  boughtDate: string;
  amount: number;
  profitLoss: number;
  tokenPrice: number;
}

const tokens: TableToken[] = [
  {
    tokenCode: "KTM-1154W5",
    propertyLocation: "Kathmandu Ward 1",
    propertyType: "commercial",
    boughtDate: "2023-01-01",
    amount: 10,
    profitLoss: 50,
    tokenPrice: 1000,
  },
  {
    tokenCode: "KTM-1154W6",
    propertyLocation: "Kathmandu Ward 2",
    propertyType: "residential",
    boughtDate: "2023-02-01",
    amount: 20,
    profitLoss: -20,
    tokenPrice: 500,
  },
];

interface WatchListCardProps {
  tokenCode: string;
  propertyLocation: string;
  price: number;
  profitAmount: number;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
}

interface WatchListCardProps {
  tokenCode: string;
  propertyLocation: string;
  price: number;
  profitAmount: number;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
}

const WatchListCard = ({
  tokenCode,
  propertyLocation,
  price,
  profitAmount,
  propertyType,
}: WatchListCardProps) => {
  return (
    <div className="flex flex-row bg-white w-full h-16 border border-[#848484] border-opacity-25 rounded-md px-4 items-center justify-between">
      <LandInfo
        tokenCode={tokenCode}
        propertyLocation={propertyLocation}
        propertyType={propertyType}
      />
      <div className="flex flex-col pl-2">
        <h3 className="font-bold text-black text-sm text-right">Rs {price}</h3>
        <h4 className="font-bold text-[#179413] text-xs text-right">
          +{profitAmount}%
        </h4>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg w-full h-full border border-[#848484] border-opacity-35 px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold text-black text-3xl">Dashboard</h1>
            <h5 className="font-semibold text-[#7d7d7d] text-md">
              Overview of your lands and investments
            </h5>
          </div>

          <Button
            variant="outline"
            className="h-12 w-12 bg-white border-black border-opacity-15 shadow-sm"
          >
            <BellDot />
          </Button>
        </div>
        <Separator className="mb-4" />

        {/* Content Section */}
        <div className="flex flex-col gap-3 h-full">
          {/* Upper Part */}
          <div className="flex flex-row h-[45%] gap-3">
            {/* Portfolio Overview */}
            <div className="w-9/12 bg-white h-full border border-[#848484] border-opacity-25 shadow-md rounded-md p-4">
              <div className="flex flex-row justify-between items-start">
                {/* Portfolio Value */}
                <div className="flex flex-col gap-y-0 items-start">
                  <Label className="text-sm font-semibold text-[#7d7d7d]">
                    Portfolio Value
                  </Label>
                  <h1 className="text-2xl font-semibold text-black">
                    Rs. 1,80,000
                  </h1>
                  <div className="flex flex-row items-center gap-1">
                    <Label className="text-xs font-semibold text-[#7d7d7d]">
                      Profit Amount:
                    </Label>
                    <Label className="text-sm font-semibold text-[#0c8ce9]">
                      Rs. 50,000
                    </Label>
                    <Label className="text-xs font-semibold text-[#179413]">
                      +50%
                    </Label>
                  </div>
                </div>
                {/* RHS Stats */}
                <div className="flex flex-row gap-2">
                  {/* Total Tokens */}
                  <div className="flex flex-col items-center gap-y-1">
                    <Label className="font-semibold text-[#7d7d7d] text-xs">
                      Total Tokens
                    </Label>
                    <h1 className="text-3xl font-semibold text-black">1200</h1>
                  </div>
                  <Separator orientation="vertical" className="h-full" />
                  <div className="flex flex-col items-start gap-y-1">
                    <Label className="font-semibold text-[#7d7d7d] text-xs">
                      Best Profit Land
                    </Label>
                    <LandInfo
                      tokenCode="KTM-1154W5"
                      propertyLocation="Kathmandu Ward 1"
                      propertyType="agricultural"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Watchlist */}
            <div className="w-3/12 bg-white h-full border border-[#848484] border-opacity-25 shadow-md rounded-md">
              <div className="flex flex-row items-center justify-between p-4">
                <h1 className="font-semibold text-black text-xl">Watchlist</h1>
                <Button className="h-9 w-9 border border-black border-opacity-10">
                  <Plus />
                </Button>
              </div>
              <ScrollArea className="h-full px-3">
                <WatchListCard
                  tokenCode="KTM-1154W5"
                  propertyLocation="Kathmandu Ward 1"
                  price={1000}
                  profitAmount={50}
                  propertyType="commercial"
                />
              </ScrollArea>
            </div>
          </div>
          {/* Lower Part */}
          <div className="flex flex-col h-[41%] bg-white border border-[#848484] border-opacity-25 shadow-md rounded-md p-4">
            <div className="flex flex-row w-full p-3 items-center justify-between">
              <h1 className="font-semibold text-black text-xl">My Tokens</h1>
              <Button className="bg-white border border-black border-opacity-15 shadow-md">
                <Filter />
                Filter
              </Button>
            </div>
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium text-xs">Token</TableHead>
                    <TableHead className="font-medium text-xs">
                      Bought Date
                    </TableHead>
                    <TableHead className="font-medium text-xs">
                      Number
                    </TableHead>
                    <TableHead className="font-medium text-xs">
                      Profit/Loss
                    </TableHead>
                    <TableHead className=" font-medium text-xs text-right">
                      Price for Token
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.tokenCode} className="my-2">
                      <TableCell>
                        <LandInfo
                          tokenCode={token.tokenCode}
                          propertyLocation={token.propertyLocation}
                          propertyType={token.propertyType}
                        />
                      </TableCell>
                      <TableCell className="font-normal text-black">
                        {token.boughtDate}
                      </TableCell>
                      <TableCell className="font-normal text-black">
                        {token.amount}
                      </TableCell>
                      <TableCell
                        className={`${
                          token.profitLoss > 0
                            ? "text-[#179413] font-bold"
                            : "text-red-500 font-bold"
                        }`}
                      >
                        {token.profitLoss > 0
                          ? `+${token.profitLoss}`
                          : token.profitLoss}
                      </TableCell>
                      <TableCell className="font-semibold text-black text-right">
                        Rs {token.tokenPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
