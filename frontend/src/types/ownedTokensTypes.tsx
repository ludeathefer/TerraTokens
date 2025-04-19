import { LandToken } from "./types";

export interface OwnedToken {
  userPublicKey: string;
  landToken: LandToken;
  boughtPrice: number;
  quantity: number;
  createdAt: string;
}

export interface OwnedTokens {
  ownedTokens: OwnedToken[];
}
