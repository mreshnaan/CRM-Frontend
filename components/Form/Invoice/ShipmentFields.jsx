import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

function ShipmentFields({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  isViewForm,
}) {
  return (
    <>
      <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
        <Box
          display="grid"
          pb={"20px"}
          gap="30px"
          gridTemplateColumns={`repeat(4, minmax(0, 1fr))`}
        >
          <TextField
            disabled={isViewForm}
            name={`shipmentDetails.portOfShipment`}
            label="Port Of Shipment"
            value={values.shipmentDetails.portOfShipment}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.shipmentDetails?.portOfShipment &&
              Boolean(errors.shipmentDetails?.portOfShipment)
            }
            helperText={
              touched.shipmentDetails?.portOfShipment &&
              errors.shipmentDetails?.portOfShipment
            }
          />

          <TextField
            disabled={isViewForm}
            name={`shipmentDetails.portOfDelivery`}
            label="Port Of Delivery"
            value={values.shipmentDetails.portOfDelivery}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.shipmentDetails?.portOfDelivery &&
              Boolean(errors.shipmentDetails?.portOfDelivery)
            }
            helperText={
              touched.shipmentDetails?.portOfDelivery &&
              errors.shipmentDetails?.portOfDelivery
            }
          />

          <TextField
            disabled={isViewForm}
            name={`shipmentDetails.dateOfShipment`}
            label="Date Of Shipment"
            value={values.shipmentDetails.dateOfShipment}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.shipmentDetails?.dateOfShipment &&
              Boolean(errors.shipmentDetails?.dateOfShipment)
            }
            helperText={
              touched.shipmentDetails?.dateOfShipment &&
              errors.shipmentDetails?.dateOfShipment
            }
          />

          <FormControl
            disabled={isViewForm}
            error={
              touched.shipmentDetails?.paymentTerms &&
              Boolean(errors.shipmentDetails?.paymentTerms)
            }
          >
            <InputLabel id="payment-terms-label">Payment Terms</InputLabel>
            <Select
              disabled={isViewForm}
              labelId="payment-terms-label"
              id="payment-terms-select"
              name={`shipmentDetails.paymentTerms`}
              value={values.shipmentDetails.paymentTerms}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="tt">TT</MenuItem>
              <MenuItem value="ff">FF</MenuItem>
            </Select>
            {touched.shipmentDetails?.paymentTerms &&
              errors.shipmentDetails?.paymentTerms && (
                <FormHelperText>
                  {errors.shipmentDetails.paymentTerms}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              disabled={isViewForm}
              labelId="status-label"
              id="status"
              name={`shipmentDetails.status`}
              value={values.shipmentDetails.status}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
            {touched.shipmentDetails?.status &&
              errors.shipmentDetails?.status && (
                <FormHelperText>{errors.shipmentDetails.status}</FormHelperText>
              )}
          </FormControl>

          <DatePicker
            disabled={isViewForm}
            name={`shipmentDetails.dateOfExpire`}
            label="Date of Expire"
            value={dayjs(values.shipmentDetails.dateOfExpire)}
            onChange={(date) =>
              setFieldValue(`shipmentDetails.dateOfExpire`, dayjs(date))
            }
            onBlur={handleBlur}
            error={
              touched.shipmentDetails?.dateOfExpire &&
              Boolean(errors.shipmentDetails?.dateOfExpire)
            }
            helperText={
              touched.shipmentDetails?.dateOfExpire &&
              errors.shipmentDetails?.dateOfExpire
            }
          />
          <DatePicker
            disabled={isViewForm}
            name={`shipmentDetails.latestShipmentDate`}
            label="Date of Expire"
            value={dayjs(values.shipmentDetails.latestShipmentDate)}
            onChange={(date) =>
              setFieldValue(`shipmentDetails.latestShipmentDate`, dayjs(date))
            }
            onBlur={handleBlur}
            error={
              touched.shipmentDetails?.latestShipmentDate &&
              Boolean(errors.shipmentDetails?.latestShipmentDate)
            }
            helperText={
              touched.shipmentDetails?.latestShipmentDate &&
              errors.shipmentDetails?.latestShipmentDate
            }
          />
        </Box>
      </Box>
    </>
  );
}

export default ShipmentFields;
