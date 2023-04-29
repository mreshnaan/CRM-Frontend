import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import InvoiceForm from "../Form/InvoiceForm";
import { toast } from "react-hot-toast";
import fectcher from "@/lib/api";

function ViewInvoiceModel({ modelOpen, data, handleClose }) {
  const [invoiceData, setInvoiceData] = useState(null);
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    if (modelOpen) {
      handleGetCustomers();
      handleGetInvoice();
    }
  }, [data.id, modelOpen]);

  const handleGetCustomers = async () => {
    try {
      const customersResponse = await fectcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers`
      );
      setCustomers(customersResponse.data);
    } catch (error) {
      console.error("error with request", error);
    }
  };

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
          items: invoiceData.data.attributes.items,
          payments: invoiceData.data.attributes.payments,
          customerName: `${invoiceData.data.attributes.customer.data.attributes.fName} ${invoiceData.data.attributes.customer.data.attributes.lName}`,
        });
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("error with request", error);
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
            {/* params
             * customerData is for select options in form
             * isUpdateForm is for use update from
             * fromData is for to send the initial values to the form
             * handleInvoice is for get the values from the invoice model
             */}
            {invoiceData && (
              <InvoiceForm
                isViewForm={true}
                customersData={customers}
                isUpdateForm={true}
                fromData={invoiceData}
              />
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ViewInvoiceModel;