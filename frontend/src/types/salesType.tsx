interface LandToken {
  landId: number;
}

interface Seller {
  publicKey: string;
}

interface Sale {
  quantity: number;
  price: number;
  landToken: LandToken;
  seller: Seller;
  createdAt: string | Date;
}

export interface SalesQueryData {
  sales: Sale[];
}
