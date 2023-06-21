import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomerFields({
  customerNames,
  isUpdateForm,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  customerDetails,
  setCustomerDetails,
  setInitialValues,
  initialValues,
  fromData,
  customersData,
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(
    initialValues.customerName
  );
  useEffect(() => {
    const getCustomer = (name) => {
      return customersData?.find((customer) => {
        return customer?.attributes?.customerName === name;
      });
    };

    const setCustomer = (customer) => {
      setInitialValues({
        customerName: customer?.attributes?.customerName,
      });

      setCustomerDetails({
        address: customer?.attributes?.address,
        mobileNumber: customer?.attributes?.mobile,
        email: customer?.attributes?.email,
        customerId: customer?.id,
      });
    };

    if (isUpdateForm) {
      const customer = getCustomer(fromData.customerName);
      setCustomer(customer);
    } else {
      if (selectedCustomer) {
        const customer = getCustomer(selectedCustomer);
        setCustomer(customer);
      } else {
        setCustomerDetails({
          address: "",
          mobileNumber: "",
          email: "",
          customerId: "",
        });
      }
    }
  }, [selectedCustomer]);
  return (
    <>
      <Autocomplete
        disabled={isUpdateForm}
        sx={{ gridColumn: "span 4" }}
        options={customerNames}
        value={selectedCustomer}
        onChange={(event, newValue) => {
          if (newValue) {
            setSelectedCustomer(newValue);
            handleChange("customerName")(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer Name"
            name="customerName"
            value={values.customerName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.customerName && Boolean(errors.customerName)}
            helperText={touched.customerName && errors.customerName}
          />
        )}
      />
      {selectedCustomer && (
        <>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={customerDetails.mobileNumber}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
            disabled
          />

          <TextField
            disabled
            label="Customer ID"
            name="customerId"
            value={customerDetails.customerId}
            sx={{ gridColumn: "span 2" }}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 1" }}
            label="Email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 3" }}
            label="Address"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
}

export default CustomerFields;
