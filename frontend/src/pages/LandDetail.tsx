import { BellDot, Plus, Filter, Star, GitCompare } from "lucide-react";
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
import LandInfo, { getIcon } from "../components/common/LandInfo";

const tokens = [
  {
    amount: 10,
    pricePerToken: 1000,
  },
  {
    amount: 20,
    pricePerToken: 500,
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
        {/* Content Section */}
        <div className="flex flex-col gap-3 h-full">
          {/* Upper Part */}
          <div className="flex flex-row h-full gap-3 justify-between">
            <div className="flex flex-col justify-start gap-4 item-center h-full w-7/12">
              {/* Token Header */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row  items-center h-16 gap-8">
                  <div className="flex flex-row h-full w-full items-center">
                    <div className="flex flex-row justify-center items-center w-16 h-16 rounded-full shadow-md bg-white border-black border-opacity-20 border">
                      {getIcon("commercial")}
                    </div>
                    <div className="flex flex-col pl-2">
                      <h3 className="font-semibold text-black text-xl">
                        KTM-11554
                      </h3>
                      <h4 className="font-semibold text-[#7d7d7d] text-md">
                        Kathmandu Ward 1
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Button className="w-8 h-8 border border-black border-opacity-15 shadow-sm">
                      <Star />
                    </Button>
                    <Button className="w-8 h-8 border border-black border-opacity-15 shadow-sm ">
                      <GitCompare />
                    </Button>
                  </div>
                </div>
                {/* Total Tokens */}
                <div className="flex flex-col items-center gap-y-1">
                  <Label className="font-semibold text-[#7d7d7d] text-xs">
                    Total Tokens
                  </Label>
                  <h1 className="text-3xl font-semibold text-black">1200</h1>
                </div>
              </div>
              {/* Profit part */}
              <div className="flex flex-row items-end justify-start gap-2">
                <h1 className="text-3xl font-semibold text-black">Rs. 1,500</h1>
                <Label className="text-sm font-bold text-[#179413]">+50%</Label>
              </div>
              {/* Graph */}
              <div className="flex flex-row w-full h-60 bg-green-300"></div>
              {/* Key Details */}
              <div className="flex flex-col w-full">
                <h1 className="font-normal text-black text-xl">Key Details</h1>
                <div className="w-[640px] bg-white h-20 rounded-md border border-black border-opacity-20 flex flex-row items-center justify-between py-4 px-8 mt-2">
                  <div className="flex flex-row items-center gap-8">
                    <div className="flex-1 flex flex-col justify-center">
                      <Label className="text-xs font-normal text-[#7d7d7d]">
                        Total Tokens
                      </Label>
                      <Label className="text-lg text-black font-medium border-none shadow-none ">
                        Rs 1200
                      </Label>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-14 bg-[#E4E4E7]"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <Label className="text-xs font-normal text-[#7d7d7d]">
                        Property Type
                      </Label>
                      <Label className="text-lg text-black font-medium border-none shadow-none ">
                        Residential
                      </Label>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-14 bg-[#E4E4E7]"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <Label className="text-xs font-normal text-[#7d7d7d]">
                        Property Size
                      </Label>
                      <Label className="text-lg text-black font-medium border-none shadow-none ">
                        16 Aana
                      </Label>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-14 bg-[#E4E4E7]"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <Label className="text-xs font-normal text-[#7d7d7d] overflow-auto">
                        Dist. from Ring Road
                      </Label>
                      <Label className="text-lg text-black font-medium border-none shadow-none ">
                        16 Km
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="font-normal text-black text-xl">
                  Property Description
                </h1>
                <ScrollArea className="h-32">
                  <p className="mt-2 text-[#636363] font-normal text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat
                    .Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </ScrollArea>
              </div>
            </div>

            <div className="w-3/12 flex flex-col gap-2">
              {/* Tokens for Sale */}
              <div className="h-1/2 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                <div className="flex flex-row items-center justify-between p-4">
                  <h1 className="font-medium text-black text-md">
                    Tokens For Sale
                  </h1>
                  <Button className="h-9 w-9 border border-black border-opacity-10">
                    <Plus />
                  </Button>
                </div>
                <ScrollArea className="h-full px-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium">
                          Amount
                        </TableHead>
                        <TableHead className="text-xs font-medium">
                          Price Per Token
                        </TableHead>
                        <TableHead className="text-xs font-medium">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens.map((token, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-black text-sm font-normal">
                            {token.amount}
                          </TableCell>
                          <TableCell className="text-black text-sm font-normal">
                            Rs {token.pricePerToken}
                          </TableCell>
                          <TableCell>
                            <Label className="text-[#0c8ce9] text-sm font-bold">
                              Buy
                            </Label>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              {/* Similar Lands */}
              <div className="h-1/2 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                <div className="flex flex-row items-center justify-between p-4">
                  <h1 className="font-medium text-black text-md">
                    Similar Lands
                  </h1>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
