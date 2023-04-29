import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../theme";
import Header from "../HeaderTitle";
import { useState } from "react";
import UpdateInvoiceModel from "../Models/UpdateInvoiceModel";
import RemoveInvoiceModel from "../Models/RemoveInvoiceModel";
import ViewInvoiceModel from "../Models/ViewInvoiceModel";

const InvoiceTable = ({ data, page, size, onPageChange, pageSize }) => {
  const [viewModel, setViewModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [removeModel, setRemoveModel] = useState(false);
  const [tableData, setTableData] = useState(null);

  const handleViewClose = () => {
    setViewModel(false);
  };

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
      headerName: "Total",
      flex: 1,
      renderCell: (params) =>
        params.value.reduce((total, item) => {
          return total + parseFloat(item.price || 0);
        }, 0),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const handleView = (param) => {
          // Handle edit button click for this row
          setViewModel(true);
          setTableData(param.row);
        };
        const handleEdit = (param) => {
          // Handle edit button click for this row
          setUpdateModel(true);
          setTableData(param.row);
        };

        const handleRemove = (param) => {
          setRemoveModel(true);
          setTableData(param.row);
        };
        return (
          <div>
            <IconButton
              sx={{ color: `${colors.grey[500]} !important` }}
              onClick={() => {
                handleView(params);
              }}
            >
              <ViewIcon />
            </IconButton>
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
      <Header title="Customer Invoices" subtitle="List of Customer Invoice" />
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
        {viewModel && (
          <ViewInvoiceModel
            modelOpen={viewModel}
            data={tableData}
            handleClose={handleViewClose}
          />
        )}
        {updateModel && (
          <UpdateInvoiceModel
            modelOpen={updateModel}
            data={tableData}
            handleClose={handleUpdateClose}
          />
        )}
        {removeModel && (
          <RemoveInvoiceModel
            modelOpen={removeModel}
            data={tableData}
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

export default InvoiceTable;
