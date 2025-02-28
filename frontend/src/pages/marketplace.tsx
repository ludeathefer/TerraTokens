import { BellDot, Plus, Filter, Map } from "lucide-react";
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
import SearchBar from "../components/common/SearchBar";
import LandInfo from "../components/common/LandInfo";
import MarketCard from "../components/common/MarketCard";

const MarketPlace = () => {
  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg w-full h-full border border-[#848484] border-opacity-35 px-8 py-8 flex flex-col ">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold text-black text-3xl">Marketplace</h1>
            <h5 className="font-semibold text-[#7d7d7d] text-md">
              Search through various land tokens
            </h5>
          </div>

          <Button
            variant="outline"
            className="h-12  bg-white border-black border-opacity-15 shadow-sm"
          >
            <Map />
            Open Map
          </Button>
        </div>
        <Separator className="mb-4" />

        {/* Content Section */}
        <div className="w-full h-auto flex flex-row justify-center items-center">
          <SearchBar />
        </div>
        {/* Recently Added Tokens */}
        <div className="flex flex-col items-start justify-start my-8">
          <h1 className="font-semibold text-black text-xl">
            Recently Added Tokens
          </h1>
          <div className="flex flex-row gap-4 my-4">
            {/* Main Token Card */}
            <MarketCard
              tokenCode="KTM-1154W5"
              propertyLocation="Kathmandu Ward 1"
              propertyType="agricultural"
              profitPercentage={50}
              currentPrice={1500}
              previousPrice={1000}
            />
          </div>
        </div>
        {/* Popular This Week */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-semibold text-black text-xl">
            Popular This Week
          </h1>
          <div className="flex flex-row gap-4 my-4">
            {/* Main Token Card */}
            <MarketCard
              tokenCode="KTM-1154W5"
              propertyLocation="Kathmandu Ward 1"
              propertyType="agricultural"
              profitPercentage={50}
              currentPrice={1500}
              previousPrice={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
