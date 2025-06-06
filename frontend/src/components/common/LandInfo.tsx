import { Building, Home, Leaf, Mountain } from "lucide-react";

interface LandInfoProps {
  tokenCode: string;
  propertyLocation: string;
  propertyType: string;
}

const getIcon = (propertyType: LandInfoProps["propertyType"]) => {
  switch (propertyType) {
    case "Commercial":
      return <Building className="w-5 h-5 text-black" />;
    case "Residential":
      return <Home className="w-5 h-5 text-black" />;
    case "Agricultural":
      return <Leaf className="w-5 h-5 text-black" />;
    case "Recreational":
      return <Mountain className="w-5 h-5 text-black" />;
    default:
      return <Building className="w-5 h-5 text-black" />; // Default to Building icon
  }
};

const LandInfo = ({
  tokenCode,
  propertyLocation,
  propertyType,
}: LandInfoProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row justify-center items-center w-10 h-10 rounded-full shadow-md bg-white border-black border-opacity-20 border">
        {getIcon(propertyType)}
      </div>
      <div className="flex flex-col pl-2">
        <h3 className="font-semibold text-black text-sm">{tokenCode}</h3>
        <h4 className="font-semibold text-[#7d7d7d] text-xs">
          {propertyLocation}
        </h4>
      </div>
    </div>
  );
};
export { getIcon };
export default LandInfo;
