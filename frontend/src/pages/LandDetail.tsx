import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { DealTokenDialog } from "../components/dialogs/DealTokenDialog";

const LandDetail = () => {
  const [isSellDialogOpen, setIsSellDialogOpen] = useState<boolean>(false);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState<boolean>(false);
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
            <div className="flex flex-col w-full items-start h-full">
              <div className="flex flex-row w-full p-4 justify-between items-start">
                <h1 className="text-xl font-medium">Price</h1>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">$200</p>
                  <p className="text-md font-medium">
                    return <span className="text-green-600">+20%</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full p-4 justify-between items-start">
                <h1 className="text-xl font-medium">Number of Tokens</h1>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">50</p>
                </div>
              </div>
              <div className="flex flex-row w-full h-full space-x-4 p-2 justify-center items-end">
                <Button
                  className="w-32 h-[2.5rem]"
                  onClick={() => {
                    setIsBuyDialogOpen(true);
                  }}
                >
                  Buy Tokens
                </Button>
                <Button
                  className="w-32 h-[2.5rem]"
                  onClick={() => {
                    setIsSellDialogOpen(true);
                  }}
                >
                  Sell Tokens
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-3 row-span-1 rounded-lg shadow-md flex items-center justify-center p-4 border-purple-600 border">
            <div className="flex flex-col h-full w-full space-y-2">
              <h1 className="text-xl font-semibold">Market</h1>
              <div className="flex flex-col h-full w-full space-y-2 overflow-y-scroll px-2"></div>
            </div>
          </div>
          <div className="col-span-3 row-span-1 rounded-lg shadow-md flex flex-col items-start justify-start p-4 bg-blue-600 w-full h-full space-y-2">
            <h1 className="text-2xl font-semibold">Property Overview</h1>
            <ScrollArea className="h-56 w-full bg-purple-400">
              <div className="flex flex-row flex-wrap"></div>
            </ScrollArea>
          </div>
          <div className="col-span-2 row-span-1 rounded-lg shadow-md flex flex-col items-start justify-start p-4 bg-blue-600 w-full h-full space-y-2">
            <h1 className="text-2xl font-semibold">Tentative Location</h1>
            <ScrollArea className="h-56 w-full bg-purple-400">
              <div className="flex flex-row flex-wrap"></div>
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

export default LandDetail;
