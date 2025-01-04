"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

interface ChartDataPoint {
  day: string;
  value: number | null;
}

interface Props {
  //   title: string;
  //   description: string | null;
  chartData: ChartDataPoint[];
  chartConfig: ChartConfig;
}

const Graphs = (props: Props) => {
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle> </CardTitle>
    //     <CardDescription> </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    <ChartContainer config={props.chartConfig}>
      <AreaChart
        data={props.chartData}
        margin={{
          left: 10,
          right: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)} // Shorten day names
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Area
          dataKey="value" // Updated to match the chartData field
          type="monotone" // Changed to "monotone" for smoother curves
          fill="gray"
          fillOpacity={0.4}
          stroke="green"
        />
      </AreaChart>
    </ChartContainer>
    //   </CardContent>
    //   <CardFooter>
    //     <div className="flex w-full items-start gap-2 text-sm">
    //       <div className="grid gap-2">
    //         <div className="flex items-center gap-2 font-medium leading-none">
    //           {/* Footer content if needed */}
    //         </div>
    //         <div className="flex items-center gap-2 leading-none text-muted-foreground">
    //           {/* Footer content if needed */}
    //         </div>
    //       </div>
    //     </div>
    //   </CardFooter>
    // </Card>
  );
};

export default Graphs;
