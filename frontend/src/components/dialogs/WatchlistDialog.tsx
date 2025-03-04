// components/common/WatchlistDialog.tsx
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import LandInfo from "../common/LandInfo";
import { TableToken } from "../common/tokensData";
import { Separator } from "../ui/separator";

interface WatchlistDialogProps {
  tokens: TableToken[]; // Tokens passed as props
  selectedTokens: string[]; // Array of selected token codes
  onToggleSelection: (tokenCode: string) => void; // Function to toggle token selection
  onAddToWatchlist: () => void; // Function to add selected tokens to watchlist
  onClose: () => void; // Function to close the dialog
}

const WatchlistDialog = ({
  tokens,
  selectedTokens,
  onToggleSelection,
  onAddToWatchlist,
  onClose,
}: WatchlistDialogProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-black">
          Select Token for Watchlist
        </DialogTitle>
        <ScrollArea className="h-60 px-3 rounded-2xl bg-white border shadow-sm ">
          {tokens.map((token) => (
            <div className="flex flex-col">
              <div
                key={token.tokenCode}
                className="flex flex-row items-center gap-3  p-4 "
              >
                <Checkbox
                  checked={selectedTokens.includes(token.tokenCode)}
                  onCheckedChange={() => onToggleSelection(token.tokenCode)}
                />
                <LandInfo
                  tokenCode={token.tokenCode}
                  propertyLocation={token.propertyLocation}
                  propertyType={token.propertyType}
                />
                {/* <Separator className="mb-4" /> */}
              </div>
              <Separator />
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onAddToWatchlist}>Confirm</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WatchlistDialog;
