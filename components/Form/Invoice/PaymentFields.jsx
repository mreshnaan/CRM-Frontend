import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FieldArray } from "formik";
import React from "react";

function PaymentFields({ isViewForm, payments }) {
  return (
    <FieldArray name="payments">
      {({ push, remove, form }) => (
        <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
          {payments?.map((payment, index) => (
            <Box
              key={index}
              display="grid"
              pb={"20px"}
              gap="30px"
              gridTemplateColumns={`repeat(${
                isViewForm ? 3 : 4
              }, minmax(0, 1fr))`}
            >
              <TextField
                disabled={isViewForm}
                sx={{
                  display: `${
                    isViewForm && payment.description == "" && "none"
                  }`,
                }}
                name={`payments[${index}].description`}
                label="Description"
                value={payment.description}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.payments?.[index]?.description &&
                  Boolean(form.errors.payments?.[index]?.description)
                }
                helperText={
                  form.touched.payments?.[index]?.description &&
                  form.errors.payments?.[index]?.description
                }
              />
              <DatePicker
                disabled={isViewForm}
                sx={{
                  display: `${
                    isViewForm && payment.date == null && "none"
                  }`,
                }}
                name={`payments[${index}].date`}
                label="Date"
                value={dayjs(payment.date)}
                onChange={(value) =>
                  form.setFieldValue(`payments[${index}].date`, dayjs(value))
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
                sx={{
                  display: `${
                    isViewForm && payment.amount == "" && "none"
                  }`,
                }}
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
              onClick={() => push({ description: "", date: null, amount: "" })}
              variant="contained"
              color="primary"
            >
              Add Payment
            </Button>
          )}
        </Box>
      )}
    </FieldArray>
  );
}

export default PaymentFields;
