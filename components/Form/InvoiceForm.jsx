import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../HeaderTitle";
import { colors } from "@/theme";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InvoiceModel from "../Models/InvoiceModel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment';


// validation schema
const checkoutSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  items: yup.array().of(
    yup.object().shape({
      itemCode: yup.string().required("Required"),
      description: yup.string().required("Required"),
      price: yup
        .number()
        .required("Required")
        .min(0, "Price must be greater than or equal to 0"),
    })
  ),
});

const InvoiceForm = ({
  isViewForm,
  isUpdateForm,
  fromData,
  customersData,
  handleInvoice,
}) => {
  console.log("fromData :", fromData);
  //mobile responsive
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // date formate
  const date = new Date();
  const today = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  //check the customer is available in the customer data

  const isCheckCustomer =
    isUpdateForm &&
    customersData.find(
      (customer) =>
        `${customer.attributes.fName} ${customer.attributes.lName}` ===
        fromData.customerName
    );

  //form initial values
  const initialValues = {
    customerName: isUpdateForm ? isCheckCustomer : null,
    items: isUpdateForm
      ? fromData.items.map((item) => ({
          itemCode: item.itemCode,
          description: item.description,
          price: item.price,
        }))
      : [{ itemCode: "", description: "", price: "" }],
    payments: isUpdateForm
      ? fromData?.payments?.map((payment) => ({
          description: payment.description,
          amount: payment.amount,
          date: payment.date,
        }))
      : [{ description: "", date: null, amount: "" }],
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [allDetails, setAlldetails] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState(
    initialValues.customerName
  );
  const [customerDetails, setCustomerDetails] = useState({
    address: "",
    mobileNumber: "",
    customerId: "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      console.log(selectedCustomer.attributes);
      // Update the customer details state with the selected customer's details
      setCustomerDetails({
        address: selectedCustomer.attributes.address,
        mobileNumber: selectedCustomer.attributes.mobile,
        customerId: selectedCustomer.id,
      });
    } else {
      // Reset the customer details state if no customer is selected
      setCustomerDetails({
        address: "",
        mobileNumber: "",
        customerId: "",
      });
    }
  }, [selectedCustomer]);

  //when reloads the page Generate a new invoice number
  useEffect(() => {
    setInvoiceNumber(uuidv4());
  }, []);

  //get total price of the items
  const getTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.price || 0);
    }, 0);
  };

  //model close
  const handleClose = () => {
    setFormSubmitted(false);
  };

  //form submit
  const handleFormSubmit = (values) => {
    const mergedObj = Object.assign({}, values, customerDetails, {
      invoiceNumber,
      today,
    });
    setAlldetails(mergedObj);
    setFormSubmitted(true);
  };

  return (
    <Box m="20px">
      {isViewForm ? (
        <>
          <Header title={`VIEW INVOICE`} subtitle={`VIEW Customer Invoice`} />
        </>
      ) : (
        <>
          <Header
            title={`${isUpdateForm ? `UPDATE INVOICE` : `CREATE INVOICE`}`}
            subtitle={`${
              isUpdateForm
                ? `Update Customer Invoice`
                : `Create a New Customer Invoice`
            }`}
          />
        </>
      )}

      <Box
        m="20px"
        p="40px"
        style={{ background: colors.white[500], borderRadius: "16px" }}
      >
        <Box
          display={"flex"}
          color={"black"}
          justifyContent={"space-between"}
          mb="20px"
        >
          <Typography>Current Date : {today}</Typography>
          <Typography>
            Invoice Number :{" "}
            {isUpdateForm ? fromData.invoiceNumber : invoiceNumber}
          </Typography>
        </Box>
        {formSubmitted && (
          <InvoiceModel
            modelOpen={formSubmitted}
            data={allDetails}
            handleClose={handleClose}
            handleInvoice={handleInvoice}
          />
        )}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Customer Details
                </Typography>
                <Autocomplete
                  disabled={isUpdateForm}
                  sx={{ gridColumn: "span 4" }}
                  options={customersData}
                  getOptionLabel={(option) =>
                    `${option?.attributes?.fName} ${option?.attributes?.lName}`
                  }
                  value={selectedCustomer}
                  onChange={(event, newValue) => {
                    setSelectedCustomer(newValue);
                    handleChange("customerName")(
                      newValue
                        ? `${newValue.attributes.fName} ${newValue.attributes.lName}`
                        : ""
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Name"
                      name="customerName"
                      value={JSON.stringify(values.customerName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.customerName && Boolean(errors.customerName)
                      }
                      helperText={touched.customerName && errors.customerName}
                    />
                  )}
                />

                <TextField
                  label="Customer ID"
                  name="customerId"
                  value={customerDetails.customerId}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 1" }}
                  disabled
                />
                <TextField
                  disabled
                  label="Mobile Number"
                  name="mobileNumber"
                  value={customerDetails.mobileNumber}
                  sx={{ gridColumn: "span 3" }}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  sx={{ gridColumn: "span 4" }}
                  label="Address"
                  name="address"
                  value={customerDetails.address}
                  onChange={handleChange}
                />
                <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
                  {/* shipment status select box   */}
                  <Typography
                    color={"gray"}
                    sx={{ textTransform: "uppercase" }}
                  >
                    Shipment Details
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 3, minWidth: 80 }}>
                    <InputLabel id="shipmentStatus">Status</InputLabel>
                    <Select
                      disabled={isViewForm}
                      labelId="shipmentStatus"
                      id="shipmentStatus"
                      value={values.shipmentStatus}
                      onChange={handleChange}
                      autoWidth
                      label="Status"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"pending"}>Pending</MenuItem>
                      <MenuItem value={"refund"}>Refund</MenuItem>
                      <MenuItem value={"shipped"}>Shipped</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Product Details
                </Typography>
                <FieldArray name="items">
                  {({ push, remove, form }) => (
                    <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
                      {form.values.items.map((item, index) => (
                        <Box
                          key={index}
                          display="grid"
                          pb={"20px"}
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            disabled={isViewForm}
                            name={`items[${index}].itemCode`}
                            label="Item Code"
                            value={item.itemCode}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={
                              form.touched.items?.[index]?.itemCode &&
                              Boolean(form.errors.items?.[index]?.itemCode)
                            }
                            helperText={
                              form.touched.items?.[index]?.itemCode &&
                              form.errors.items?.[index]?.itemCode
                            }
                          />
                          <TextField
                            disabled={isViewForm}
                            name={`items[${index}].description`}
                            label="Description"
                            value={item.description}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={
                              form.touched.items?.[index]?.description &&
                              Boolean(form.errors.items?.[index]?.description)
                            }
                            helperText={
                              form.touched.items?.[index]?.description &&
                              form.errors.items?.[index]?.description
                            }
                          />
                          <TextField
                            disabled={isViewForm}
                            name={`items[${index}].price`}
                            label="Price"
                            value={item.price}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            type="number"
                            error={
                              form.touched.items?.[index]?.price &&
                              Boolean(form.errors.items?.[index]?.price)
                            }
                            helperText={
                              form.touched.items?.[index]?.price &&
                              form.errors.items?.[index]?.price
                            }
                          />
                          {!isViewForm && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant="contained"
                              color="error"
                            >
                              Remove
                            </Button>
                          )}
                        </Box>
                      ))}
                      {!isViewForm && (
                        <Button
                          type="button"
                          onClick={() =>
                            push({ itemCode: "", description: "", price: "" })
                          }
                          variant="contained"
                          color="primary"
                        >
                          Add Item
                        </Button>
                      )}
                    </Box>
                  )}
                </FieldArray>

                {/* payment status select box   */}
                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Payment Details
                </Typography>
                <FieldArray name="payments">
                  {({ push, remove, form }) => (
                    <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
                      {form.values.payments?.map((payment, index) => (
                        <Box
                          key={index}
                          display="grid"
                          pb={"20px"}
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            disabled={isViewForm}
                            name={`payments[${index}].description`}
                            label="Description"
                            value={payment.description}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={
                              form.touched.payments?.[index]?.description &&
                              Boolean(
                                form.errors.payments?.[index]?.description
                              )
                            }
                            helperText={
                              form.touched.payments?.[index]?.description &&
                              form.errors.payments?.[index]?.description
                            }
                          />
                          <DatePicker
                            disabled={isViewForm}
                            name={`payments[${index}].date`}
                            label="Date"
                            value={moment(payment.date)} // convert payment date to moment.js object
                            onChange={(value) =>
                              form.setFieldValue(
                                `payments[${index}].date`,
                                moment(value).toISOString() // convert moment.js object back to ISO string
                              )
                            }
                            onBlur={form.handleBlur}
                            error={
                              form.touched.payments?.[index]?.date &&
                              Boolean(form.errors.payments?.[index]?.date)
                            }
                            helperText={
                              form.touched.payments?.[index]?.date &&
                              form.errors.payments?.[index]?.date
                            }
                          />
                          <TextField
                            disabled={isViewForm}
                            name={`payments[${index}].amount`}
                            label="Amount"
                            value={payment.amount}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            type="number"
                            error={
                              form.touched.payments?.[index]?.amount &&
                              Boolean(form.errors.payments?.[index]?.amount)
                            }
                            helperText={
                              form.touched.payments?.[index]?.amount &&
                              form.errors.payments?.[index]?.amount
                            }
                          />
                          {!isViewForm && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant="contained"
                              color="error"
                            >
                              Remove
                            </Button>
                          )}
                        </Box>
                      ))}
                      {!isViewForm && (
                        <Button
                          type="button"
                          onClick={() =>
                            push({ description: "", date: null, amount: "" })
                          }
                          variant="contained"
                          color="primary"
                        >
                          Add Payment
                        </Button>
                      )}
                    </Box>
                  )}
                </FieldArray>
                <Box
                  display={"flex"}
                  color={"black"}
                  justifyContent={"flex-end"}
                  sx={{ gridColumn: "span 4" }}
                >
                  Total Price: {getTotalPrice(values.items).toFixed(2)}
                </Box>
              </Box>
              {!isViewForm && (
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Generate Invoice
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default InvoiceForm;
