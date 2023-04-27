import React, { useState, useRef } from "react";
import { Modal, Button, Typography } from "@mui/material";
import Invoice from "../Invoice/invoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function InvoiceModel({ modelOpen, data, handleClose, handleInvoice }) {
  const invoiceRef = useRef(null);

  const handleDownload = async () => {
    try {
      const dom = invoiceRef.current;
      const canvas = await html2canvas(dom);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      position += imgHeight;

      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("oops, something went wrong!", error);
    }
  };

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
              handleDownload();
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
