import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FieldArray } from "formik";
import React from "react";

function ItemFields({ items, isViewForm }) {
  return (
    <FieldArray name="items">
      {({ push, remove, form }) => (
        <Box sx={{ gridColumn: "span 4", gap: "30px" }}>
          {items.map((item, index) => (
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
                name={`items[${index}].name`}
                label="Name"
                value={item.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.name &&
                  Boolean(form.errors.items?.[index]?.name)
                }
                helperText={
                  form.touched.items?.[index]?.name &&
                  form.errors.items?.[index]?.name
                }
              />
              <TextField
                disabled={isViewForm}
                name={`items[${index}].make`}
                label="Make"
                value={item.make}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.make &&
                  Boolean(form.errors.items?.[index]?.make)
                }
                helperText={
                  form.touched.items?.[index]?.make &&
                  form.errors.items?.[index]?.make
                }
              />

              <TextField
                disabled={isViewForm}
                name={`items[${index}].model`}
                label="Model"
                value={item.model}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.model &&
                  Boolean(form.errors.items?.[index]?.model)
                }
                helperText={
                  form.touched.items?.[index]?.model &&
                  form.errors.items?.[index]?.model
                }
              />
              <DatePicker
                disabled={isViewForm}
                name={`items[${index}].year`}
                views={["year"]}
                label="Year"
                value={dayjs(item.year)}
                onChange={(value) =>
                  form.setFieldValue(`items[${index}].year`, dayjs(value))
                }
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.year &&
                  Boolean(form.errors.items?.[index]?.year)
                }
                helperText={
                  form.touched.items?.[index]?.year &&
                  form.errors.items?.[index]?.year
                }
              />

              {/* ENGINE CC */}
              <TextField
                disabled={isViewForm}
                name={`items[${index}].engine`}
                label="Engine CC"
                value={item.engine}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.engine &&
                  Boolean(form.errors.items?.[index]?.engine)
                }
                helperText={
                  form.touched.items?.[index]?.engine &&
                  form.errors.items?.[index]?.engine
                }
              />
              {/* CHSSISS NO */}
              <TextField
                disabled={isViewForm}
                name={`items[${index}].chssiss`}
                label="Chssiss NO "
                value={item.chssiss}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={
                  form.touched.items?.[index]?.chssiss &&
                  Boolean(form.errors.items?.[index]?.chssiss)
                }
                helperText={
                  form.touched.items?.[index]?.chssiss &&
                  form.errors.items?.[index]?.chssiss
                }
              />
              <TextField
                disabled={isViewForm}
                name={`items[${index}].freight`}
                label="Freight"
                value={item.freight}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="number"
                error={
                  form.touched.items?.[index]?.freight &&
                  Boolean(form.errors.items?.[index]?.freight)
                }
                helperText={
                  form.touched.items?.[index]?.freight &&
                  form.errors.items?.[index]?.freight
                }
              />
              <TextField
                disabled={isViewForm}
                name={`items[${index}].price`}
                label="FOB Price"
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
              {/* Render additional fields for this item */}
              {item.fields &&
                item.fields.map((field, fieldIndex) => (
                  <TextField
                    key={fieldIndex}
                    disabled={isViewForm}
                    name={`items[${index}].fields[${fieldIndex}].value`}
                    label={field.label}
                    value={field.value}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={
                      form.touched.items?.[index]?.fields?.[fieldIndex]
                        ?.value &&
                      Boolean(
                        form.errors.items?.[index]?.fields?.[fieldIndex]?.value
                      )
                    }
                    helperText={
                      form.touched.items?.[index]?.fields?.[fieldIndex]
                        ?.value &&
                      form.errors.items?.[index]?.fields?.[fieldIndex]?.value
                    }
                  />
                ))}

              {/* Render button to add a new field for this item */}
              {!isViewForm && (
                <Button
                  type="button"
                  onClick={() =>
                    form.setFieldValue(`items[${index}].fields`, [
                      ...(item.fields || []),
                      {
                        label: `Field ${item.fields?.length + 1 || 1}`,
                        value: "",
                      },
                    ])
                  }
                  variant="contained"
                  color="primary"
                >
                  Additional Field
                </Button>
              )}
              {/* Render button to remove a field for this item */}
              {!isViewForm && item.fields && item.fields.length > 0 && (
                <Button
                  type="button"
                  onClick={() =>
                    form.setFieldValue(
                      `items[${index}].fields`,
                      item.fields.slice(0, -1)
                    )
                  }
                  variant="contained"
                  color="error"
                >
                  Remove Last Field
                </Button>
              )}

              {/* Render button to remove this item */}
              {!isViewForm && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="contained"
                  color="error"
                >
                  Remove Item
                </Button>
              )}
            </Box>
          ))}

          {/* Render button to add a new item */}
          {!isViewForm && (
            <Button
              type="button"
              onClick={() =>
                push({
                  itemCode: "",
                  fields: [],
                })
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
  );
}

export default ItemFields;
