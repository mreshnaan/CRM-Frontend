import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import CustomerForm from "../Form/CustomerForm";
import { toast } from "react-hot-toast";

function RemoveCustomerModel({ modelOpen, data, handleClose }) {
  const handleRemoveCustomer = async () => {
    try {
      if (data.id == null) return null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers/${data.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Successfully Deleted");
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      toast.error(error);
      console.error("error with request", error);
    }
    handleClose();
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
              p: 4,
            }}
          >
            <Typography>ARE YOU SURE YOU WANT DELETE THIS</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleRemoveCustomer()}
              >
                Remove{" "}
              </Button>
              <Button color="error" variant="contained" onClick={handleClose()}>
                Cancel{" "}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default RemoveCustomerModel;