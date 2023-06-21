import React, { useEffect, useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Field, ErrorMessage } from "formik";
import { CircularProgress } from "@mui/material";

const AutocompleteCustomer = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  initialCustomerName,
  setCustomerDetails,
  setFieldValue,
  customerDetails,
  setInitialValues,
  isUpdateForm,
}) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (isUpdateForm && initialCustomerName) {
      setSearchQuery(initialCustomerName);
      fetchCustomers();
    }
  }, [initialCustomerName, isUpdateForm]);

  const fetchCustomers = useCallback(async () => {
    if (!searchQuery) {
      setOptions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers?_where[customerName_contains]=${searchQuery}`
      );
      const data = response.data.data;

      const foundCustomer = data.find(
        (customer) =>
          customer.attributes.customerName.toLowerCase() ===
          searchQuery.toLowerCase()
      );

      if (foundCustomer) {
        setSelectedCustomer(foundCustomer);
        handleChange("customerName")(foundCustomer.attributes.customerName);
        setInitialValues({
          customerName: foundCustomer.attributes.customerName,
        });
        setCustomerDetails({
          address: foundCustomer.attributes.address || "",
          mobileNumber: foundCustomer.attributes.mobile || "",
          email: foundCustomer.attributes.email || "",
          customerId: foundCustomer.id || "",
        });
        return;
      }
      setOptions(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      fetchCustomers();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCustomerSelect = (event, newValue) => {
    if (newValue) {
      setSelectedCustomer(newValue);
      handleChange("customerName")(newValue.attributes.customerName);
      setInitialValues({ customerName: newValue.attributes.customerName });
      setCustomerDetails({
        address: newValue.attributes.address || "",
        mobileNumber: newValue.attributes.mobile || "",
        email: newValue.attributes.email || "",
        customerId: newValue.id || "",
      });
    }
  };

  return (
    <>
      <Autocomplete
        loading
        disabled={isUpdateForm}
        options={options}
        sx={{ gridColumn: "span 4" }}
        getOptionLabel={(option) => option.attributes.customerName}
        value={selectedCustomer}
        onChange={(event, newValue) => {
          handleCustomerSelect(event, newValue);
          setFieldValue(
            "customerName",
            newValue?.attributes.customerName || ""
          );
        }}
        renderInput={(params) => (
          <Field name="customerName">
            {({ field }) => (
              <>
                <TextField
                  {...params}
                  {...field}
                  label="Customer Name"
                  value={values.customerName}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    field.onChange(event);
                    handleInputChange(event);
                  }}
                  error={touched.customerName && Boolean(errors.customerName)}
                  helperText={touched.customerName && errors.customerName}
                />
                <ErrorMessage name="customerName" component="div" />
              </>
            )}
          </Field>
        )}
      />
      {selectedCustomer && (
        <>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={customerDetails.mobileNumber}
            onChange={(event) => {
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                mobileNumber: event.target.value,
              }));
            }}
            sx={{ gridColumn: "span 2" }}
            disabled
          />

          <TextField
            disabled
            label="Customer ID"
            name="customerId"
            value={customerDetails.customerId}
            sx={{ gridColumn: "span 2" }}
            onChange={(event) => {
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                customerId: event.target.value,
              }));
            }}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 1" }}
            label="Email"
            name="email"
            value={customerDetails.email}
            onChange={(event) => {
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                email: event.target.value,
              }));
            }}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 3" }}
            label="Address"
            name="address"
            value={customerDetails.address}
            onChange={(event) => {
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                address: event.target.value,
              }));
            }}
          />
        </>
      )}
    </>
  );
};

export default AutocompleteCustomer;
