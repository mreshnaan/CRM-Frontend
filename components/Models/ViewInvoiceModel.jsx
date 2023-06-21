import React, { useState, useEffect } from "react";
import { Modal, Box, CircularProgress } from "@mui/material";
import InvoiceForm from "../Form/InvoiceForm";
import fectcher from "@/lib/api";

function ViewInvoiceModel({ modelOpen, data, handleClose }) {
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (modelOpen) {
      handleGetInvoice();
    }
  }, [data.id, modelOpen]);

  const handleGetInvoice = async () => {
    try {
      if (data.id == null) return null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/invoices/${data.id}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const invoiceData = await response.json();
        console.log("invoice Data : ", invoiceData);
        setInvoiceData({
          invoiceNumber: invoiceData.data.attributes.invoiceNumber,
          salesCode: invoiceData.data.attributes.salesCode,
          items: invoiceData.data.attributes.items,
          payments: invoiceData.data.attributes.payments,
          salerName:
            invoiceData.data.attributes.saler.data.attributes.salerName,
          customerName:
            invoiceData.data.attributes.customer.data.attributes.customerName,
          paidReceipt: invoiceData.data.attributes.paidReceipt,
          shipmentDetails: invoiceData.data.attributes.shipmentDetails,
        });
      } else {
        const error = await response.json();
        throw new Error(error.error.message);
      }
    } catch (error) {
      console.error("error with request", error);
    } finally {
      setLoading(false); // Set loading to false when the data is received or an error occurs
    }
  };

  return (
    <>
      <div>
        <Modal open={modelOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              boxShadow: 24,
              overflowY: "auto !important",
              p: 4,
              height: "90vh",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              borderRadius: "16px",
              "& .css-4sgw43": {
                margin: "0px !important",
                padding: "0px !important",
              },
              "& .css-uv7eon-MuiTypography-root": {
                color: "black",
              },
              "& .css-1ph60q2-MuiTypography-root": {
                color: "black",
              },
            }}
          >
            {/* Show loading spinner while data is being fetched */}
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {invoiceData && (
                  <InvoiceForm
                    isViewForm={true}
                    isUpdateForm={true}
                    fromData={invoiceData}
                  />
                )}
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ViewInvoiceModel;
