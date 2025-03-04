import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";

const FilterDialog = ({ onApplyFilters }) => {
  const [transactionType, setTransactionType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [profitLoss, setProfitLoss] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      transactionType,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      profitLoss: profitLoss === "profit" ? "profit" : "loss",
    };
    onApplyFilters(filters); // Call the callback with filters
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Filter Transactions</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {/* Transaction Type Filter */}
        <div>
          <Label>Transaction Type</Label>
          <Select onValueChange={setTransactionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bought">Bought</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label>Price Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Profit/Loss Filter */}
        <div>
          <Label>Profit/Loss</Label>
          <Select onValueChange={setProfitLoss}>
            <SelectTrigger>
              <SelectValue placeholder="Select profit/loss" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters Button */}
        <DialogClose asChild>
          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
export default FilterDialog;
