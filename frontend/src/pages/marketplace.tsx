// import { Separator } from "@radix-ui/react-select";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// import { Slider } from "../components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ScrollArea } from "../components/ui/scroll-area";
// import { Separator } from "../components/ui/separator"
import { ScrollBar } from "../components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Link } from "react-router-dom";
// import { Plus } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { cn } from '../lib/utils';

// import DualRangeSlider from "../components/ui/dual-range-sliders";

// const DualRangeSliderDemo = () => {
//   const [values, setValues] = useState([0, 100]);
//      return (
//     <div className="w-full px-10">
//       <DualRangeSlider
//         label={(value) => value}
//         value={values}
//         onValueChange={setValues}
//         min={0}
//         max={100}
//         step={1}
//       />
//     </div>
//   );
// }
const MarketPlace = () => {
  // const [minValue, setMinValues] = useState<number[]>([1000, 50000]);

  const tokensListRecent = [
    { area: "Baneshwor", city: "Kathmandu", price: "21222", noOfTokens: "20" },
    { area: "Lazimpath", city: "Kathmandu", price: "49999", noOfTokens: "30" },
    { area: "Gairidhara", city: "Kathmandu", price: "42345", noOfTokens: "20" },
    { area: "Bagbazaar", city: "Kathmandu", price: "32111", noOfTokens: "10" },
    { area: "Baneshwor", city: "Kathmandu", price: "21222", noOfTokens: "20" },
    { area: "Lazimpath", city: "Kathmandu", price: "49999", noOfTokens: "30" },
    { area: "Gairidhara", city: "Kathmandu", price: "42345", noOfTokens: "20" },
    { area: "Bagbazaar", city: "Kathmandu", price: "32111", noOfTokens: "10" },
    { area: "Baneshwor", city: "Kathmandu", price: "21222", noOfTokens: "20" },
    { area: "Lazimpath", city: "Kathmandu", price: "49999", noOfTokens: "30" },
    { area: "Gairidhara", city: "Kathmandu", price: "42345", noOfTokens: "20" },
    { area: "Bagbazaar", city: "Kathmandu", price: "32111", noOfTokens: "10" },
    { area: "Baneshwor", city: "Kathmandu", price: "21222", noOfTokens: "20" },
    { area: "Lazimpath", city: "Kathmandu", price: "49999", noOfTokens: "30" },
    { area: "Gairidhara", city: "Kathmandu", price: "42345", noOfTokens: "20" },
    { area: "Bagbazaar", city: "Kathmandu", price: "32111", noOfTokens: "10" },
  ];

  const tokensListWeekly = [
    {
      area: "Baneshwor",
      city: "Kathmandu",
      price: "21222",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Lazimpath",
      city: "Kathmandu",
      price: "49999",
      noOfTokens: "30",
      percentageIncrease: "10%",
    },
    {
      area: "Gairidhara",
      city: "Kathmandu",
      price: "42345",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Bagbazaar",
      city: "Kathmandu",
      price: "32111",
      noOfTokens: "10",
      percentageIncrease: "10%",
    },
    {
      area: "Baneshwor",
      city: "Kathmandu",
      price: "21222",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Lazimpath",
      city: "Kathmandu",
      price: "49999",
      noOfTokens: "30",
      percentageIncrease: "10%",
    },
    {
      area: "Gairidhara",
      city: "Kathmandu",
      price: "42345",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Bagbazaar",
      city: "Kathmandu",
      price: "32111",
      noOfTokens: "10",
      percentageIncrease: "10%",
    },
    {
      area: "Baneshwor",
      city: "Kathmandu",
      price: "21222",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Lazimpath",
      city: "Kathmandu",
      price: "49999",
      noOfTokens: "30",
      percentageIncrease: "10%",
    },
    {
      area: "Gairidhara",
      city: "Kathmandu",
      price: "42345",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Bagbazaar",
      city: "Kathmandu",
      price: "32111",
      noOfTokens: "10",
      percentageIncrease: "10%",
    },
    {
      area: "Baneshwor",
      city: "Kathmandu",
      price: "21222",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Lazimpath",
      city: "Kathmandu",
      price: "49999",
      noOfTokens: "30",
      percentageIncrease: "10%",
    },
    {
      area: "Gairidhara",
      city: "Kathmandu",
      price: "42345",
      noOfTokens: "20",
      percentageIncrease: "10%",
    },
    {
      area: "Bagbazaar",
      city: "Kathmandu",
      price: "32111",
      noOfTokens: "10",
      percentageIncrease: "10%",
    },
  ];

  return (
    <div className=" h-screen w-auto justify-center flex flex-col gap-8 pr-4">
      <h1 className="text-4xl font-bold dark:text-white pl-8">Marketplace</h1>
      <div className=" flex flex-row w-[99%] space-x-4 pl-9">
        <Input
          placeholder="Location"
          className="dark:border-white/10 h-full "
        />
        <Popover>
          <PopoverTrigger>Filter</PopoverTrigger>
          <PopoverContent className=" bg-black text-white  h-full ">
            <div>
              <b>Price</b>
              <div className="flex flex-col justify-center   ">
                <div className="flex flex-row items-center p-1 ">
                  Min:
                  <Input
                    placeholder="1000"
                    defaultValue={1000}
                    className="w-10/12 "
                  />
                </div>
                <div className="flex flex-row items-center p-1">
                  Max:
                  <Input
                    placeholder="50000"
                    defaultValue={50000}
                    className="w-10/12"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="h-full dark:bg-green-700 dark:text-white">
          Search
        </Button>
      </div>
      <div className="flex flex-col p-5 w-[99%] space-x-4  ">
        <h1 className="text-xl font-semibold mx-4 py-2">Recently Added</h1>
        <ScrollArea className="h-full w-full rounded-md pb-3">
          <div className="flex gap-4 mt-2  ">
            {tokensListRecent.map((tokensList, tnt) => (
              <Link
                to={"/land-detail/" + tnt}
                className="h-full w-60 px-5 pb-2 bg-green-900/40 rounded-xl"
                key={tnt}
              >
                <p className=" font-semibold text-white text-center mt-1">
                  {tokensList.area}, {tokensList.city}
                </p>
                <div className="flex justify-between py-2 bg-green-900 my-2 -mx-5 px-5 ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-semibold">
                    {tokensList.noOfTokens} Tokens
                  </p>
                </div>

                <p className="font-semibold text-xl text-right">
                  Rs. {tokensList.price}
                </p>
              </Link>
            ))}
          </div>
          {/* <text>afhgiasf</text> */}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex flex-col p-5 w-[99%] space-x-4  ">
        <h1 className="text-xl font-semibold mx-4 py-2">Popular This Week</h1>
        <ScrollArea className="h-full w-full rounded-md pb-3">
          <div className="flex gap-4 mt-2  ">
            {tokensListWeekly.map((tokensList, tnt) => (
              <Link
                to={"/land-detail/" + tnt}
                className="h-full w-60 px-5 bg-green-900/40 rounded-xl"
                key={tnt}
              >
                <p className=" font-semibold text-white text-center mt-2">
                  {tokensList.area}, {tokensList.city}
                </p>
                <div className="flex justify-between py-2 bg-green-900 mt-3 mb-2 -mx-5 px-5 ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-semibold">
                    {tokensList.noOfTokens} Tokens
                  </p>
                </div>

                <p className="font-semibold text-xl text-right mb-2">
                  Rs. {tokensList.price}
                </p>
                <p className=" text-lg text-center bg-white/90 -mx-5 text-green-900 px-5 py-2 rounded-b-xl">
                  Increased by{" "}
                  <span className="font-bold text-green-700">
                    {tokensList.percentageIncrease}
                  </span>{" "}
                </p>
              </Link>
            ))}
          </div>
          {/* <text>afhgiasf</text> */}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default MarketPlace;

// export function PopoverDemo() {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline">Open popover</Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <div className="grid gap-4">
//           <div className="space-y-2">
//             <h4 className="font-medium leading-none">Dimensions</h4>
//             <p className="text-sm text-muted-foreground">
//               Set the dimensions for the layer.
//             </p>
//           </div>
//           <div className="grid gap-2">
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="width">Width</Label>
//               <Input
//                 id="width"
//                 defaultValue="100%"
//                 className="col-span-2 h-8"
//               />
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="maxWidth">Max. width</Label>
//               <Input
//                 id="maxWidth"
//                 defaultValue="300px"
//                 className="col-span-2 h-8"
//               />
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="height">Height</Label>
//               <Input
//                 id="height"
//                 defaultValue="25px"
//                 className="col-span-2 h-8"
//               />
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="maxHeight">Max. height</Label>
//               <Input
//                 id="maxHeight"
//                 defaultValue="none"
//                 className="col-span-2 h-8"
//               />
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }
