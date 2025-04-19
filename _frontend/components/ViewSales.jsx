import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

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

const ViewSales = ({ authToken }) => {
  const [viewSales, viewSalesDetails] = useLazyQuery(SALES);
  const [viewSale, viewSaleDetails] = useLazyQuery(SALE);

  const handleViewSale = async () =>
    viewSale({
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });

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
        onClick={handleViewSale}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        View Sale
      </button>
      {viewSaleDetails.data && (
        <div>{JSON.stringify(viewSaleDetails.data.sale)}</div>
      )}

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

export default ViewSales;
