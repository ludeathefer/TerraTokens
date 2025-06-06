import { BellDot, Plus, Filter, Map, Grid } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import SearchBar from "../components/common/SearchBar";
import MarketCard from "../components/common/MarketCard";
import { tokens, TableToken } from "../components/common/tokensData";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { useEffect, useState } from "react";
import MapComponent from "../components/common/MapComponent";
import SlidingPanel from "../components/common/SlidingPanel";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { LandToken, LandTokensData } from "../types/types";

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
      propertySize
      propertyDescription
    }
  }
`;

const MarketPlace = () => {
  const [recentlyBoughtTokens, setRecentlyBoughtToken] = useState<TableToken[]>(
    []
  );
  const { loading, error, data } = useQuery<LandTokensData>(LAND_TOKENS);

  const [landTokens, setLandTokens] = useState<LandToken[]>([]);

  const [popularTokens, setPopularTokens] = useState<TableToken[]>([]);
  const [searchResult, setSearchResult] = useState<LandToken[]>([]);
  const [location, setLocation] = useState("");
  const [propertySize, setPropertySize] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [isSearchPressed, setIsSearchPressed] = useState(true);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setLandTokens(data.landTokens);
    }
  }, [data]);

  console.log(landTokens);

  useEffect(() => {
    const currentDate = new Date();
    const filterTokens = tokens.filter((token) => {
      const boughtDate = new Date(token.boughtDate);
      return (
        boughtDate >= new Date(currentDate.setDate(currentDate.getDate() - 7))
      );
    });
    const sortedTokens = filterTokens.sort((a, b) => {
      return (
        new Date(b.boughtDate).getTime() - new Date(a.boughtDate).getTime()
      );
    });
    setRecentlyBoughtToken(sortedTokens);

    const tokenWithProfit = tokens.filter((token) => token.profitLoss > 0);
    const sortedProfitTokens = tokenWithProfit.sort(
      (a, b) => b.profitLoss - a.profitLoss
    );
    setPopularTokens(sortedProfitTokens);
  }, []);

  const handleSearch = () => {
    setSearchResult([]);
    const propertySizeNum =
      typeof propertySize === "string"
        ? parseFloat(propertySize)
        : propertySize;
    const maxPriceNum =
      typeof maxPrice === "string" ? parseFloat(maxPrice) : maxPrice;

    const filteredTokens = landTokens.filter((token) => {
      const matchesLocation = location
        ? token.landmark.toLowerCase().includes(location.toLowerCase()) ||
          token.propertyDescription
            .toLowerCase()
            .includes(location.toLowerCase())
        : true;
      const matchesSize =
        propertySizeNum && token.propertySize
          ? Math.abs(token.propertySize - propertySizeNum) <= 50
          : true;
      const matchesMaxPrice = maxPriceNum
        ? token.currentPrice <= maxPriceNum
        : true;
      return matchesLocation && matchesSize && matchesMaxPrice;
    });
    setSearchResult(filteredTokens);
    setIsSearchPressed(!propertySize && !maxPrice && !location);
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
    console.log(popularTokens);
  };

  const handleMarketCardClick = (tokenCode: string) => {
    console.log(`Card Clicked: ${tokenCode}`);
    navigate(`/land-detail/${tokenCode}`);
  };

  return (
    <div className="bg-[#FAFAFA] w-full h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg w-full h-full border border-[#848484] border-opacity-35 px-8 py-8 flex flex-col">
        {/* Header Section */}
        {isMapVisible && (
          <>
            {/* Map and Search Bar Section */}

            {/* Parent container with relative positioning */}
            <div className="relative h-full w-full">
              {/* Search Bar Above Map */}
              <div className="z-20 absolute top-4 left-1/2 transform -translate-x-1/2 w-auto h-auto flex flex-row justify-center items-center visible">
                <SearchBar
                  location={location}
                  propertySize={Number(propertySize)}
                  maxPrice={Number(maxPrice)}
                  onSearch={handleSearch}
                  onLocationChange={setLocation}
                  onPropertySizeChange={setPropertySize}
                  onMaxPriceChange={setMaxPrice}
                />
              </div>

              {/* Map Component */}
              <div className="flex-1 relative min-h-80 max-h-[500px] h-[500px] shrink w-full grow justify-start z-0">
                <MapComponent city="" height={500} latLang={[27.7, 85.3]} />
              </div>
            </div>

            {/* Scrollable Market Cards at Bottom */}
            {/* <div className="mt-4 w-full"> */}
            <SlidingPanel>
              {/* <ScrollArea className="w-full rounded-2xl"> */}
              <div className="flex flex-row items-start justify-start gap-6 p-4 flex-wrap">
                {tokens.map((token) => (
                  <MarketCard
                    key={token.tokenCode}
                    tokenCode={token.tokenCode}
                    propertyLocation={token.propertyLocation}
                    propertyType={token.propertyType}
                    profitPercentage={token.profitLoss}
                    currentPrice={token.tokenPrice}
                    previousPrice={token.costPrice}
                    chartData={token.chartData}
                    onClick={() => handleMarketCardClick(token.tokenCode)}
                  />
                ))}
              </div>
              {/* <ScrollBar orientation="horizontal" /> */}
              {/* </ScrollArea> */}
            </SlidingPanel>
            {/* </div> */}
          </>
        )}

        {/* Default Content (Hidden when Map is Visible) */}
        {!isMapVisible && (
          <>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex flex-col items-start">
                <h1 className="font-semibold text-black text-3xl">
                  Marketplace
                </h1>
                <h5 className="font-semibold text-[#7d7d7d] text-md">
                  Search through various land tokens
                </h5>
              </div>
              {/* <Button
                variant="outline"
                className="h-12 bg-white border-black text-black border-opacity-15 shadow-sm"
                // onClick={toggleMapVisibility}
              >
                <Map />
                {isMapVisible ? "Close Map" : "Open Map"}
              </Button> */}
            </div>
            <Separator className="mb-4" />
            <div className="w-full h-auto flex flex-row justify-center items-center">
              <SearchBar
                location={location}
                propertySize={Number(propertySize)}
                maxPrice={Number(maxPrice)}
                onSearch={handleSearch}
                onLocationChange={setLocation}
                onPropertySizeChange={setPropertySize}
                onMaxPriceChange={setMaxPrice}
              />
            </div>

            {isSearchPressed ? (
              <>
                {/* Recently Added Tokens */}
                <div className="flex flex-col items-start h-full w-full justify-start my-8">
                  <h1 className="font-semibold text-black text-xl">
                    Recently Added Tokens
                  </h1>
                  <ScrollArea className="w-auto rounded-2xl px-3 max-h-auto w-full overflow-y-auto border-x-8 border-white">
                    <div className="flex flex-row gap-4 my-4">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p>Error</p>
                      ) : (
                        landTokens.map((token) => (
                          <MarketCard
                            key={token.landId}
                            tokenCode={`${token.name}-` + token.landId}
                            propertyLocation={`${token.distanceFromLandmark} from ${token.landmark}`}
                            profitPercentage={null}
                            previousPrice={null}
                            chartData={null}
                            propertyType={token.propertyType}
                            currentPrice={token.currentPrice}
                            onClick={() =>
                              handleMarketCardClick(
                                `${token.name}-` + token.landId
                              )
                            }
                          />
                        ))
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                  </ScrollArea>
                </div>

                {/* Popular This Week */}
                <div className="flex flex-col items-start justify-start">
                  <h1 className="font-semibold text-black text-xl">
                    Popular This Week
                  </h1>
                  <ScrollArea className="w-auto rounded-2xl px-3 h-full w-full border-x-8 border-white">
                    <div className="flex flex-row gap-4 my-4">
                      {popularTokens.map((token) => (
                        <MarketCard
                          key={token.tokenCode}
                          tokenCode={token.tokenCode}
                          propertyLocation={token.propertyLocation}
                          propertyType={token.propertyType}
                          profitPercentage={token.profitLoss}
                          currentPrice={token.tokenPrice}
                          previousPrice={token.costPrice}
                          chartData={token.chartData}
                          onClick={() => handleMarketCardClick(token.tokenCode)}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                  </ScrollArea>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-start justify-start">
                <h1 className="font-semibold text-black text-xl">
                  Search Result
                </h1>
                <ScrollArea className="w-full rounded-2xl my-8 px-3 h-80 border-x-8 border-white">
                  <div className="grid grid-cols-4 gap-4 m-4 h-auto">
                    {searchResult.map((token) => (
                      <MarketCard
                        key={token.landId}
                        tokenCode={`${token.name}-` + token.landId}
                        propertyLocation={`${token.distanceFromLandmark} from ${token.landmark}`}
                        profitPercentage={null}
                        previousPrice={null}
                        chartData={null}
                        propertyType={token.propertyType}
                        currentPrice={token.currentPrice}
                        onClick={() =>
                          handleMarketCardClick(`${token.name}-` + token.landId)
                        }
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
