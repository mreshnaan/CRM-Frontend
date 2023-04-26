import { Box, IconButton, Select } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../theme";
import Header from "../HeaderTitle";
import { useState } from "react";
import UpdateInvoiceModel from "../Models/UpdateInvoiceModel";
import RemoveInvoiceModel from "../Models/RemoveInvoiceModel";

const InvoiceTable = ({ data, page, size, onPageChange, pageSize }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleClose = () => {
    setFormSubmitted(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "invoice-id-column--cell",
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      flex: 1,
      cellClassName: "invoice-number-column--cell",
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "customer-column--cell",
    },
    {
      field: "items",
      headerName: "Items",
      flex: 1,
      renderCell: (params) => (
        <Select fullWidth native className="item-select">
          {params.value.map((item) => (
            <option key={item.itemCode} className="item-options">
              {item.itemCode} - {item.description} - ${item.price}
            </option>
          ))}
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const handleEdit = (data) => {
          // Handle edit button click for this row
          setFormSubmitted(true);
          setFormData(data);
        };

        const handleRemove = () => {
          // Handle remove button click for this row
          // setFormSubmitted({ data: id, open: true });
        };
        return (
          <div>
            <IconButton
              sx={{ color: `${colors.grey[500]} !important` }}
              onClick={() => {
                handleEdit(params);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: `${colors.grey[500]} !important` }}
              onClick={() => handleRemove(params)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  // array of objects into a new array with only the necessary properties
  const rows = data?.data?.map(
    ({ id, attributes: { invoiceNumber, customer, items } }) => ({
      id,
      invoiceNumber,
      customer: `${customer.data.attributes.fName} ${customer.data.attributes.lName}`,
      items,
    })
  );

  return (
    <Box m="20px">
      <Header title="Customer" subtitle="List of Customer Invoice" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            color: colors.white[400],
            textAlign: "center",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .item-select": {
            color: colors.white[400],
          },
          "& .item-options": {
            color: colors.black[400],
          },
        }}
      >
        {formSubmitted && (
          <UpdateInvoiceModel
            modelOpen={formSubmitted}
            data={formData}
            handleClose={handleClose}
          />
        )}
        {formSubmitted && (
          <RemoveInvoiceModel
            modelOpen={formSubmitted}
            data={formData}
            handleClose={handleClose}
          />
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[size]}
          page={page}
          onPageChange={onPageChange}
          pageSize={pageSize}
        />
      </Box>
    </Box>
  );
};

export default InvoiceTable;
