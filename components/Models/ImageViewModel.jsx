import { Modal, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import Image from "next/image";

function ImageViewModel({ modelOpen, setModelOpen, imageURL }) {
  const handleClose = () => {
    setModelOpen(false);
  };

  return (
    <>
      <Modal open={modelOpen} onClose={handleClose}>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#000000",
            transition: ".4s ease,transform .5s ease-in-out",
            opacity: 1,
            transform: "scale(1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "#ffffff",
              }}
            >
              <Close />
            </IconButton>
          </div>

          <div
            style={{
              maxWidth: "90vw", // Adjust the maximum width as needed
              maxHeight: "90vh", // Adjust the maximum height as needed
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              layout="intrinsic"
              width={1050} // Adjust the width of the image as needed
              height={850} // Adjust the height of the image as needed
              src={imageURL}
              alt="Paid receipt"
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* <img
            style={{
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "100%",
              display: "block",
              lineHeight: 0,
              boxSizing: "border-box",
            }}
            src={imageURL}
            alt={imageURL}
          /> */}
        </div>
      </Modal>
    </>
  );
}

export default ImageViewModel;
