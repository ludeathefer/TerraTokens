import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "../contractABI";

const DataTable = ({ data, fractionalizeLand }) => {
  const [status, setStatus] = useState("");

  // Function to log plot details
  const logPlotDetails = async (
    price,
    city,
    ward,
    streetNumber,
    plotNumber,
    landClass
  ) => {
    try {
      const response = await fetch("/log-plot-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          city,
          ward,
          streetNumber,
          plotNumber,
          landClass,
        }),
      });

      const result = await response.json();
      console.log(result.message);
      setStatus(result.message); // Optionally update status with response message
    } catch (error) {
      console.error("Error logging plot details:", error);
      setStatus("Error logging plot details.");
    }
  };

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
              Seller
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Buyer
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              City
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Ward
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Street Number
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Plot Number
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Land Class
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
            <tr key={item.plot_number}>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.seller}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.buyer}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.price}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.city}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.ward}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.street_number}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.plot_number}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                {item.land_class}
              </td>
              {/* Button to log plot details */}
              <td style={{ padding: "12px", borderBottom: "1px solid #000" }}>
                <button
                  onClick={() =>
                    fractionalizeLand(
                      item.price,
                      item.city,
                      item.ward,
                      item.street_number,
                      item.plot_number,
                      item.land_class
                    )
                  }
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

// Replace with your smart contract's ABI and address
const contractAddress = "0x301D99bAa8bAf1e6D4404526d904f7c238d8D9Fa";

const App = () => {
  const [metadataURI, setMetadataURI] = useState("");
  const [numberOfFractions, setNumberOfFractions] = useState(0);
  const [status, setStatus] = useState("");
  const [landId, setLandId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to Ethereum provider
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:4998/"
  );

  // Create a wallet instance
  const privateKey =
    "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"; // Use environment variable
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

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
    const listener = async (landId, numberOfFractions, metadataURI) => {
      console.log(`Land fractionalized!`);
      console.log(`Land ID: ${landId.toString()}`);
      console.log(`Number of Fractions: ${numberOfFractions.toString()}`);
      console.log(`Metadata URI: ${metadataURI}`);
      setLandId(landId.toString());

      // Parse metadataURI to get land details
      let landDetail;
      try {
        landDetail = JSON.parse(metadataURI); // Ensure metadataURI is a JSON string
      } catch (error) {
        console.error("Failed to parse metadataURI:", error);
        return;
      }

      // Prepare data for POST request
      const token = wallet.address; // Assuming you want to send the wallet address as token
      const dateCreated = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

      const postData = {
        land_detail: landDetail,
        token,
        no_of_tokens: Number(numberOfFractions), // Ensure this matches your API's expected field name
        date_created: dateCreated,
      };

      console.log("Posting data:", postData); // Log postData for debugging

      if (isMinted) {
        try {
          const response = await fetch("http://localhost:3000/api/add_land", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          if (!response.ok) throw new Error("Failed to add land");

          console.log("Land added successfully:", await response.json());
        } catch (error) {
          console.error("Error adding land:", error);
        }
      }
    };

    contract.on("LandFractionalized", listener);

    return () => {
      contract.off("LandFractionalized", listener); // Cleanup listener on unmount
    };
  }, []); // Runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  async function fractionalizeLand(
    price,
    city,
    ward,
    street_number,
    plot_number,
    land_class
  ) {
    let metadataURI = JSON.stringify({
      city,
      ward,
      street_number,
      plot_number,
      land_class,
    });

    let numberOfFractions = Math.floor(price / 1000); // Ensure it is an integer and greater than zero

    if (!metadataURI || numberOfFractions <= 0) {
      setStatus("Please enter valid metadata URI and number of fractions.");
      return;
    }

    setIsProcessing(true);
    try {
      const currentNonce = await provider.getTransactionCount(wallet.address); // Fetch current nonce
      const tx = await contract.fractionalizeLand(
        metadataURI,
        numberOfFractions,
        { nonce: currentNonce }
      );

      console.log("Transaction sent! Waiting for confirmation...");
      await tx.wait();

      console.log("Transaction confirmed!", tx.hash);
      setStatus("Land fractionalized successfully!");
    } catch (error) {
      console.error("Error fractionalizing land:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
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
