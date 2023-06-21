import ImageViewModel from "@/components/Models/ImageViewModel";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useState } from "react";

function ImageUpload({
  initialValues,
  isViewForm,
  isUpdateForm,
  setFieldValue,
}) {
  const [modelOpen, setModelOpen] = useState(false);

  const handleImageModelOpen = (e) => {
    e.preventDefault();
    setModelOpen(true);
  };

  return (
    <>
      <ImageViewModel
        modelOpen={modelOpen}
        setModelOpen={setModelOpen}
        imageURL={
          initialValues ? `http://localhost:1337${initialValues?.url} ` : ""
        }
      />
      {isViewForm && initialValues && (
        <>
          <Box>
            <Typography
              color={"gray"}
              sx={{ textTransform: "uppercase", mb: "24px" }}
            >
              Payment Receipt
            </Typography>
            <Image
              onClick={handleImageModelOpen}
              width={300}
              height={300}
              src={
                initialValues
                  ? `http://localhost:1337${initialValues?.url} `
                  : ""
              }
              alt="Paid receipt"
              style={{ borderRadius: "10px" }}
            />
          </Box>
        </>
      )}

      {!isViewForm && isUpdateForm && (
        <Box>
          <Typography
            color={"gray"}
            sx={{ textTransform: "uppercase", mb: "24px" }}
          >
            Payment Receipt
          </Typography>

          <input
            style={{ color: "black" }}
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              setFieldValue("paidReceipt", file);
            }}
          />
        </Box>
      )}
    </>
  );
}

export default ImageUpload;
