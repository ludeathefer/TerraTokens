// import { Graphs } from "../components/common/Graphs";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import Graphs from "../components/common/Graphs";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { useStore } from "../hooks/use-store";
import { getHoldingStatusApi, getRecentLandsApi, getTopLandsApi } from "../api";
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
  { logo: "", name: "Land0", price: "$200", percentage: "50%" },
  { logo: "", name: "Land1", price: "$200", percentage: "50%" },
  { logo: "", name: "Land2", price: "$200", percentage: "50%" },
  { logo: "", name: "Land3", price: "$200", percentage: "50%" },
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

const Dashboard = () => {
  // const userPublicKey = useStore.getState().userPublicKey;
  const [topLandsQuery, recentLandsQuery] = useQueries({
    queries: [
      { queryKey: ["top-lands"], queryFn: getTopLandsApi },
      { queryKey: ["recent-lands"], queryFn: getRecentLandsApi },
    ],
  });

  console.log(topLandsQuery.data);
  const chartData = [
    { day: "1", value: 1100 },
    { day: "2", value: 1200 },
    { day: "3", value: 3121 },
    { day: "4", value: 12312 },
    { day: "5", value: 1243 },
    { day: "6", value: 1244 },
    { day: "7", value: 1244 },
    { day: "8", value: 3455 },
    { day: "9", value: 4312 },
    { day: "10", value: 1234 },
    { day: "11", value: 12414 },
    { day: "12", value: 12233 },
  ];

  const chartConfig = {
    value: {
      label: "value",
      color: "green-200",
    },
  };

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
          <div className="col-span-3 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border border-zinc-800">
            <div className="flex items-center w-full h-full">
              <div className="flex-1 pr-4">
                <Graphs
                  // description=""
                  chartData={chartData}
                  chartConfig={chartConfig}
                />
              </div>
              <div className="flex h-full w-[35%] p-4 flex-col justify-between">
                <div className="flex flex-col items-center gap-5 pb-4">
                  <h1 className="text-2xl font-medium">Total Holding</h1>
                  <div className="text-center">
                    <p className="text-3xl font-bold">Rs. 15,000</p>
                    <p className="text-md font-medium">
                      return <span className="text-green-600">+20%</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium">Total Invested</h1>
                  <div className="flex flex-col">
                    <p className="text-2xl font-bold">Rs. 25,000</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium">Total Profit</h1>
                  <div className="flex flex-col">
                    <p className="text-2xl font-bold">Rs. 5,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border-zinc-800 border">
            <div className="flex flex-col h-full w-full space-y-2">
              <h1 className="text-xl font-semibold">Top Pick of today</h1>
              <ScrollArea className="flex flex-col h-full w-full px-2">
                {topLandsQuery.isLoading ? (
                  <p className="p-4">Loading...</p>
                ) : topLandsQuery.isError ? (
                  <p className="p-4">
                    An error occured. {topLandsQuery.error?.message}
                  </p>
                ) : (
                  topLandsQuery.data.map((item, idx) => (
                    <div
                      className="flex flex-row justify-between w-full p-2 border border-zinc-800 rounded-md my-2 items-center hover:bg-accent "
                      key={idx}
                    >
                      <div className="flex flex-row space-x-2 p-1">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg">{item.name}</h1>
                      </div>
                      <p className="text-white text-lg font-black">
                        {item.landDetail.city}-{item.landDetail.ward}-
                        {item.landDetail.street_number}
                      </p>
                      <p>{item.landDetail.land_class}</p>
                      <div className="flex flex-col">
                        <h1>Rs.{item.price}</h1>
                        <h1 className="text-green-500">{item.percentage}</h1>
                      </div>
                    </div>
                  ))
                )}
                <div className="flex flex-col w-full p-4 border border-zinc-800 rounded-md my-4 bg-zinc-900 text-white">
                  <p className="text-lg font-medium italic text-gray-300">
                    "Owning this property in Kathmandu has been a dream come
                    true. The peaceful environment and accessibility to
                    amenities make it perfect for building a family home."
                  </p>
                  <div className="flex justify-end text-end items-center pt-3">
                    <div className="ml-3">
                      <h1 className="text-md font-semibold text-gray-100">
                        Ram Kaka
                      </h1>
                      <p className="text-sm text-gray-500">
                        Owner of Kathmandu-Ward 1-123
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex flex-col pr-5 py-5 space-x-4 col-span-4 row-span-1">
            <h1 className="text-xl font-semibold mx-4 py-2">Recently Added</h1>
            <ScrollArea className="h-full w-auto rounded-md pb-3">
              <div className="flex gap-4 mt-2 w-full">
                {recentLandsQuery.isLoading ? (
                  <p className="p-4">Loading...</p>
                ) : recentLandsQuery.isError ? (
                  <p className="p-4">
                    An error occurred. {recentLandsQuery.error?.message}
                  </p>
                ) : (
                  recentLandsQuery.data.map((item) => (
                    <Link
                      to={"/land-detail/" + item.token}
                      className="h-full w-60 px-5 pb-2 bg-green-900/40 rounded-xl"
                      key={item._id}
                    >
                      <p className="font-semibold text-white text-center mt-1">
                        {item.land_detail.city}, {item.land_detail.ward}
                      </p>

                      <div className="flex justify-between items-center py-2 bg-green-900 my-2 -mx-5 px-5">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <p className="text-3xl font-semibold w-32 text-ellipsis overflow-hidden text-end">
                          {item.no_of_tokens} Tokens
                        </p>
                      </div>
                      <p className="font-semibold text-xl text-right">
                        Rs. {1200}
                      </p>
                    </Link>
                  ))
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="col-span-1 row-span-1 pr-10 -ml-60 pb-20">
            <iframe
              className=" overflow-hidden rounded-lg"
              width="100%"
              height="300"
              // frameborder="0"
              scrolling="no"
              // marginheight="0"
              // marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=king's%20college+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps tracker sport</a>
            </iframe>
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
