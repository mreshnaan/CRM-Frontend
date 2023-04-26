import * as React from "react";
import {
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
} from "@mui/material";

// Define the styled components
const InvoiceContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontFamily: "Arial, sans-serif",
  color: "black",
  width: "5.5in",
});

const InvoicePage = styled("div")({
  width: "100%",
});

const InvoiceHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "2rem",
});

const InvoiceContent = styled("div")({
  marginBottom: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const InvoiceTable = styled(TableContainer)(({ theme }) => ({
  height: "auto", // Set height to "auto"
  marginBottom: "2rem",
  marginTop: "2rem",
  boxShadow: theme.shadows[2],
  overflow: "hidden", // add this line to hide the bars
}));

const InvoiceTotal = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const LogoImage = styled("img")({
  height: "3rem",
  width: "25%",
  marginRight: "1rem",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Define the invoice page component
export default function Invoice({ data }) {
  console.log("data : ", data);
  const { invoiceNumber, customerName, address, today, mobileNumber, items } =
    data;
  // Calculate the total cost of all items
  const totalCost = items.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );

  return (
    <InvoiceContainer>
      <InvoicePage>
        <InvoiceHeader>
          <LogoImage src={"./next.svg"} alt="logo" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Typography variant="h4">Invoice</Typography>
            <Typography variant="subtitle1">{invoiceNumber}</Typography>
          </div>
        </InvoiceHeader>
        <InvoiceContent>
          <div>
            <Typography variant="h6">{customerName}</Typography>
            <Typography variant="subtitle1">{address}</Typography>
            <Typography variant="subtitle1">{today}</Typography>
            <Typography variant="subtitle1">{mobileNumber}</Typography>
          </div>
          <InvoiceTable component={Paper}>
            <Table>
              <StyledTableHeader>
                <TableRow>
                  <StyledTableCell>Item Code</StyledTableCell>
                  <StyledTableCell>Item Description</StyledTableCell>
                  <StyledTableCell align="right">Item Price</StyledTableCell>
                </TableRow>
              </StyledTableHeader>
              <TableBody>
                {items.map((item) => (
                  <StyledTableRow key={item.itemCode}>
                    <StyledTableCell>{item.itemCode}</StyledTableCell>
                    <StyledTableCell>{item.description}</StyledTableCell>
                    <StyledTableCell align="right">
                      ${parseFloat(item.price)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </InvoiceTable>
          <InvoiceTotal>
            <Typography variant="h6">
              Total: ${parseFloat(totalCost)}
            </Typography>
          </InvoiceTotal>
        </InvoiceContent>
      </InvoicePage>
    </InvoiceContainer>
  );
}
