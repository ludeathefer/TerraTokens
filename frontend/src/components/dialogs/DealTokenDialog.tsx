import { Copy } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { SetStateAction, useState } from "react";
import NumberField from "../common/NumberField";

interface DialogProps {
  dialogState: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
}

export const DealTokenDialog: React.FC<DialogProps> = ({
  dialogState,
  setDialogState,
  type,
}) => {
  console.log(type);

  const [number, setNumber] = useState<number>(0);
  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type == 1 ? "Sell" : "Buy"} Land Tokens</DialogTitle>
          <DialogDescription>
            Select the amount of tokens that you want to{" "}
            {type == 1 ? "sell" : "buy"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center space-x-2">
          <NumberField value={number} setValue={setNumber} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
