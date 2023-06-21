import React, { useState, useRef } from "react";
import { Modal, Button, Typography } from "@mui/material";
import Invoice from "../Invoice/invoice";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import { generateInvoicePDF } from "../Invoice/GenerateInvoice";

function InvoiceModel({ modelOpen, data, handleClose, handleInvoice }) {
  const invoiceRef = useRef(null);


  return (
    <div>
      <Modal open={modelOpen} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "black",
            position: "absolute",
            top: "50%",
            left: "50%",
            background: "aliceblue",
            transform: "translate(-50%, -50%)",
            borderRadius: "16px",
            boxShadow: 24,
            padding: "20px",
          }}
        >
          <div style={{ padding: "20px" }} ref={invoiceRef}>
            <Invoice data={data} />
          </div>
          <Typography variant="h6" gutterBottom>
            Download Invoice
          </Typography>
          <Typography variant="body1" gutterBottom>
            Click the button below to download your invoice.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleInvoice(data);
              generateInvoicePDF(data);
            }}
          >
            Create & Download
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default InvoiceModel;
