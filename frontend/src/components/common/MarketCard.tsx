import LandInfo from "./LandInfo";
import { Label } from "../ui/label";
// import Graphs from "./Graphs";
import { ChartDataPoint } from "./Graphs";
import {
  CartesianGrid,
  Line,
  XAxis,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

interface MarketCardProps {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "Commercial" | "Residential" | "Agricultural" | "Recreational";
  profitPercentage: number;
  currentPrice: number;
  previousPrice: number;
  chartData: ChartDataPoint[];
  onClick?: (tokenCode: string) => void;
}

const chartConfig = {
  Commercial: {
    label: "Commercial Token Value",
    color: "#4CAF50", // Green color for commercial tokens
  },
  Residential: {
    label: "Residential Token Value",
    color: "#2196F3", // Blue color for residential tokens
  },
  Agricultural: {
    label: "Agricultural Token Value",
    color: "#FF9800", // Orange color for agricultural tokens
  },
  Recreational: {
    label: "Recreational Token Value",
    color: "#9C27B0", // Purple color for recreational tokens
  },
};

const MarketCard = ({
  tokenCode,
  propertyLocation,
  propertyType,
  profitPercentage = null,
  currentPrice,
  previousPrice = null,
  chartData = null,
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
        {profitPercentage != null ? (
          <Label
            className={`text-xs font-bold ${
              profitPercentage > 0 ? "text-[#179413]" : "text-red-500"
            }`}
          >
            {profitPercentage > 0
              ? `+${profitPercentage}%`
              : `${profitPercentage}%`}
          </Label>
        ) : (
          <></>
        )}
      </div>
      {/* Lower Half */}
      <div className="flex flex-row  justify-between  items-center">
        <div className="flex flex-col flex-shrink-0 justify-between ">
          <Label className="text-[#0c8ce9] font-semibold text-2xl">
            Rs. {currentPrice}
          </Label>

          {previousPrice ? (
            <Label className="text-[#4b4b4b] font-semibold text-sm">
              Rs. {previousPrice}
            </Label>
          ) : (
            <Label className="text-white font-semibold text-sm">
              Rs. {previousPrice}
            </Label>
          )}
        </div>

        <ChartContainer config={chartConfig} className="ml-10 w-full h-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 16,
                left: 8,
                right: 8,
              }}
            >
              <Line
                dataKey="value"
                type="natural"
                stroke="#000000"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        {/* <Graphs
          chartData={chartData}
          chartConfig=
        /> */}
      </div>
    </div>
  );
};

export default MarketCard;
