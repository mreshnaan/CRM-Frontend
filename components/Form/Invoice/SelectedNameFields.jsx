import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function SelectedNameFields({
  names,
  isUpdateForm,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  details,
  setDetails,
  setInitialValues,
  initialValues,
  fromData,
  data,
}) {
  const [selectedName, setSelectedName] = useState(
    initialValues.fullName
  );
  useEffect(() => {
    const getItem = (name) => {
      return data.find((item) => {
        return item?.attributes?.fullName === name;
      });
    };

    const setItem = (item) => {
      setInitialValues({
        fullName: item.attributes.fullName,
      });

      setDetails({
        address: item.attributes.address,
        mobileNumber: item.attributes.mobile,
        email: item.attributes.email,
        id: item.id,
      });
    };

    if (isUpdateForm) {
      const item = getItem(fromData.fullName);
      setItem(item);
    } else {
      if (selectedName) {
        const item = getItem(selectedName);
        setItem(item);
      } else {
        setDetails({
          address: "",
          mobileNumber: "",
          email: "",
          id: "",
        });
      }
    }
  }, [selectedName]);

  return (
    <>
      <Autocomplete
        disabled={isUpdateForm}
        sx={{ gridColumn: "span 4" }}
        options={names}
        value={selectedName}
        onChange={(event, newValue) => {
          if (newValue) {
            setSelectedName(newValue);
            handleChange("fullName")(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
        )}
      />
      {selectedName && (
        <>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={details.mobileNumber}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
            disabled
          />

          <TextField
            disabled
            label="ID"
            name="id"
            value={details.id}
            sx={{ gridColumn: "span 2" }}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 1" }}
            label="Email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
          <TextField
            disabled
            sx={{ gridColumn: "span 3" }}
            label="Address"
            name="address"
            value={details.address}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
}

export default SelectedNameFields;
