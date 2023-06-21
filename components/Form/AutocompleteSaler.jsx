import React, { useEffect, useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Field, ErrorMessage } from "formik";

const AutocompleteSaler = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  initialSalerName,
  setSalerDetails,
  setFieldValue,
  salerDetails,
  setInitialValues,
  isUpdateForm,
}) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedSaler, setSelectedSaler] = useState(null);

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      fetchSalers();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (isUpdateForm && initialSalerName) {
      setSearchQuery(initialSalerName);
      fetchSalers();
    }
  }, [initialSalerName, isUpdateForm]);

  const fetchSalers = useCallback(async () => {
    if (searchQuery == null) {
      setOptions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/salers?_where[salerName_contains]=${searchQuery}`
      );
      const data = response.data.data;

      // Filter the results based on the search query
      const foundSaler = data.find(
        (saler) =>
          saler.attributes.salerName.toLowerCase() === searchQuery.toLowerCase()
      );

      if (foundSaler) {
        setSelectedSaler(foundSaler);
        handleChange("salerName")(foundSaler.attributes.salerName);
        setInitialValues({
          salerName: foundSaler.attributes.salerName,
        });
        setSalerDetails({
          address: foundSaler.attributes.address || "",
          mobileNumber: foundSaler.attributes.mobile || "",
          email: foundSaler.attributes.email || "",
          salerId: foundSaler.id || "",
        });
        return; // Exit the loop if customer is found
      }

      setOptions(data);
    } catch (error) {
      console.error("Error fetching salers:", error);
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSalerSelect = (event, newValue) => {
    if (newValue) {
      setSelectedSaler(newValue);
      handleChange("salerName")(newValue.attributes.salerName);
      setInitialValues({ salerName: newValue.attributes.salerName });
      setSalerDetails({
        address: newValue.attributes.address || "",
        mobileNumber: newValue.attributes.mobile || "",
        email: newValue.attributes.email || "",
        salerId: newValue.id || "",
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
        getOptionLabel={(option) => option.attributes.salerName}
        value={selectedSaler}
        onChange={(event, newValue) => {
          handleSalerSelect(event, newValue);
          setFieldValue("salerName", newValue?.attributes.salerName || "");
        }}
        renderInput={(params) => (
          <Field name="salerName">
            {({ field }) => (
              <>
                <TextField
                  {...params}
                  {...field}
                  label="Saler Name"
                  value={values.salerName}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    field.onChange(event);
                    handleInputChange(event);
                  }}
                  error={touched.salerName && Boolean(errors.salerName)}
                  helperText={touched.salerName && errors.salerName}
                />
                <ErrorMessage name="salerName" component="div" />
              </>
            )}
          </Field>
        )}
      />
      {selectedSaler && (
        <>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={salerDetails.mobileNumber}
            onChange={(event) => {
              setSalerDetails((prevDetails) => ({
                ...prevDetails,
                mobileNumber: event.target.value,
              }));
            }}
            sx={{ gridColumn: "span 2" }}
            disabled
          />

          <TextField
            disabled
            label="Saler ID"
            name="salerId"
            value={salerDetails.salerId}
            sx={{ gridColumn: "span 2" }}
            onChange={(event) => {
              setSalerDetails((prevDetails) => ({
                ...prevDetails,
                salerId: event.target.value,
              }));
            }}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 1" }}
            label="Email"
            name="email"
            value={salerDetails.email}
            onChange={(event) => {
              setSalerDetails((prevDetails) => ({
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
            value={salerDetails.address}
            onChange={(event) => {
              setSalerDetails((prevDetails) => ({
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

export default AutocompleteSaler;
