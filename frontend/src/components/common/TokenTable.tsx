"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// interface TableData {
//   name: string;
//   quantity: number;
//   tokenPrice: number;
//   totalPrice: number;
// }

// const generateTableData = (rowCount: number): TableData[] => {
//   const names = ["Token A", "Token B", "Token C", "Token D", "Token E"];
//   return Array.from({ length: rowCount }, (_, i) => {
//     const quantity = Math.floor(Math.random() * 100 + 1);
//     const tokenPrice = Math.floor(Math.random() * 500 + 50);
//     return {
//       name: names[i % names.length],
//       quantity,
//       tokenPrice,
//       totalPrice: quantity * tokenPrice,
//     };
//   });
// };

// const tableData =
//   [{ name: "Kal Prasad", quantity: 40, tokenPrice: 12, totalPrice: 480 }] ||
//   generateTableData(10);

const TokenTable = ({ data, buyButton }) => {
  return (
    <ScrollArea className="w-full h-56 overflow-auto ">
      <table className="min-w-full border-collapse border border-green-600 rounded-lg overflow-hidden">
        <thead className="bg-green-700 text-green-100 sticky -top-1 z-10">
          <tr>
            <th className="border border-green-950 px-4 py-10 text-left font-semibold">
              Quantity
            </th>
            <th className="border border-green-950 px-4 py-10 text-left font-semibold">
              Token Price
            </th>
            <th className="border border-green-950 px-4 py-10 text-left font-semibold">
              Total Price
            </th>
            <th className="border border-green-950 px-4 py-10 text-left font-semibold rounded-tr-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={`bg-green-800 hover:bg-green-700 text-white`}>
            <td className="border border-green-950 px-4 py-5">
              {data.number_of_tokens}
            </td>
            <td className="border border-green-950 px-4 py-5">
              Rs. {data.price}
            </td>
            <td className="border border-green-950 px-4 py-5">
              Rs. {data.price * data.number_of_tokens}
            </td>
            <td className="border border-green-950 px-4 py-5">{buyButton}</td>
          </tr>
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default TokenTable;
