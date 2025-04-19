import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import contractABI from "../contractABI";
import { useLazyQuery, useMutation, gql } from "@apollo/client";

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

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
  mutation CreateLandToken($input: CreateLandTokenInput!) {
    createLandToken(input: $input) {
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

async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  // console.log(signer);
  const userAddress = await signer.getAddress();

  return { provider, signer, userAddress };
}
const DataTable = ({ data, fractionalizeLand }) => {
  const [status, setStatus] = useState("");

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Data Table</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Property Type
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Current Price
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Landmark
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Distance From Landmark
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Property Size
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Property Size Unit
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Property Description
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Latitude
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Longitude
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.name}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.propertyType}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.currentPrice}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.landmark}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.distanceFromLandmark}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.propertySize}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.propertySizeUnit}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.propertyDescription}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.latitude}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.longitude}
              </td>
              {/* Button to log details of the item */}
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                <button
                  onClick={() => fractionalizeLand(item.name)}
                  style={{
                    backgroundColor: "#008CBA",
                    borderRadius: "5px",
                    color: "#fff",
                    padding: "10px 15px",
                    cursor: "pointer",
                    transitionDuration: ".4s",
                  }}
                >
                  Approve this deal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status && <p>{status}</p>} {/* Display status message */}
    </div>
  );
};

const App = () => {
  const [signer, setSigner] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  if (authToken) {
    console.log("Logged In.");
  }

  const [userLogin, _] = useLazyQuery(USER_LOGIN);

  const handleLogin = async () => {
    console.log("reached");
    const { signer } = await connectWallet();
    setSigner(signer);
    userLogin({ variables: { publicKey: signer.address } }).then((data) =>
      setAuthToken(data.data.login.token)
    );
  };

  useEffect(() => {
    handleLogin();
  }, []);

  const [createLandToken, err] = useMutation(CREATE_LAND_TOKEN);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8989/");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function

    // Listener for events
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  async function fractionalizeLand(name) {
    const requiredData = data.find((item) => item.name === name);

    if (!requiredData) {
      console.error("Land data not found.");
      return;
    }

    const {
      name: landName,
      currentPrice,
      propertyType,
      propertySize,
      propertySizeUnit,
      landmark,
      distanceFromLandmark,
      distanceUnit,
      propertyDescription,
      latitude,
      longitude,
    } = requiredData;

    // console.log(requiredData);

    try {
      const fractionalize_contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const fractionalize_tx = await fractionalize_contract.fractionalizeLand(
        landName,
        100,
        ""
      );
      const fractionalize_receipt = await fractionalize_tx.wait();
      console.log("Transaction confirmed:", fractionalize_receipt);

      createLandToken({
        variables: {
          input: {
            name: landName,
            currentPrice: currentPrice / 100,
            propertyType,
            propertySize,
            propertySizeUnit,
            landmark,
            distanceFromLandmark,
            distanceUnit,
            propertyDescription,
            latitude,
            longitude,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      await listTokensForSale(name);
    } catch (error) {
      console.error("Error during fractionalization:", error);
    }
  }

  async function listTokensForSale(name) {
    const requiredData = data.find((item) => item.name === name);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const price = requiredData.currentPrice / 100;
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

    const tx = await contract.listTokensForSale(2, 100, Number(price));
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
  }

  return (
    <div className="app">
      <DataTable
        data={data}
        className="datatable"
        fractionalizeLand={fractionalizeLand}
      />
    </div>
  );
};

export default App;
