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
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Label } from "../components/ui/label";
import LandInfo, { getIcon } from "../components/common/LandInfo";
import { tokens, TableToken } from "../components/common/tokensData";
import Graphs from "../components/common/Graphs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";

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
      <div className="flex flex-col pl-2  ">
        <h3 className="font-bold text-black text-sm text-right">Rs {price}</h3>
        <h4 className="font-bold text-[#179413] text-xs text-right">
          +{profitAmount}%
        </h4>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { tokenId } = useParams(); // Get the tokenID from the URL
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch the token data based on the tokenID
    console.log("TokenID from URL:", tokenId); // Log the tokenID
    console.log("Tokens array:", tokens); // Log the tokens array

    const foundToken = tokens.find((t) => t.tokenCode === tokenId);
    console.log("Found Token:", foundToken); // Log the found token

    setToken(foundToken);
  }, [tokenId]);

  if (!token) {
    return <div>Loading...</div>; // Handle the case where the token is not found
  }
  // const chartData = token.

  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      <ScrollArea className="h-full">
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
                        {getIcon(token.propertyType)}
                      </div>
                      <div className="flex flex-col pl-2">
                        <h3 className="font-semibold text-black text-xl">
                          {token.tokenCode}
                        </h3>
                        <h4 className="font-semibold text-[#7d7d7d] text-md">
                          {token.propertyLocation}
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
                    <h1 className="text-3xl font-semibold text-black">
                      {token.amount}
                    </h1>
                  </div>
                </div>
                {/* Profit part */}
                <div className="flex flex-row items-end justify-start items-center gap-2">
                  <h1 className="text-3xl font-semibold text-black">
                    Rs. {token.tokenPrice}
                  </h1>
                  <h4
                    className={`font-bold text-xs ${
                      token.profitLoss > 0 ? "text-[#179413]" : "text-red-500"
                    }`}
                  >
                    {token.profitLoss > 0
                      ? `+${token.profitLoss}%`
                      : `${token.profitLoss}%`}
                  </h4>
                </div>
                {/* Graph */}
                <div className="flex flex-row w-full h-60 bg-white">
                  <Graphs
                    chartData={token.chartData}
                    chartConfig={{
                      commercial: {
                        label: "Commercial Token Value",
                        color: "#4CAF50", // Green color for commercial tokens
                      },
                      residential: {
                        label: "Residential Token Value",
                        color: "#2196F3", // Blue color for residential tokens
                      },
                      agricultural: {
                        label: "Agricultural Token Value",
                        color: "#FF9800", // Orange color for agricultural tokens
                      },
                      recreational: {
                        label: "Recreational Token Value",
                        color: "#9C27B0", // Purple color for recreational tokens
                      },
                    }}
                  />
                </div>
                {/* Key Details */}
                <div className="flex flex-col w-full">
                  <h1 className="font-normal text-black text-xl">
                    Key Details
                  </h1>
                  <div className="w-[640px] bg-white h-20 rounded-md border border-black border-opacity-20 flex flex-row items-center justify-between py-4 px-8 mt-2">
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex-1 flex flex-col justify-center">
                        <Label className="text-xs font-normal text-[#7d7d7d]">
                          Total Tokens
                        </Label>
                        <Label className="text-lg text-black font-medium border-none shadow-none ">
                          {token.amount}
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
                          {token.propertyType}
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
                          {token.size} aana
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
                  <ScrollArea className="h-[6.5rem]">
                    <p className="mt-2 text-[#636363] font-normal text-sm">
                      Explore this exclusive land token offering, featuring{` `}
                      {token.propertyLocation}, priced at {token.tokenPrice} per
                      token. This {token.propertyType} land is perfect for those
                      looking to invest in virtual or digital property. With
                      unique ownership rights and a secure blockchain-based
                      transaction system, this land token provides a new way to
                      own, trade, and develop land in the digital realm. Don’t
                      miss out on this innovative opportunity!
                    </p>
                  </ScrollArea>
                  <div className="w-full mt-4">
                    <MapComponent
                      city={""}
                      latLang={[
                        token.latLang.latitude,
                        token.latLang.longitude,
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="w-3/12 flex flex-col gap-2">
                {/* Tokens for Sale */}
                <div className="h-1/3 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                  <div className="flex flex-row items-center justify-between p-4  ">
                    <h1 className="font-medium text-black text-md">
                      Tokens For Sale
                    </h1>
                    <Button className="h-9 w-9 border border-black border-opacity-10">
                      <Plus />
                    </Button>
                  </div>
                  <ScrollArea className="h-64 px-3">
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
                              Rs {token.tokenPrice}
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
                    <ScrollBar className="hidden" />
                  </ScrollArea>
                </div>
                {/* Similar Lands */}
                <div className="h-1/3 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                  <div className="flex flex-row items-center justify-between p-4">
                    <h1 className="font-medium text-black text-md">
                      Similar Lands
                    </h1>
                  </div>
                  <ScrollArea className="h-[17rem]  rounded-2xl py-3 px-3 border-x-8 border-white ">
                    {tokens.map((token) => (
                      <div className="flex flex-col">
                        <div
                          key={token.tokenCode}
                          className="mb-2 flex flex-row gap-20 "
                        >
                          <LandInfo
                            tokenCode={token.tokenCode}
                            propertyLocation={token.propertyLocation}
                            propertyType={token.propertyType}
                          />
                          <div className="flex flex-col items-end">
                            <h3 className="font-bold text-black text-sm">
                              Rs. {token.tokenPrice}
                            </h3>
                            <h4
                              className={`font-bold text-xs ${
                                token.profitLoss > 0
                                  ? "text-[#179413]"
                                  : "text-red-500"
                              }`}
                            >
                              {token.profitLoss > 0
                                ? `+${token.profitLoss}%`
                                : `${token.profitLoss}%`}
                            </h4>
                          </div>
                        </div>
                        <Separator className="mb-4" />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
