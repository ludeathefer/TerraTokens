"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TableData {
  name: string;
  quantity: number;
  tokenPrice: number;
  totalPrice: number;
}

const generateTableData = (rowCount: number): TableData[] => {
  const names = ["Token A", "Token B", "Token C", "Token D", "Token E"];
  return Array.from({ length: rowCount }, (_, i) => {
    const quantity = Math.floor(Math.random() * 100 + 1);
    const tokenPrice = Math.floor(Math.random() * 500 + 50);
    return {
      name: names[i % names.length],
      quantity,
      tokenPrice,
      totalPrice: quantity * tokenPrice,
    };
  });
};

const tableData = generateTableData(10);

const TokenTable = ({ buyButton }) => {
  return (
    <ScrollArea className="w-full h-52 overflow-auto ">
      <table className="min-w-full border-collapse border border-green-600 rounded-lg">
        <thead className=" bg-green-700 text-green-100  sticky -top-1 z-10 ">
          <tr className="bg-green-700 text-white  ">
            <th className="border border-green-950 px-4 py-3 text-left font-semibold  ">
              Name
            </th>
            <th className="border border-green-950 px-4 py-3 text-left font-semibold  ">
              Quantity
            </th>
            <th className="border border-green-950 px-4 py-3 text-left font-semibold  ">
              Token Price
            </th>
            <th className="border border-green-950 px-4 py-3 text-left font-semibold  ">
              Total Price
            </th>
            <th className="border border-green-950 px-4 py-3 text-left font-semibold  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-green-600" : "bg-green-800"
              } hover:bg-green-700 text-white`}
            >
              <td className="border border-green-950 px-4 py-2">{row.name}</td>
              <td className="border border-green-950 px-4 py-2">
                {row.quantity}
              </td>
              <td className="border border-green-950 px-4 py-2">
                Rs. {row.tokenPrice}
              </td>
              <td className="border border-green-950 px-4 py-2">
                Rs. {row.totalPrice}
              </td>
              <td className="border border-green-950 px-4 py-2">{buyButton}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default TokenTable;