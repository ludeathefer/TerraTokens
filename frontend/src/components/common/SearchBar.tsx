// SearchBar.tsx
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SearchBarProps {
  location: string;
  propertySize: number;
  maxPrice: number;
  onSearch: () => void;
  onLocationChange: (value: string) => void;
  onPropertySizeChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const SearchBar = ({
  location,
  propertySize,
  maxPrice,
  onSearch,
  onLocationChange,
  onPropertySizeChange,
  onMaxPriceChange,
}: SearchBarProps) => {
  return (
    <div className="w-[700px] bg-white h-20 rounded-md shadow-md border border-black border-opacity-20 flex flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-col gap-0 p-4">
          <Label className="text-xs font-extrabold text-black">Location</Label>
          <Input
            className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-32 h-8"
            placeholder="Enter location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
        <Separator orientation="vertical" className="h-14 bg-[#E4E4E7]" />
        <div className="flex flex-col gap-0 p-4">
          <Label className="text-xs font-extrabold text-black">
            Property Size
          </Label>
          <Input
            className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-28 h-8"
            placeholder="Enter size"
            type="number"
            value={propertySize || ""}
            onChange={(e) => onPropertySizeChange(Number(e.target.value))}
          />
        </div>
        <Separator orientation="vertical" className="h-14 bg-[#E4E4E7]" />
        <div className="flex flex-col gap-0 p-4">
          <Label className="text-xs font-extrabold text-black">Max Price</Label>
          <Input
            className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-28 h-8"
            placeholder="Enter price"
            type="number"
            value={maxPrice || ""}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          />
        </div>
      </div>
      <Button
        variant="outline"
        className="h-full text-black "
        onClick={onSearch}
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchBar;
