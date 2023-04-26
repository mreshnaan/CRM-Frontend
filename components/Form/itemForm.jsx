import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const validationSchema = Yup.object({
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number()
        .required("Required")
        .min(0, "Price must be greater than or equal to 0"),
    })
  ),
});

const initialValues = {
  items: [{ itemCode: "", description: "", price: "" }],
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
    },
  },
});

const ItemForm = () => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values.items);
    resetForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FieldArray name="items">
              {({ push, remove, form }) => (
                <>
                  {form.values.items.map((item, index) => (
                    <div key={index}>
                      <TextField
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
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="outlined"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
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
                </>
              )}
            </FieldArray>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default ItemForm;
