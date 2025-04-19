export interface LandToken {
  landId: number;
  name: string;
  propertyType: "Commercial" | "Residential" | "Agricultural" | "Recreational";
  landmark: string;
  distanceFromLandmark: number;
  totalTokens: number;
  currentPrice: number;
}

export interface LandTokensData {
  landTokens: LandToken[];
}
