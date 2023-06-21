import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function RemoveCustomerModel({ modelOpen, data, handleClose }) {
  const history = useRouter();
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
        history.reload("/customer");
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

  const handleCancel = () =>{
    handleClose()
  }

  return (
    <>
      <div>
        <Modal open={modelOpen} onClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              position: "absolute",
              borderRadius: "16px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Typography
              component={"h1"}
              sx={{ color: "black", fontSize: "1.1rem" }}
            >
              ARE YOU SURE YOU WANT REMOVE THIS
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleRemoveCustomer}
              >
                Remove{" "}
              </Button>
              <Button color="error" variant="contained" onClick={handleCancel}>
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
