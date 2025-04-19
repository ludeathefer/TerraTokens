import { BellDot, Plus, Filter, Star, GitCompare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Label } from "../components/ui/label";
import LandInfo, { getIcon } from "../components/common/LandInfo";
import contractABI from "../contractABI";

import {
  tokens,
  TableToken,
  TokenQueryData,
  LatLang,
} from "../components/common/tokensData";
import { SalesQueryData } from "../types/salesType";
import Graphs from "../components/common/Graphs";
import { useState, useEffect, useSyncExternalStore } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useStore } from "../hooks/use-store";
import { ethers } from "ethers";
import Landing from "./Landing";
import { LandToken, LandTokensData } from "../types/types";

type ExtendedToken = LandToken & {
  chartData: { day: string; value: number }[];
  latLang: LatLang;
};

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

const TOKEN_DETAILS = gql`
  query LandToken($landId: Int!) {
    landToken(landId: $landId) {
      name
      propertyType
      updatedAt
      totalTokens
      propertySize
      propertySizeUnit
      latitude
      longitude
      currentPrice
      landmark
      distanceFromLandmark
      distanceUnit
      propertyDescription
    }
  }
`;

const SALES = gql`
  query Sales {
    sales {
      quantity
      price
      landToken {
        landId
      }
      seller {
        publicKey
      }
      createdAt
    }
  }
`;

const LAND_TOKENS = gql`
  query LandTokens {
    landTokens {
      landId
      name
      propertyType
      landmark
      distanceFromLandmark
      totalTokens
      currentPrice
    }
  }
`;

// const CREATE_SALE = gql`
//   mutation CreateSale($privateKey: String!, $input: CreateSaleInput!) {
//     createSale(privateKey: $privateKey, input: $input) {
//       landId
//       quantity
//       price
//     }
//   }
// `;

interface WatchListCardProps {
  tokenCode: string;
  propertyLocation: string;
  price: number;
  profitAmount: number;
  propertyType: "Commercial" | "Residential" | "Agricultural" | "Recreational";
}

const WatchListCard = ({
  tokenCode,
  propertyLocation,
  price,
  profitAmount,
  propertyType,
}: WatchListCardProps) => {
  return (
    <div className="flex flex-row bg-white w-full h-16 border border-[#848484] border-opacity-25 rounded-md px-4 items-center justify-between">
      <LandInfo
        tokenCode={tokenCode}
        propertyLocation={propertyLocation}
        propertyType={propertyType}
      />
      <div className="flex flex-col pl-2  ">
        <h3 className="font-bold text-black text-sm text-right">Rs {price}</h3>
        <h4 className="font-bold text-[#179413] text-xs text-right">
          +{profitAmount}%
        </h4>
      </div>
    </div>
  );
};

function generateRandomLatLang() {
  // Latitude range for Kathmandu (approximately)
  const latMin = 27.5;
  const latMax = 27.8;
  // Longitude range for Kathmandu (approximately)
  const lngMin = 85.2;
  const lngMax = 85.4;

  const latitude = (Math.random() * (latMax - latMin) + latMin).toFixed(2); // Random latitude
  const longitude = (Math.random() * (lngMax - lngMin) + lngMin).toFixed(2); // Random longitude

  return { latitude, longitude };
}

function generateDailyPrices(basePrice: number): number[] {
  const prices = [];
  for (let i = 0; i < 29; i++) {
    const fluctuation = basePrice * (1 + (Math.random() * 0.2 - 0.1));
    prices.push(parseFloat(fluctuation.toFixed(2)));
  }
  prices.push(basePrice);
  return prices;
}

function generateChartData(
  basePrice: number
): { day: string; value: number }[] {
  const prices = generateDailyPrices(basePrice);
  return prices.map((value, i) => ({ day: `Day ${i + 1}`, value }));
}

const LandDetail = () => {
  const { tokenId } = useParams(); // Get the tokenID from the URL
  const regex = /^([A-Za-z]+)-(\d+)$/;
  const match = tokenId.match(regex);
  const landId = match[2];
  const authToken = useStore().jwt;
  const myPublicKey = useStore().userPublicKey;

  const navigate = useNavigate();
  const [token, setToken] = useState<TokenQueryData>(null);

  // const landToken = useQuery(LAND_TOKEN);

  // const [createSale, { data, loading, error }] = useMutation(CREATE_SALE);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isTokenSelected, setIsTokenSelected] = useState(false);
  const [numTokensForSale, setNumTokensForSale] = useState(0);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTokenForAction, setSelectedTokenForAction] = useState(null);
  const [numTokensToBuy, setNumTokensToBuy] = useState(0);
  const [numTokensToEdit, setNumTokensToEdit] = useState(0);
  const [pricePerToken, setPricePerToken] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  if (isBuyDialogOpen) {
    console.log(
      selectedTokenForAction?.price,
      selectedTokenForAction.seller?.publicKey
    );
  }

  interface LandTokensQueryResponse {
    landTokens: LandToken[];
  }

  const handleAddTokenForSale = async (
    landId: number,
    amount: number,
    price: number
  ) => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const approvalTx = await contract.setApprovalForAll(
        contractAddress,
        true
      );
      const approvalReceipt = await approvalTx.wait();
      console.log("Approval confirmed:", approvalReceipt);
    } catch (approvalError) {
      console.error("Error during approval:", approvalError);
      return;
    }

    try {
      const tx = await contract.listTokensForSale(landId, amount, price);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
    } catch (saleError) {
      console.error("Error during sale:", saleError);
    }

    setIsTokenSelected(false);
    setIsDialogOpen(false);
  };

  const { loading, error, data } = useQuery<TokenQueryData>(TOKEN_DETAILS, {
    variables: { landId }, // Pass landId as a variable
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  // const useDummy = true;

  const dummyLandToken: ExtendedToken = {
    name: tokenId,
    landId: parseInt(landId),
    propertyType: data?.landToken.propertyType,
    // updatedAt: new Date().toISOString(),
    totalTokens: data?.landToken.totalTokens,
    // propertySize: data.landToken.propertySize,
    // propertySizeUnit: data.landToken.propertySizeUnit,
    currentPrice: data?.landToken.currentPrice,
    landmark: data?.landToken.landmark,
    distanceFromLandmark: data?.landToken.distanceFromLandmark,
    // distanceUnit: data.landToken.distanceUnit,
    // propertyDescription: data.landToken.propertyDescription,
    chartData: generateChartData(data?.landToken.currentPrice),
    latLang: generateRandomLatLang(),
  };

  // const displayData: { landToken: ExtendedToken } = useDummy
  //   ? { landToken: dummyLandToken }
  //   : {
  //       landToken: {
  //         ...data.landToken,
  //         chartData: generateChartData(data.landToken.currentPrice),
  //       },
  //     };
  const displayData = { landToken: dummyLandToken };

  const {
    loading: salesLoading,
    error: salesError,
    data: salesData,
  } = useQuery<SalesQueryData>(SALES, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  const filteredSales = salesData?.sales.filter(
    (sale) => sale.landToken.landId === Number(landId)
  );

  const {
    loading: simLandLoading,
    error: simLandError,
    data: similarTokens,
  } = useQuery<LandTokensQueryResponse>(LAND_TOKENS);

  console.log(similarTokens?.landTokens[0]);
  if (loading) {
    return <div>Loading...</div>; // Handle the case where the token is not found
  }
  // const chartData = token.

  const handleBuyTokens = async (
    landId: number,
    amount: number,
    price: number,
    seller: string
  ) => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const order = {
      seller: seller,
      landId: landId,
      amount: amount,
      pricePerToken: price,
    };

    const tx = await contract.purchaseTokens(1, order, {
      value: order.amount * order.pricePerToken,
    });

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    setIsBuyDialogOpen(false);
  };

  const handleEditTokens = async (
    landId: number,
    amount: number,
    price: number
  ) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const approvalTx = await contract.setApprovalForAll(
        contractAddress,
        true
      );
      const approvalReceipt = await approvalTx.wait();
      console.log("Approval confirmed:", approvalReceipt);
    } catch (approvalError) {
      console.error("Error during approval:", approvalError);
      return;
    }

    const tx = await contract.updateTokenListing(landId, amount, price);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);

    setIsEditDialogOpen(false);
    // setNumTokensToEdit(0);
    // setPricePerToken(0);
  };

  const handleRowClick = (token, index) => {
    // Determine if the click was on "Buy" or "Edit"
    const action = event.target.textContent;

    if (action === "Buy") {
      setSelectedTokenForAction(token);
      setNumTokensToBuy(token.quantity); // Set initial quantity to the available amount
      setPricePerToken(token.price); // Set initial price to the listed price
      setIsBuyDialogOpen(true);
    } else if (action === "Edit") {
      setSelectedTokenForAction(token);
      setNumTokensToEdit(token.quantity); // Set initial quantity
      setPricePerToken(token.price); // Set initial price
      setIsEditDialogOpen(true);
    }
  };

  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <ScrollArea className="h-full">
          {/* Main Container */}
          <div className="bg-white rounded-lg shadow-lg w-full h-full border border-[#848484] border-opacity-35 px-8 py-8">
            {/* Content Section */}
            <div className="flex flex-col gap-3 h-full">
              {/* Upper Part */}
              <div className="flex flex-row h-full gap-3 justify-between">
                <div className="flex flex-col justify-start gap-4 item-center h-full w-7/12">
                  {/* Token Header */}
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row  items-center h-16 gap-8">
                      <div className="flex flex-row h-full w-full items-center">
                        <div className="flex flex-row justify-center items-center w-16 h-16 rounded-full shadow-md bg-white border-black border-opacity-20 border">
                          {getIcon(data.landToken.propertyType)}
                        </div>
                        <div className="flex flex-col pl-2">
                          <h3 className="font-semibold text-black text-xl">
                            {tokenId}
                          </h3>
                          <h4 className="font-semibold text-[#7d7d7d] text-md">
                            {data.landToken.landmark}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button
                          variant="outline"
                          className="w-8 h-8 border border-black bg-white text-black border-opacity-15 shadow-sm"
                        >
                          <Star />
                        </Button>
                        <Button
                          variant="outline"
                          className="w-8 h-8 border border-black border-opacity-15 shadow-sm bg-white text-black "
                        >
                          <GitCompare />
                        </Button>
                      </div>
                    </div>
                    {/* Total Tokens */}
                    <div className="flex flex-col items-center gap-y-1">
                      <Label className="font-semibold text-[#7d7d7d] text-xs">
                        Total Tokens
                      </Label>
                      <h1 className="text-3xl font-semibold text-black">
                        {data.landToken.totalTokens}
                      </h1>
                    </div>
                  </div>
                  {/* Profit part */}
                  <div className="flex flex-row items-end justify-start items-center gap-2">
                    <h1 className="text-3xl font-semibold text-black">
                      Rs. {data.landToken.currentPrice}
                    </h1>
                    {/* <h4
                    className={`font-bold text-xs ${
                      token.profitLoss > 0 ? "text-[#179413]" : "text-red-500"
                    }`}
                  >
                    {token.profitLoss > 0
                      ? `+${token.profitLoss}%`
                      : `${token.profitLoss}%`}
                  </h4> */}
                  </div>
                  {/* Graph */}
                  <div className="flex flex-row w-full h-60 bg-white">
                    <Graphs
                      chartData={displayData.landToken.chartData}
                      chartConfig={{
                        Commercial: {
                          label: "Commercial Token Value",
                          color: "#4CAF50", // Green color for commercial tokens
                        },
                        Residential: {
                          label: "Residential Token Value",
                          color: "#2196F3", // Blue color for Residential tokens
                        },
                        Agricultural: {
                          label: "Agricultural Token Value",
                          color: "#FF9800", // Orange color for Agricultural tokens
                        },
                        Recreational: {
                          label: "Recreational Token Value",
                          color: "#9C27B0", // Purple color for Recreational tokens
                        },
                      }}
                    />
                  </div>
                  {/* Key Details */}
                  <div className="flex flex-col w-full">
                    <h1 className="font-normal text-black text-xl">
                      Key Details
                    </h1>
                    <div className="w-[640px] bg-white h-20 rounded-md border border-black border-opacity-20 flex flex-row items-center justify-between py-4 px-8 mt-2">
                      <div className="flex flex-row items-center gap-8">
                        <div className="flex-1 flex flex-col justify-center">
                          <Label className="text-xs font-normal text-[#7d7d7d]">
                            Total Tokens
                          </Label>
                          <Label className="text-lg text-black font-medium border-none shadow-none ">
                            {data.landToken.totalTokens}
                          </Label>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-14 bg-[#E4E4E7]"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <Label className="text-xs font-normal text-[#7d7d7d]">
                            Property Type
                          </Label>
                          <Label className="text-lg text-black font-medium border-none shadow-none ">
                            {data.landToken.propertyType}
                          </Label>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-14 bg-[#E4E4E7]"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <Label className="text-xs font-normal text-[#7d7d7d]">
                            Property Size
                          </Label>
                          <Label className="text-lg text-black font-medium border-none shadow-none ">
                            {data.landToken.propertySize}{" "}
                            {data.landToken.propertySizeUnit}
                          </Label>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-14 bg-[#E4E4E7]"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <Label className="text-xs font-normal text-[#7d7d7d] overflow-auto">
                            Dist. from {data.landToken.landmark}
                          </Label>
                          <Label className="text-lg text-black font-medium border-none shadow-none ">
                            {data.landToken.distanceFromLandmark}{" "}
                            {data.landToken.distanceUnit}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <h1 className="font-normal text-black text-xl">
                      Property Description
                    </h1>
                    <ScrollArea className="h-[6.5rem]">
                      <p className="mt-2 text-[#636363] font-normal text-sm">
                        Explore this exclusive land token offering, featuring
                        {` `}
                        {data.landToken.propertySize}, priced at{" "}
                        {data.landToken.currentPrice} per token. This{" "}
                        {data.landToken.propertyType} land is perfect for those
                        looking to invest in virtual or digital property. With
                        unique ownership rights and a secure blockchain-based
                        transaction system, this land token provides a new way
                        to own, trade, and develop land in the digital realm.
                        Don’t miss out on this innovative opportunity!
                      </p>
                    </ScrollArea>
                    <div className="w-full mt-4">
                      <MapComponent
                        city={""}
                        height={384}
                        latLang={[
                          displayData.landToken.latLang.latitude,
                          displayData.landToken.latLang.longitude,
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-3/12 flex flex-col gap-2">
                  {/* Tokens for Sale */}
                  <div className="h-1/3 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                    <div className="flex flex-row items-center justify-between p-4  ">
                      <h1 className="font-medium text-black text-md">
                        Tokens For Sale
                      </h1>
                      {/* After pressing select, specify no of tokens dialog */}
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button className="h-9 w-9 border bg-white text-black hover:bg-gray-50 border-black border-opacity-10">
                            <Plus />
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enlist Tokens for Sale</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-4  ">
                            <div>
                              <Label>No of Tokens to Enlist for Sale</Label>
                              <Input
                                type="number"
                                value={numTokensForSale}
                                onChange={(e) =>
                                  setNumTokensForSale(Number(e.target.value))
                                }
                              />
                            </div>
                            <div>
                              <Label>Enlisting Price</Label>
                              <Input
                                type="number"
                                value={pricePerToken}
                                onChange={(e) =>
                                  setPricePerToken(Number(e.target.value))
                                }
                              />
                            </div>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleAddTokenForSale(
                                  Number(landId),
                                  numTokensForSale,
                                  pricePerToken
                                )
                              }
                              className="bg-white text-black"
                            >
                              Add to Sale List
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {/* If buy is pressed */}
                      <Dialog
                        open={isBuyDialogOpen}
                        onOpenChange={setIsBuyDialogOpen}
                      >
                        <DialogContent className="text-black">
                          <DialogHeader>
                            <DialogTitle>Buy Tokens</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-4">
                            <div>
                              <Label>Number of Tokens to Buy</Label>
                              <Input
                                type="number"
                                value={numTokensToBuy}
                                onChange={(e) =>
                                  setNumTokensToBuy(Number(e.target.value))
                                }
                              />
                            </div>
                            <Button
                              variant="outline"
                              className="bg-white text-black"
                              onClick={() =>
                                handleBuyTokens(
                                  Number(landId),
                                  numTokensToBuy,
                                  selectedTokenForAction?.price,
                                  selectedTokenForAction?.seller?.publicKey
                                )
                              }
                            >
                              Buy
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {/* If edit is pressed dialog */}
                      <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                      >
                        <DialogContent className="text-black">
                          <DialogHeader>
                            <DialogTitle>Edit Tokens</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-4">
                            <div>
                              <Label>Number of Tokens to List</Label>
                              <Input
                                type="number"
                                // placeholder={numTokensToEdit.toString()}
                                value={numTokensToEdit}
                                onChange={(e) =>
                                  setNumTokensToEdit(Number(e.target.value))
                                }
                              />
                            </div>
                            <div>
                              <Label>Price Per Token</Label>
                              <Input
                                type="number"
                                value={pricePerToken}
                                onChange={(e) =>
                                  setPricePerToken(Number(e.target.value))
                                }
                              />
                            </div>
                            <Button
                              onClick={() =>
                                handleEditTokens(
                                  Number(landId),
                                  numTokensToEdit,
                                  pricePerToken
                                )
                              }
                              variant="outline"
                              className="text-black bg-white"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <ScrollArea className="h-64 px-3">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs font-medium">
                              Amount
                            </TableHead>
                            <TableHead className="text-xs font-medium">
                              Price Per Token
                            </TableHead>
                            <TableHead className="text-xs font-medium">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSales?.map((token, index) => (
                            <TableRow
                              key={index}
                              onClick={() => handleRowClick(token, index)}
                            >
                              <TableCell className="text-black text-sm font-normal">
                                {token.quantity}
                              </TableCell>
                              <TableCell className="text-black text-sm font-normal">
                                Rs {token.price}
                              </TableCell>
                              <TableCell>
                                <Label
                                  className={`${
                                    token.price > data.landToken.currentPrice
                                      ? "text-red-500"
                                      : "text-[#0c8ce9]"
                                  } text-sm font-bold`}
                                >
                                  {token.seller.publicKey == myPublicKey
                                    ? "Edit"
                                    : "Buy"}
                                </Label>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <ScrollBar className="hidden" />
                    </ScrollArea>
                  </div>
                  {/* Similar Lands */}
                  <div className="h-1/3 bg-white  border border-[#848484] border-opacity-25 shadow-md rounded-md">
                    <div className="flex flex-row items-center justify-between p-4">
                      <h1 className="font-medium text-black text-md">
                        Similar Lands
                      </h1>
                    </div>
                    <ScrollArea className="h-[17rem]  rounded-2xl py-3 px-3 border-x-8 border-white ">
                      {similarTokens?.landTokens
                        .filter(
                          (similarToken) =>
                            similarToken?.propertyType ===
                            data.landToken.propertyType
                        )
                        .map((similarToken) => (
                          <div className="flex flex-col">
                            <div
                              key={similarToken.landId}
                              className="mb-2 flex flex-row justify-between cursor-pointer hover:bg-gray-50 p-2 "
                              onClick={() =>
                                navigate(
                                  `/land-detail/${similarToken.name}-${similarToken.landId}`
                                )
                              }
                            >
                              <LandInfo
                                tokenCode={`${similarToken.name}-${similarToken.landId}`}
                                propertyLocation={`${similarToken.distanceFromLandmark} from ${similarToken.landmark}`}
                                propertyType={similarToken.propertyType}
                              />
                              <div className="flex flex-col items-end">
                                <h3 className="font-bold text-black text-sm">
                                  Rs. {similarToken.currentPrice}
                                </h3>
                                <h4
                                  className={`font-bold text-xs ${
                                    20 > 0 ? "text-[#179413]" : "text-red-500"
                                  }`}
                                >
                                  {20 > 0 ? `+${20}%` : `${20}%`}
                                </h4>
                              </div>
                            </div>
                            <Separator className="mb-4" />
                          </div>
                        ))}
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default LandDetail;
