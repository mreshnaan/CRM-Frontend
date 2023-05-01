import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import CustomerForm from "../Form/CustomerForm";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function UpdateCustomerModel({ modelOpen, data, handleClose }) {
  const [customerData, setCustomerData] = useState(null);
  const history = useRouter();

  useEffect(() => {
    const handleGetCustomer = async () => {
      try {
        if (data.id == null) return null;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers/${data.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const customerData = await response.json();
          console.log("customer Data : ", customerData);
          setCustomerData({
            firstName: customerData.data.attributes.fName,
            lastName: customerData.data.attributes.lName,
            personType: customerData.data.attributes.personType,
            mobile: customerData.data.attributes.mobile,
            address: customerData.data.attributes.address,
            country: customerData.data.attributes.country,
          });
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        console.error("error with request", error);
      }
    };

    if (modelOpen) {
      handleGetCustomer();
    }
  }, [data.id, modelOpen]);

  const handleFormData = async (values) => {
    try {
      if (data.id == null) return null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              fName: values.firstName,
              lName: values.lastName,
              personType: values.personType,
              country: values.country,
              mobile: values.mobile,
              address: values.address,
            },
          }),
        }
      );
      if (response.ok) {
        toast.success("Successfully Updated");
        history.reload("/customer");
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
              borderRadius: "16px",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* params
             * isUpdateForm is for use update from
             * fromData is for to send the initial values to the form
             * setFromData is for get the form  values
             */}
            {customerData && (
              <CustomerForm
                isUpdateForm={true}
                fromData={customerData}
                setFromData={handleFormData}
              />
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default UpdateCustomerModel;
