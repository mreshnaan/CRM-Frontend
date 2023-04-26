import { Box, IconButton } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../theme";
import Header from "../HeaderTitle";
import UpdateCustomerModel from "../Models/updateCustomerModel";
import { useState } from "react";
import InvoiceModel from "../Models/InvoiceModel";
import RemoveCustomerModel from "../Models/RemoveCustomerModel";

const CustomerTable = ({ data, page, size, onPageChange, pageSize }) => {
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
      cellClassName: "user-id-column--cell",
    },
    {
      field: "fName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "fName-column--cell",
    },
    {
      field: "lName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "personType",
      headerName: "Person Type",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
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
          setFormSubmitted(true);
          setFormData(data);
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
    ({ id, attributes: { fName, lName, personType, country, mobile } }) => ({
      id,
      fName,
      lName,
      personType,
      country,
      mobile,
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
        }}
      >
        {formSubmitted && (
          <UpdateCustomerModel
            modelOpen={formSubmitted}
            data={formData}
            handleClose={handleClose}
          />
        )}
        {formSubmitted && (
          <RemoveCustomerModel
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

export default CustomerTable;
