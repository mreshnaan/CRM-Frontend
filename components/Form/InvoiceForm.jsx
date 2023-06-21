import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../HeaderTitle";
import { colors } from "@/theme";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import InvoiceModel from "../Models/InvoiceModel";
import ItemFields from "./Invoice/ItemFields";
import PaymentFields from "./Invoice/paymentFields";
// import CustomerFields from "./Invoice/CustomerFields";
// import SalerFields from "./Invoice/SalerFields";
import ImageUpload from "./Invoice/imageUpload";
import {
  getInitialItemValues,
  getInitialPaymentValues,
  getInitialShipmentValues,
} from "@/helpers/invoiceHelper";
import ShipmentFields from "./Invoice/ShipmentFields";
import AutocompleteCustomer from "./AutocompleteCustomer";
import AutocompleteSaler from "./AutocompleteSaler";
import { generateInvoicePDF } from "../Invoice/GenerateInvoice";

// validation schema
const checkoutSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salerName: yup.string().required("Customer name is required"),
  salesCode: yup.string().required("sales code is required"),
  items: yup.array().of(
    yup.object().shape({
      itemCode: yup.string().required("Required"),
      name: yup.string().required("Required"),
      make: yup.string().required("Required"),
      model: yup.string().required("Required"),
      year: yup.date().required("Required"),
      engine: yup.string().required("Required"),
      chssiss: yup.string().required("Required"),
      freight: yup
        .number()
        .required("Required")
        .positive("Amount must be a positive number")
        .min(0, "Freight must be greater than or equal to 0"),
      price: yup
        .number()
        .required("Required")
        .positive("Amount must be a positive number")
        .min(0, "Price must be greater than or equal to 0"),
    })
  ),
  shipmentDetails: yup.object().shape({
    portOfShipment: yup.string().required("Port of Shipment is required"),
    portOfDelivery: yup.string().required("Port of Delivery is required"),
    dateOfShipment: yup.string().required("Date of Shipment is required"),
    paymentTerms: yup.string().required("Payment Terms is required"),
    status: yup.string().required("Status is required"),
    dateOfExpire: yup.string().required("Date of Expire is required"),
    latestShipmentDate: yup
      .string()
      .required("Latest Shipment Date is required"),
  }),
});

const InvoiceForm = (props) => {
  const { isViewForm, isUpdateForm, fromData, handleInvoice } = props;

  //mobile responsive
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // date formate
  const date = new Date();
  const today = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const initialItems = getInitialItemValues(fromData);

  const initialPayments = getInitialPaymentValues(fromData);

  const initialShipmentDetails = getInitialShipmentValues(fromData);

  const [initialValues, setInitialValues] = useState({
    customerName: fromData ? fromData.customerName : null,
    salesCode: fromData ? fromData.salesCode : "",
    salerName: fromData ? fromData.salerName : null,
    items: initialItems,
    payments: initialPayments,
    paidReceipt: null,
    shipmentDetails: initialShipmentDetails,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  // const [allDetails, setAlldetails] = useState();

  const [customerDetails, setCustomerDetails] = useState({
    address: "",
    email: "",
    mobileNumber: "",
    customerId: "",
  });

  const [salerDetails, setSalerDetails] = useState({
    address: "",
    email: "",
    mobileNumber: "",
    salerId: "",
  });

  useEffect(() => {
    if (fromData && fromData.customerName != undefined) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        customerName: fromData.customerName,
        salerName: fromData.salerName,
      }));
    }
  }, [fromData]);

  // useEffect(() => {
  //   if (fromData.paidReceipt !== undefined && fromData.paidReceipt !== null) {
  //     setInitialValues((prevValues) => ({
  //       ...prevValues,
  //       paidReceipt: fromData.paidReceipt,
  //     }));
  //   }
  // }, [fromData]);

  //when reloads the page Generate a new invoice number
  // Generate a new invoice number
  useEffect(() => {
    const generateInvoiceNumber = () => {
      const uniqueId = uuidv4().split("-")[0]; // Extracting the first part of the UUID
      const shortenedId = uniqueId.slice(0, 8); // Taking the first 8 characters
      setInvoiceNumber(shortenedId);
    };

    generateInvoiceNumber();
  }, []);

  //get total price of the items
  const getTotalAmount = (items) => {
    return items.reduce((total, item) => {
      return (
        total + parseFloat(item.freight || 0) + parseFloat(item.price || 0)
      );
    }, 0);
  };

  const getTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.price || 0);
    }, 0);
  };
  const getTotalFreight = (items) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.freight || 0);
    }, 0);
  };

  //model close
  // const handleClose = () => {
  //   setFormSubmitted(false);
  // };

  //form submit
  const handleFormSubmit = (values) => {
    const mergedObj = {
      ...values,
      customerDetails,
      salerDetails,
      invoiceNumber: fromData ? fromData.invoiceNumber : invoiceNumber,
      today,
    };
    // setAlldetails(mergedObj);
    // setFormSubmitted(true);
    handleInvoice(mergedObj)
    generateInvoicePDF(mergedObj);
  };

  return (
    <Box m="20px">
      <Header
        title={`${
          isViewForm
            ? "VIEW INVOICE"
            : isUpdateForm
            ? "UPDATE INVOICE"
            : "CREATE INVOICE"
        }`}
        subtitle={`${
          isViewForm
            ? "View Customer Invoice"
            : isUpdateForm
            ? "Update Customer Invoice"
            : "Create a New Customer Invoice"
        }`}
      />

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
        {/* {formSubmitted && (
          <InvoiceModel
            modelOpen={formSubmitted}
            data={allDetails}
            handleClose={handleClose}
            handleInvoice={handleInvoice}
          />
        )} */}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <Form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  disabled={isViewForm}
                  sx={{ gridColumn: "span 4" }}
                  name={`salesCode`}
                  label="Sales Code"
                  value={values.salesCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salesCode && Boolean(errors.salesCode)}
                  helperText={touched.salesCode && errors.salesCode}
                />

                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Customer Details
                </Typography>

                <AutocompleteCustomer
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  initialCustomerName={initialValues.customerName}
                  setCustomerDetails={setCustomerDetails}
                  customerDetails={customerDetails}
                  setFieldValue={setFieldValue}
                  setInitialValues={setInitialValues}
                  isUpdateForm={isUpdateForm}
                />

                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Saler Details
                </Typography>

                <AutocompleteSaler
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  initialSalerName={initialValues.salerName}
                  setSalerDetails={setSalerDetails}
                  salerDetails={salerDetails}
                  setFieldValue={setFieldValue}
                  setInitialValues={setInitialValues}
                  isUpdateForm={isUpdateForm}
                />

                <Typography color={"gray"} sx={{ textTransform: "uppercase" }}>
                  Product Details
                </Typography>

                <ItemFields isViewForm={isViewForm} items={values.items} />
                {/* shipment details   */}

                <Typography color={"gray"}>Shipment Details</Typography>
                <ShipmentFields
                  isViewForm={isViewForm}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />

                {/* payment status select box   */}
                {fromData && (
                  <>
                    <Typography
                      color={"gray"}
                      sx={{
                        textTransform: "uppercase",
                        display: `${
                          isViewForm &&
                          fromData.payments[0].description == "" &&
                          "none"
                        }`,
                      }}
                    >
                      Payment Details
                    </Typography>
                    <PaymentFields
                      isViewForm={isViewForm}
                      payments={values.payments}
                    />
                  </>
                )}
                {/* payment receipt   */}

                <ImageUpload
                  initialValues={fromData && fromData.paidReceipt}
                  isUpdateForm={isUpdateForm}
                  isViewForm={isViewForm}
                  setFieldValue={setFieldValue}
                />

                <Box
                  display={"flex"}
                  color={"black"}
                  justifyContent={"flex-end"}
                  sx={{ gridColumn: "span 4" }}
                >
                  Total Freight: {getTotalFreight(values.items).toFixed(2)}
                </Box>
                <Box
                  display={"flex"}
                  color={"black"}
                  justifyContent={"flex-end"}
                  sx={{ gridColumn: "span 4" }}
                >
                  Total Price: {getTotalPrice(values.items).toFixed(2)}
                </Box>

                <Box
                  display={"flex"}
                  color={"black"}
                  justifyContent={"flex-end"}
                  sx={{ gridColumn: "span 4" }}
                >
                  Total Amount: {getTotalAmount(values.items).toFixed(2)}
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
