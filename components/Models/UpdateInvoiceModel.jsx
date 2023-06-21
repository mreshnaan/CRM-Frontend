import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import InvoiceForm from "../Form/InvoiceForm";
import { toast } from "react-hot-toast";
import fectcher from "@/lib/api";
import { useRouter } from "next/router";

function UpdateInvoiceModel({ modelOpen, data, handleClose }) {
  const [invoiceData, setInvoiceData] = useState(null);

  const history = useRouter();

  useEffect(() => {
    if (modelOpen) {
      handleGetInvoice();
    }
  }, [data.id, modelOpen]);

  const uploadPaymentReceipt = async (invoiceId, paidReceipt) => {
    // Upload the file
    const formData = new FormData();
    formData.append("files", paidReceipt);
    formData.append("ref", invoiceId);
    formData.append("refId", invoiceId);
    const uploadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedFiles = await uploadResponse.json();
    console.log("upload file  : ", uploadedFiles);
    // const uploadedFileUrl = uploadedFiles[0].url;
    return uploadedFiles[0];
  };

  const handleFormData = async (values) => {
    try {
      if (data.id == null) return null;
      const imageURL = await uploadPaymentReceipt(
        data?.id,
        values?.paidReceipt
      );
      if (!imageURL) {
        console.log("error : ", imageURL);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/invoices/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              invoiceNumber: values.firstName,
              customer: values.customerId,
              items: values.items,
              payments: values.payments,
              paidReceipt: imageURL,
            },
          }),
        }
      );
      if (response.ok) {
        toast.success("Successfully Updated");
        // history.reload("/invoice");
      } else {
        const error = await response.json();
        throw new Error(error.error.message);
      }
    } catch (error) {
      toast.error(error);
      console.error("error with request", error);
    }
    handleClose();
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
        setInvoiceData({
          invoiceNumber: invoiceData.data.attributes.invoiceNumber,
          salesCode:invoiceData.data.attributes.salesCode,
          items: invoiceData.data.attributes.items,
          payments: invoiceData.data.attributes.payments,
          customerName:
            invoiceData.data.attributes.customer.data.attributes.customerName,
          salerName:
            invoiceData.data.attributes.saler.data.attributes.salerName,
          paidReceipt: invoiceData.data.attributes.paidReceipt,
          shipmentDetails: invoiceData.data.attributes.shipmentDetails,
        });
      } else {
        const error = await response.json();
        throw new Error(error.error.message);
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
                isUpdateForm={true}
                fromData={invoiceData}
                handleInvoice={handleFormData}
              />
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default UpdateInvoiceModel;
