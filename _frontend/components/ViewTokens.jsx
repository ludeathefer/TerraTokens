import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

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

const ViewTokens = ({ authToken }) => {
  const [viewLandToken, viewLandTokenDetails] = useLazyQuery(LAND_TOKEN);
  const [viewLandTokens, viewLandTokensDetails] = useLazyQuery(LAND_TOKENS);

  const handleViewLandToken = async () =>
    await viewLandToken({
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });

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
        onClick={handleViewLandToken}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        View Land Token
      </button>

      {viewLandTokenDetails.data && (
        <div>{JSON.stringify(viewLandTokenDetails.data.landToken)}</div>
      )}
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

export default ViewTokens;
