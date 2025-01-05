import { Copy } from "lucide-react";
useStore;

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
import { useStore } from "../../hooks/use-store";

interface DialogProps {
  dialogState: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
  max: number[];
  submitTrigger: any;
}

export const DealTokenDialog: React.FC<DialogProps> = ({
  data,
  dialogState,
  setDialogState,
  type,
  max,
  submitTrigger,
}) => {
  const [number, setNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const userPublicKey = useStore.getState().userPublicKey;
  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{type == 1 ? "Sell" : "Buy"} Land Tokens</DialogTitle>
          <DialogDescription>
            Select the amount of tokens that you want to{" "}
            {type == 1 ? "sell" : "buy"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center gap-2">
          <div className="flex flex-col items-center">
            <NumberField
              value={number}
              setValue={(n) =>
                n >= 0 && n < data.number_of_tokens ? setNumber(n) : null
              }
            />
            <p className="text-sm pt-2">Quantity</p>
          </div>
          {type === 1 && (
            <div className="flex flex-col items-center">
              <NumberField value={amount} setValue={setAmount} />
              <p className="text-sm pt-2">Amount</p>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              type === 1
                ? submitTrigger({
                    seller: userPublicKey,
                    land_hash: data.land_hash,
                    number_of_tokens: number,
                    price: amount,
                  })
                : submitTrigger({
                    buyer: userPublicKey,
                    land_hash: data.land_hash,
                    price: data.price,
                    number_of_tokens: number,
                    whose: data.seller,
                  });
              setNumber(0);
              setAmount(0);
              setDialogState(false);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
