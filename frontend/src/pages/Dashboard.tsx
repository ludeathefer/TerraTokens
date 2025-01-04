import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
// import { TrendingUp } from "lucide-react"
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

const marketItems = [
  { logo: "", name: "Land0", price: "$200", percentage: "50%" },
  { logo: "", name: "Land1", price: "$200", percentage: "50%" },
  { logo: "", name: "Land2", price: "$200", percentage: "50%" },
  { logo: "", name: "Land3", price: "$200", percentage: "50%" },
];

const Dashboard = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex flex-row p-4 justify-between">
        <h1 className="text-4xl font-bold dark:text-white">Portfolio</h1>
        <div className="flex flex-row gap-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex h-[90vh] w-full items-center justify-center overflow-hidden">
        <div className="grid h-full w-full gap-4 p-2 grid-cols-5 grid-rows-2 rounded-lg shadow-md overflow-hidden md:grid-cols-5 md:grid-rows-2 sm:grid-cols-5 sm:grid-rows-2 xs:grid-cols-1 xs:grid-rows-auto">
          <div className="col-span-3 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border border-green-400">
            <div className="flex flex-col w-full items-start h-full">
              <div className="flex flex-row w-full p-4 justify-between items-start">
                <h1 className="text-xl font-medium">Total Holding</h1>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">$25,000</p>
                  <p className="text-md font-medium">
                    return <span className="text-green-600">+20%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border-purple-600 border">
            <div className="flex flex-col h-full w-full space-y-2">
              <h1 className="text-xl font-semibold">Market</h1>
              <div className="flex flex-col h-full w-full space-y-2 overflow-y-scroll px-2">
                {marketItems.map((item, idx) => {
                  return (
                    <div
                      className="flex flex-row justify-between w-full p-2 border border-zinc-800 rounded-md "
                      key={idx}
                    >
                      <div className="flex flex-row space-x-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg">{item.name}</h1>
                      </div>
                      <div className="flex flex-col">
                        <h1>{item.price}</h1>
                        <h1 className="text-green-500">{item.percentage}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-5 row-span-1 rounded-lg shadow-md flex flex-col items-start justify-start p-4 bg-blue-600 w-full h-full space-y-2">
            <h1 className="text-2xl font-semibold">Your Holdings</h1>
            <ScrollArea className="h-56 w-full bg-purple-400">
              <div className="flex flex-row flex-wrap">
                {marketItems.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="h-48 w-48 space-x-2 space-y-2 p-4 m-2 bg-green-600 rounded-lg flex flex-col justify-between"
                    >
                      <div className="flex flex-row w-full justify-start space-x-2 items-center">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <h1 className="text-md font-semibold">{item.name}</h1>
                      </div>
                      <div className="flex flex-row px-2 justify-between items-center">
                        <h1>{item.price}</h1>
                        <h1>{item.percentage}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .grid {
            display: block; /* Stack elements vertically */
            overflow-y: auto; /* Enable vertical scrolling */
          }
        }
        @media (max-height: 640px) {
          .grid {
            display: block; /* Stack elements vertically */
            overflow-y: auto; /* Enable vertical scrolling */
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

// export function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Area Chart</CardTitle>
//         <CardDescription>
//           Showing total visitors for the last 6 months
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               January - June 2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
