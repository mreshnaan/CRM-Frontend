import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function SalerFields({
  salerNames,
  isUpdateForm,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  salerDetails,
  setSalerDetails,
  setInitialValues,
  initialValues,
  fromData,
  salersData,
}) {
  const [selectedSaler, setSelectedSaler] = useState(initialValues.salerName);
  useEffect(() => {
    const getSaler = (name) => {
      return salersData?.find((saler) => {
        return saler?.attributes?.salerName === name;
      });
    };

    const setSaler = (saler) => {
      setInitialValues({
        salerName: saler?.attributes?.salerName,
      });

      setSalerDetails({
        address: saler?.attributes?.address,
        mobileNumber: saler?.attributes?.mobile,
        email: saler?.attributes?.email,
        salerId: saler?.id,
      });
    };

    if (isUpdateForm) {
      const saler = getSaler(fromData.salerName);
      setSaler(saler);
    } else {
      if (selectedSaler) {
        const saler = getSaler(selectedSaler);
        setSaler(saler);
      } else {
        setSalerDetails({
          address: "",
          mobileNumber: "",
          email: "",
          salerId: "",
        });
      }
    }
  }, [selectedSaler]);
  return (
    <>
      <Autocomplete
        disabled={isUpdateForm}
        sx={{ gridColumn: "span 4" }}
        options={salerNames}
        value={selectedSaler}
        onChange={(event, newValue) => {
          if (newValue) {
            setSelectedSaler(newValue);
            handleChange("salerName")(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Saler Name"
            name="salerName"
            value={values.salerName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.salerName && Boolean(errors.salerName)}
            helperText={touched.salerName && errors.salerName}
          />
        )}
      />
      {selectedSaler && (
        <>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={salerDetails.mobileNumber}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
            disabled
          />

          <TextField
            disabled
            label="Saler ID"
            name="salerId"
            value={salerDetails.salerId}
            sx={{ gridColumn: "span 2" }}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 1" }}
            label="Email"
            name="email"
            value={salerDetails.email}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 3" }}
            label="Address"
            name="address"
            value={salerDetails.address}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
}

export default SalerFields;
