interface LandToken {
  landId: number;
  name: string;
  totalTokens: number;
  createdAt: string;
  updatedAt: string;
  currentPrice: number;
  propertyType: string;
  propertySize: number;
  propertySizeUnit: string;
  landmark: string;
  distanceFromLandmark: number;
  distanceUnit: string;
  propertyDescription: string;
  latitude: number;
  longitude: number;
  prices: Price[]; // Assuming you want to include prices in the response
}

interface Price {
  date: string;
  price: number;
}

interface User {
  id: number;
  publicKey: string;
  username?: string;
}

export interface TransactedToken {
  id: number;
  landToken: LandToken;
  quantity: number;
  price: number;
  from?: User;
  to?: User;
  createdAt: string;
}

export interface TransactedTokensData {
  transactedTokens: TransactedToken[];
}
