import { BellDot, Plus, Filter, ChartColumn } from "lucide-react";
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
import { useState } from "react";
import { tokens, TableToken } from "../components/common/tokensData";
import WatchlistDialog from "../components/dialogs/WatchlistDialog";
import Graphs from "../components/common/Graphs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import FilterDialog from "../components/dialogs/FilterDialog";
import transactions from "../components/common/transactions";
import { useNavigate } from "react-router-dom";

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

// const WatchListCard = ({
//   tokenCode,
//   propertyLocation,
//   price,
//   profitAmount,
//   propertyType,
// }: WatchListCardProps) => {
//   return (
//     <div className="flex flex-row bg-white w-full h-16 border border-[#848484] border-opacity-25 rounded-md px-4 items-center justify-between">
//       <LandInfo
//         tokenCode={tokenCode}
//         propertyLocation={propertyLocation}
//         propertyType={propertyType}
//       />
//       <div className="flex flex-col pl-2">
//         <h3 className="font-bold text-black text-sm text-right">Rs {price}</h3>
//         <h4 className="font-bold text-[#179413] text-xs text-right">
//           +{profitAmount}%
//         </h4>
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState<TableToken[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [filters, setFilters] = useState({});
  const [filteredTokens, setFilteredTokens] = useState<TableToken[]>(tokens);

  const toggleTokenSelection = (tokenCode: string) => {
    setSelectedTokens((prevSelected) =>
      prevSelected.includes(tokenCode)
        ? prevSelected.filter((code) => code !== tokenCode)
        : [...prevSelected, tokenCode]
    );
  };
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    const filtered = tokens.filter((token) => {
      const matchesPriceRange =
        (!appliedFilters.minPrice ||
          token.tokenPrice >= appliedFilters.minPrice) &&
        (!appliedFilters.maxPrice ||
          token.tokenPrice <= appliedFilters.maxPrice);
      const matchesProfitLoss = appliedFilters.profitLoss
        ? (appliedFilters.profitLoss === "profit" && token.profitLoss > 0) ||
          (appliedFilters.profitLoss === "loss" && token.profitLoss <= 0)
        : true;

      return matchesPriceRange && matchesProfitLoss;
    });

    setFilteredTokens(filtered);
  };
  const addToWatchlist = () => {
    const selected = tokens.filter((token) =>
      selectedTokens.includes(token.tokenCode)
    );
    setWatchlist(selected);
    setDialogOpen(false);
  };
  const calculateDailyAverage = () => {
    const days = 30; // Assume we have data for 30 days
    const dailyAverages = [];

    // Loop through each day (0 to 29 for 30 days)
    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      let totalPriceForDay = 0;

      // Sum up all token prices for the given day
      tokens.forEach((token) => {
        totalPriceForDay += token.dailyPrices[dayIndex];
      });

      // Calculate the average for this day
      const averagePriceForDay = totalPriceForDay / tokens.length;

      // Push the result into the dailyAverages array
      dailyAverages.push({
        day: `Day ${dayIndex + 1}`,
        value: averagePriceForDay,
      });
    }
    // console.log(dailyAverages);

    return dailyAverages;
  };
  const chartData = calculateDailyAverage();
  // const chartConfig: ChartConfig = {
  //   commercial: {
  //     label: "Commercial Token Value",
  //     color: "#4CAF50", // Green color for commercial tokens
  //   },
  //   residential: {
  //     label: "Residential Token Value",
  //     color: "#2196F3", // Blue color for residential tokens
  //   },
  //   agricultural: {
  //     label: "Agricultural Token Value",
  //     color: "#FF9800", // Orange color for agricultural tokens
  //   },
  //   recreational: {
  //     label: "Recreational Token Value",
  //     color: "#9C27B0", // Purple color for recreational tokens
  //   },
  // };
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
            <BellDot className=" text-black " />
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
                  {/* For some reason, separator lai div maa rakhesi matra dekhiyo */}
                  <div>
                    <Separator
                      orientation="vertical"
                      className="h-full border-gray-500 "
                    />
                  </div>
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
              {/* Graph ko part: */}
              <div className="w-full h-44 bg-white p-4 ">
                <Graphs
                  chartData={chartData}
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
            </div>
            {/* Watchlist */}
            <div className="w-3/12 bg-white h-full border border-[#848484] border-opacity-25 shadow-md rounded-md">
              <div className="flex flex-row items-center justify-between p-4">
                <h1 className="font-semibold text-black text-xl">Watchlist</h1>
                <Button
                  variant="outline"
                  className="h-9 w-9 bg-white border-black border-opacity-15 shadow-sm"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className=" text-black " />
                </Button>
              </div>
              <ScrollArea className="h-48  rounded-2xl py-3 px-3 border-x-8 border-white ">
                {/* <WatchListCard
                  tokenCode="KTM-1154W5"
                  propertyLocation="Kathmandu Ward 1"
                  price={1000}
                  profitAmount={50}
                  propertyType="commercial"
                /> */}
                {watchlist.map((token) => (
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
          {/* Dialog Part for adding to watchlist */}
          {/* <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Token for Watchlist</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-48 px-3">
                {tokens.map((token) => (
                  <div
                    key={token.tokenCode}
                    className="flex flex-row items-center gap-3 p-2 border-b"
                  >
                    <Checkbox
                      className="bg-red-600"
                      checked={selectedTokens.includes(token.tokenCode)}
                      onCheckedChange={() =>
                        toggleTokenSelection(token.tokenCode)
                      }
                    />
                    <LandInfo
                      tokenCode={token.tokenCode}
                      propertyLocation={token.propertyType}
                      propertyType={token.propertyType}
                    />
                  </div>
                ))}
              </ScrollArea>
              <DialogFooter>
                <Button onClick={addToWatchlist}>Confirm</Button>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          {isDialogOpen && (
            <WatchlistDialog
              tokens={tokens}
              selectedTokens={selectedTokens}
              onToggleSelection={toggleTokenSelection}
              onAddToWatchlist={addToWatchlist}
              onClose={() => setDialogOpen(false)}
            />
          )}

          {/* Lower Part */}
          <div className="flex flex-col h-[41%] bg-white border border-[#848484] border-opacity-25 shadow-md rounded-md p-4">
            <div className="flex flex-row w-full p-3 items-center justify-between">
              <h1 className="font-semibold text-black text-xl">My Tokens</h1>
              <div className="flex gap-2">
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
                  <FilterDialog
                    onApplyFilters={handleApplyFilters}
                    showOwnedFilter
                  />
                </Dialog>
                <Button
                  variant="outline"
                  className="h-10 bg-none border-black border-opacity-15 text-black bg-white"
                  onClick={() => {
                    setFilters({});
                    setFilteredTokens(tokens); // Reset to show all tokens
                  }}
                >
                  Reset Filters
                </Button>
              </div>
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
                  {filteredTokens.map((token) => (
                    <TableRow
                      key={token.tokenCode}
                      className="my-2"
                      onClick={() =>
                        navigate(`/land-detail/${token.tokenCode}`)
                      }
                    >
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
