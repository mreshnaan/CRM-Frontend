import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../theme";
import Header from "../HeaderTitle";
import UpdateCustomerModel from "../Models/updateCustomerModel";
import { useState } from "react";
import RemoveCustomerModel from "../Models/RemoveCustomerModel";

const SalerTable = ({ data, page, size, onPageChange, pageSize }) => {
  const [updateModel, setUpdateModel] = useState(false);
  const [removeModel, setRemoveModel] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleUpdateClose = () => {
    setUpdateModel(false);
  };
  const handleRemoveClose = () => {
    setRemoveModel(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "saler-id-column--cell",
    },
    {
      field: "salerName",
      headerName: "Saler Name",
      flex: 1,
      cellClassName: "salerName-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "email-column--cell",
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
        const handleEdit = () => {
          // Handle edit button click for this row
          setUpdateModel(true);
          setFormData(params);
        };

        const handleRemove = () => {
          setRemoveModel(true);
          setFormData(params);
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
    ({
      id,
      attributes: { salerName, email, personType, country, mobile },
    }) => ({
      id,
      salerName,
      email,
      personType,
      country,
      mobile,
    })
  );

  return (
    <Box m="20px">
      <Header title="Saler" subtitle="List of Salers" />
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
        {updateModel && (
          <UpdateCustomerModel
            modelOpen={updateModel}
            data={formData}
            handleClose={handleUpdateClose}
          />
        )}
        {removeModel && (
          <RemoveCustomerModel
            modelOpen={removeModel}
            data={formData}
            handleClose={handleRemoveClose}
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

export default SalerTable;
