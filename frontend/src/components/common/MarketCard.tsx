import LandInfo from "./LandInfo";
import { Label } from "../ui/label";

interface MarketCardProps {
  tokenCode: string;
  propertyLocation: string;
  propertyType: "commercial" | "residential" | "agricultural" | "recreational";
  profitPercentage: number;
  currentPrice: number;
  previousPrice: number;
}

const MarketCard = ({
  tokenCode,
  propertyLocation,
  propertyType,
  profitPercentage,
  currentPrice,
  previousPrice,
}: MarketCardProps) => {
  return (
    <div className="w-64 h-36 bg-white border rounded-md shadow-md border-[#848484] border-opacity-60 p-4 flex-col flex justify-between">
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
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <Label className="text-[#0c8ce9] font-semibold text-2xl">
            Rs. {currentPrice}
          </Label>
          <Label className="text-[#4b4b4b] font-semibold text-sm">
            Rs. {previousPrice}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
