import { ethers } from "ethers";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

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
        id
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

const LAND_TOKENS = gql`
  query LandTokens {
    landTokens {
      id
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

export default function App() {
  const [userLogin, userLoginDetails] = useLazyQuery(USER_LOGIN);
  if (userLoginDetails.data) {
    console.log(userLoginDetails.data);
  }

  const login = () => {
    const handleLogin = async () => {
      const { signer } = await connectWallet();
      userLogin({ variables: { publicKey: signer.address } });
    };

    return (
      <button
        onClick={handleLogin}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Login
      </button>
    );

    const showLands = () => {};
  };

  return (
    <div className="h-screen flex justify-center items-center">{login()}</div>
  );
}
