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

  return (
    <div className=" h-screen w-auto justify-center flex flex-col items-center ">
      <div className=" flex flex-row w-[90%] space-x-4 pl-9">
        <Input placeholder="Location" className=" h-full " />
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
        <Button className="h-full">Search</Button>
      </div>
      <div className="flex flex-col p-5 w-[90%] space-x-4  ">
        <h1 className="text-2xl font-semibold mx-4">Recently Added</h1>
        <ScrollArea className=" h-52 w-full rounded-md border ">
          <div className="flex gap-4 mx-4 mt-2">
            {tokensListRecent.map((tokensList, tnt) => (
              <div
                className="flex flex-col h-full w-72 p-5 bg-gray-600  rounded-2xl gap-3 "
                key={tnt}
              >
                <div className="flex justify-between py-2 bg-[#212121] mb-2 px-2 rounded-xl ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-semibold">
                    {tokensList.noOfTokens} Tokens
                  </p>
                </div>
                <p className=" font-semibold text-gray-900  ">
                  {tokensList.area}, {tokensList.city}
                </p>
                <p className="font-semibold text-2xl">Rs. {tokensList.price}</p>
              </div>
            ))}
          </div>
          {/* <text>afhgiasf</text> */}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex flex-col p-5 w-[90%] space-x-4  ">
        <h1 className="text-2xl font-semibold mx-4">Popular This Week</h1>
        <ScrollArea className=" h-52 w-full rounded-md border ">
          <div className="flex gap-4 mx-4 mt-2">
            {tokensListWeekly.map((tokensList, tnt) => (
              <div
                className="flex flex-col h-full w-72 p-5 bg-gray-600  rounded-2xl gap-3 "
                key={tnt}
              >
                <div className="flex justify-between py-2 bg-[#212121] mb-2 px-2 rounded-xl ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-semibold">
                    {tokensList.noOfTokens} Tokens
                  </p>
                </div>
                <p className=" font-semibold text-gray-900  ">
                  {tokensList.area}, {tokensList.city}
                </p>
                <p className="font-semibold text-2xl">Rs. {tokensList.price}</p>
              </div>
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
