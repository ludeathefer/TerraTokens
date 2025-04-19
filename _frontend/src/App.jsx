import { ethers } from "ethers";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import contractABI from "../contractABI";
import { useState } from "react";

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  return { provider, signer, userAddress };
}

const USER_LOGIN = gql`
  query UserLogin($publicKey: String!) {
    login(publicKey: $publicKey) {
      token
      User {
        publicKey
        username
        phone
        email
        roles {
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_LAND_TOKEN = gql`
  mutation CreateLandToken {
    createLandToken(
      input: {
        name: "Uno"
        currentPrice: 1234.56
        propertyType: "Residential"
        propertySize: 100.0
        propertySizeUnit: "sqm"
        landmark: "City Center"
        distanceFromLandmark: 1.5
        distanceUnit: "km"
        propertyDescription: "A beautiful property in a prime location."
        latitude: "37.7749"
        longitude: "-122.4194"
      }
    ) {
      name
      currentPrice
      propertyType
      propertySize
      propertySizeUnit
      landmark
      distanceFromLandmark
      distanceUnit
      propertyDescription
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;

const LAND_TOKEN = gql`
  query LandToken {
    landToken(landId: 1) {
      name
      totalTokens
      createdAt
      updatedAt
      currentPrice
      propertyType
      propertySize
      propertySizeUnit
      landmark
      distanceFromLandmark
      distanceUnit
      propertyDescription
      latitude
      longitude
    }
  }
`;

const LAND_TOKENS = gql`
  query LandTokens {
    landTokens {
      landId
      name
      totalTokens
      createdAt
      updatedAt
      currentPrice
      propertyType
      propertySize
      propertySizeUnit
      landmark
      distanceFromLandmark
      distanceUnit
      propertyDescription
      latitude
      longitude
    }
  }
`;

const SALES = gql`
  query Sales {
    sales {
      id
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

const SALE = gql`
  query Sale {
    sale(id: 1) {
      id
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

export default function App() {
  const [signer, setSigner] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const [userLogin, userLoginDetails] = useLazyQuery(USER_LOGIN);
  const [createLandToken, createLandTokenDetails] =
    useMutation(CREATE_LAND_TOKEN);
  const [viewLandToken, viewLandTokenDetails] = useLazyQuery(LAND_TOKEN);
  const [viewLandTokens, viewLandTokensDetails] = useLazyQuery(LAND_TOKENS);
  const [viewSales, viewSalesDetails] = useLazyQuery(SALES);
  const [viewSale, viewSaleDetails] = useLazyQuery(SALE);

  if (userLoginDetails.data) {
    console.log(userLoginDetails.data);
  }

  const buyTokensB = () => {
    const handleBuyTokens = async () => {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const order = {
        seller: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        landId: 1,
        amount: 5,
        pricePerToken: 100,
      };

      const tx = await contract.purchaseTokens(1, order, {
        value: order.amount * order.pricePerToken,
      });

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
    };
    return (
      <button
        onClick={handleBuyTokens}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Buy tokens
      </button>
    );
  };

  const viewSaleB = () => {
    const handleViewSale = async () =>
      viewSale({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

    return (
      <>
        <button
          onClick={handleViewSale}
          className="bg-blue-300 px-4 py-2 rounded-md"
        >
          View Sale
        </button>
        {viewSaleDetails.data && (
          <div>{JSON.stringify(viewSaleDetails.data.sale)}</div>
        )}
      </>
    );
  };

  const viewSalesB = () => {
    const handleViewSales = async () =>
      viewSales({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

    return (
      <>
        <button
          onClick={handleViewSales}
          className="bg-blue-300 px-4 py-2 rounded-md"
        >
          View Sales
        </button>
        {viewSalesDetails.data &&
          viewSalesDetails.data.sales.map((sale) => (
            <div>{JSON.stringify(sale)}</div>
          ))}
      </>
    );
  };

  const createSaleB = () => {
    const handleCreateSale = async () => {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await contract.setApprovalForAll(contractAddress, true);
      const tx = await contract.listTokensForSale(1, 10, 100);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
    };
    return (
      <button
        onClick={handleCreateSale}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Create Sale
      </button>
    );
  };

  const viewLandTokenB = () => {
    const handleViewLandToken = async () =>
      await viewLandToken({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    return (
      <>
        <button
          onClick={handleViewLandToken}
          className="bg-blue-300 px-4 py-2 rounded-md"
        >
          View Land Token
        </button>

        {viewLandTokenDetails.data && (
          <div>{JSON.stringify(viewLandTokenDetails.data.landToken)}</div>
        )}
      </>
    );
  };

  const viewLandTokensB = () => {
    const handleViewLandTokens = async () =>
      await viewLandTokens({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    return (
      <>
        <button
          onClick={handleViewLandTokens}
          className="bg-blue-300 px-4 py-2 rounded-md"
        >
          View Land Tokens
        </button>
        {viewLandTokensDetails.data &&
          viewLandTokensDetails.data.landTokens.map((landToken) => (
            <div>{JSON.stringify(landToken)}</div>
          ))}
      </>
    );
  };

  const createLandTokenB = () => {
    const handleCreateLandToken = async () => {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.fractionalizeLand("Uno", 100, "");
      const receipt = await tx.wait();
      createLandToken({
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      console.log("Transaction confirmed:", receipt);
    };

    return (
      <button
        onClick={handleCreateLandToken}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Create Land Token
      </button>
    );
  };

  const loginB = () => {
    const handleLogin = async () => {
      const { signer } = await connectWallet();
      setSigner(signer);
      userLogin({ variables: { publicKey: signer.address } }).then((data) =>
        setAuthToken(data.data.login.token)
      );
    };

    return (
      <button
        onClick={handleLogin}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Login
      </button>
    );
  };

  return (
    <div className="h-screen flex gap-4 justify-center items-center">
      {loginB()}
      {createLandTokenB()}
      {viewLandTokensB()}
      {viewLandTokenB()}
      {createSaleB()}
      {viewSalesB()}
      {viewSaleB()}
      {buyTokensB()}
    </div>
  );
}
