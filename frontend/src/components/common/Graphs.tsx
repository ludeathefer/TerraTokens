"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface ChartDataPoint {
  day: string; // Add day for each data point
  value: number; // Token value for that day
}

interface Props {
  chartData: ChartDataPoint[]; // Array of data points with day and value
  chartConfig: ChartConfig; // Configuration for the chart (labels, colors)
}

const Graphs = (props: Props) => {
  return (
    <ChartContainer config={props.chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="20%">
        <AreaChart
          data={props.chartData}
          margin={{
            // left: 10,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)} // Shorten day names
          />
          <YAxis
            domain={["auto", "auto"]}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="value" // Show the value of the token for each day
            type="linear"
            fill="#355E3B"
            fillOpacity={0.2}
            stroke="#0c8ce9"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
    // <ChartContainer config={props.chartConfig} className="h-40 w-full">
    //   <LineChart
    //     accessibilityLayer
    //     data={props.chartData}
    //     margin={{
    //       left: 12,
    //       right: 12,
    //     }}
    //   >
    //     <CartesianGrid vertical={false} className="" />
    //     <XAxis
    //       dataKey="day"
    //       axisLine={false}
    //       tickLine={false}
    //       tickMargin={8}
    //       tickFormatter={(value) => value.slice(0, 3)} // Shorten day names
    //     />
    //     <YAxis domain={["auto", "auto"]} />
    //     <ChartTooltip
    //       cursor={false}
    //       content={<ChartTooltipContent hideLabel />}
    //     />
    //     <Line
    //       dataKey="value"
    //       type="linear"
    //       stroke="#0d50f5"
    //       strokeWidth={2}
    //       dot={false}
    //       fill="#355E3B"
    //       // color="#00ff00"
    //     />
    //   </LineChart>
    // </ChartContainer>
  );
};

export default Graphs;

// "use client";

// import { TrendingUp } from "lucide-react";
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Line Chart - Linear</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
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
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="desktop"
//               type="linear"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
