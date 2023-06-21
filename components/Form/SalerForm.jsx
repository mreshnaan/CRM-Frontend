import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../HeaderTitle";
import { colors } from "@/theme";

const SalerForm = ({ isUpdateForm, isViewForm, fromData, setFromData }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    salerName: isUpdateForm ? fromData.salerName : null,
    email: isUpdateForm ? fromData.email : null,
    personType: isUpdateForm ? fromData.personType : null,
    mobile: isUpdateForm ? fromData.mobile : null,
    address: isUpdateForm ? fromData.address : null,
    country: isUpdateForm ? fromData.country : null,
  };

  // rules
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    salerName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    personType: yup.string().required("required"),
    mobile: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required"),
    country: yup.string().required("required"),
  });

  const handleFormSubmit = async (values) => {
    if (values) {
      setFromData(values);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={`${
          isViewForm
            ? "VIEW SALER"
            : isUpdateForm
            ? "UPDATE SALER"
            : "CREATE SALER"
        }`}
        subtitle={`${
          isViewForm
            ? "View Saler"
            : isUpdateForm
            ? "Update Saler"
            : "Create a New Saler"
        }`}
      />
      

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
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& .css-d9oaum-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input.MuiSelect-select":
                  {
                    color: `${colors.grey[400]}!important`,
                  },
                "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                  color: `${colors.grey[400]}!important`,
                },
                "& .css-16qgwi8-MuiFormLabel-root-MuiInputLabel-root": {
                  color: `${colors.grey[400]}!important`,
                },
                "& .css-16fmtdg-MuiInputBase-root-MuiFilledInput-root:before": {
                  borderBottom: `1px solid ${colors.grey[400]}!important `,
                },
                color: `${colors.white[400]} !important`,
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Saler Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salerName}
                name="salerName"
                error={!!touched.salerName && !!errors.salerName}
                helperText={touched.salerName && errors.salerName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                select
                variant="filled"
                label="Person Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.personType}
                name="personType"
                error={!!touched.personType && !!errors.personType}
                helperText={touched.personType && errors.personType}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobile}
                name="mobile"
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isUpdateForm ? "Update saler" : "Create New saler"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SalerForm;
