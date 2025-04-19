import React from "react";
import contractABI from "../contractABI";

import { gql, useMutation } from "@apollo/client";
import { ethers } from "ethers";

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

const CreateToken = ({ contractAddress, signer, authToken }) => {
  const [createLandToken, _] = useMutation(CREATE_LAND_TOKEN);

  const handleCreateLandToken = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

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

export default CreateToken;
