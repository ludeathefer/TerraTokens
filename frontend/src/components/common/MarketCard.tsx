import LandInfo from "./LandInfo";
import { Label } from "../ui/label";
import Graphs from "./Graphs";
import { ChartDataPoint } from "./Graphs";

interface MarketCardProps {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  profitPercentage: number;
  currentPrice: number;
  previousPrice: number;
  chartData: ChartDataPoint[];
  onClick?: (tokenCode: string) => void;
}

const MarketCard = ({
  tokenCode,
  propertyLocation,
  propertyType,
  profitPercentage,
  currentPrice,
  previousPrice,
  chartData,
  onClick,
}: MarketCardProps) => {
  return (
    <div
      className="w-64 h-36 bg-white border rounded-md shadow-md border-[#848484] border-opacity-60 p-4 flex-col flex justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => {
        console.log("MarketCard clicked"); // Fallback log
        onClick?.(tokenCode);
      }}
    >
      {/* Upper Half */}
      <div className="flex flex-row justify-between items-center">
        <LandInfo
          tokenCode={tokenCode}
          propertyLocation={propertyLocation}
          propertyType={propertyType}
        />
        <Label
          className={`text-xs font-bold ${
            profitPercentage > 0 ? "text-[#179413]" : "text-red-500"
          }`}
        >
          {profitPercentage > 0
            ? `+${profitPercentage}%`
            : `${profitPercentage}%`}
        </Label>
      </div>
      {/* Lower Half */}
      <div className="flex flex-row  justify-between  items-center">
        <div className="flex flex-col flex-shrink-0 justify-between ">
          <Label className="text-[#0c8ce9] font-semibold text-2xl">
            Rs. {currentPrice}
          </Label>
          <Label className="text-[#4b4b4b] font-semibold text-sm">
            Rs. {previousPrice}
          </Label>
        </div>
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
  );
};

export default MarketCard;
