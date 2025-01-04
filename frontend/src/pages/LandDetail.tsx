import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import { DealTokenDialog } from "../components/dialogs/DealTokenDialog";
import { Separator } from "../components/ui/separator";
import Graphs from "../components/common/Graphs";
import { cn } from "../lib/utils";
import TokenTable from "../components/common/TokenTable";

const LandDetail = () => {
  const [isSellDialogOpen, setIsSellDialogOpen] = useState<boolean>(false);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState<boolean>(false);

  const graphArray = [
    {
      graphLabel: "Daily Prices",
      graphData: [
        { day: "1", value: 1450 },
        { day: "2", value: 1820 },
        { day: "3", value: 3210 },
        { day: "4", value: 2980 },
        { day: "5", value: 2100 },
        { day: "6", value: 4350 },
        { day: "7", value: 3980 },
        { day: "8", value: 2760 },
        { day: "9", value: 4890 },
        { day: "10", value: 3520 },
        { day: "11", value: 4310 },
        { day: "12", value: 4120 },
      ],
    },
    {
      graphLabel: "Weekly Prices",
      graphData: [
        { day: "1", value: 5800 },
        { day: "2", value: 6210 },
        { day: "3", value: 7100 },
        { day: "4", value: 6450 },
        { day: "5", value: 6890 },
        { day: "6", value: 7330 },
        { day: "7", value: 6120 },
        { day: "8", value: 5560 },
        { day: "9", value: 6890 },
        { day: "10", value: 7320 },
        { day: "11", value: 7810 },
        { day: "12", value: 6590 },
      ],
    },
    {
      graphLabel: "Monthly Prices",
      graphData: [
        { day: "1", value: 9100 },
        { day: "2", value: 11200 },
        { day: "3", value: 12350 },
        { day: "4", value: 10230 },
        { day: "5", value: 11150 },
        { day: "6", value: 11670 },
        { day: "7", value: 10480 },
        { day: "8", value: 12790 },
        { day: "9", value: 11900 },
        { day: "10", value: 13020 },
        { day: "11", value: 12890 },
        { day: "12", value: 12100 },
      ],
    },
  ];

  const [graphIndex, setGraphIndex] = useState<number>(0);

  const chartConfig = {
    value: {
      label: "value",
      color: " hsl(var(--chart-2))",
    },
  };

  const handleChange = (action: string) => {
    setGraphIndex(
      action === "prev"
        ? graphIndex - 1
        : action === "next"
        ? graphIndex + 1
        : 0
    );
  };
  return (
    <div className="h-screen w-full flex flex-col">
      <DealTokenDialog
        dialogState={isSellDialogOpen}
        setDialogState={setIsSellDialogOpen}
        type={1}
      />
      <DealTokenDialog
        dialogState={isBuyDialogOpen}
        setDialogState={setIsBuyDialogOpen}
        type={0}
      />
      <div className="w-full flex flex-row p-4 justify-between">
        <h1 className="text-4xl font-bold dark:text-white">Land Details</h1>
        <div className="flex flex-row gap-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex h-[90vh] w-full items-center justify-center overflow-hidden">
        <div className="grid h-full w-full gap-4 p-2 grid-cols-5 grid-rows-2 rounded-lg shadow-md overflow-hidden md:grid-cols-5 md:grid-rows-2 sm:grid-cols-5 sm:grid-rows-2 xs:grid-cols-1 xs:grid-rows-auto">
          <div className="col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border border-green-400">
            <div className=" w-full  h-full">
              {/* <div className="flex flex-row w-full p-4 justify-between items-start">
                <h1 className="text-xl font-medium">Price</h1>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">$200</p>
                </div>
              </div> */}
              {/* <Separator className=" dark:bg-white/20 " /> */}
              <div className="flex flex-row w-full p-4 justify-between items-center">
                <div className="flex flex-row justify-start items-center space-x-2">
                  <h1 className="text-xl font-medium">Number of Tokens</h1>
                  <p className="text-2xl font-bold">50</p>
                </div>
                <Button className="w-20 h-10 text-lg"> Sell</Button>
              </div>
              <TokenTable
                buyButton={
                  <Button
                    className="w-16 h-[2.5rem]"
                    onClick={() => {
                      setIsBuyDialogOpen(true);
                    }}
                  >
                    Buy
                  </Button>
                }
              />
            </div>
          </div>
          <div className="col-span-3 row-span-2 rounded-lg shadow-md flex items-center justify-center p-4 border-green-600 border">
            <div className="flex flex-col h-full w-full space-y-2">
              <div className="flex flex-col h-full w-full space-y-2  px-2">
                <Graphs
                  chartData={graphArray[graphIndex]?.graphData}
                  chartConfig={chartConfig}
                />

                <Pagination className="pt-14">
                  <PaginationContent>
                    <PaginationItem
                      onClick={() =>
                        graphIndex === 0 ? null : handleChange("prev")
                      }
                    >
                      <PaginationPrevious
                        className={cn(
                          "dark:hover:bg-transparent cursor-pointer",
                          graphIndex === 0
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        )}
                      />
                    </PaginationItem>
                    <h2 className="text-6xl font-bold w-[30rem] text-center">
                      {graphArray[graphIndex]?.graphLabel}
                    </h2>
                    <PaginationItem
                      onClick={() =>
                        graphIndex === 2 ? null : handleChange("next")
                      }
                    >
                      <PaginationNext
                        className={cn(
                          "dark:hover:bg-transparent cursor-pointer",
                          graphIndex === 2
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
          {/* <div className=" rounded-lg shadow-md flex flex-col items-start justify-start p-4 border border-green-400 w-full h-full space-y-2">
            <h1 className="text-2xl font-semibold">Property Overview</h1>
            <ScrollArea className="h-56 w-full bg-black">
              <div className="flex flex-row flex-wrap"></div>
            </ScrollArea>
          </div> */}
          <div className="col-span-2 row-span-1 rounded-lg shadow-md flex flex-col items-start justify-start p-4 border border-green-400 w-full h-full space-y-2">
            <h1 className="text-2xl font-semibold">Tentative Location</h1>

            <iframe
              className=" overflow-hidden rounded-lg"
              width="100%"
              height="600"
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

export default LandDetail;
