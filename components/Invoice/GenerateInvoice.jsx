import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateInvoicePDF(invoiceData) {
  const {
    invoiceNumber,
    customerName,
    customerDetails,
    salerDetails,
    salerName,
    salesCode,
    shipmentDetails,
    today,
    items,
  } = invoiceData;

  console.log("invoice data :- ", invoiceData);

  const doc = new jsPDF();
  const img = new Image();

  img.onload = function () {
    const logoWidth = 50; // change this to the desired width
    const logoHeight = logoWidth / (img.width / img.height);
    const x = 10;
    const y = 10;
    doc.addImage(img, "JPEG", x, y, logoWidth, logoHeight);

    autoTable(doc, {
      body: [
        [
          {
            content: "Invoice",
            styles: {
              halign: "right",
              fontSize: 24,
              textColor: "#3366ff",
            },
          },
        ],
        [
          {
            content: `Invoice number: ${invoiceNumber}`,
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: `Sale code: ${salesCode}`,
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: `Purchase date:${today}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: `Billed to:\n${customerName}\n${customerDetails.address}\n${customerDetails.mobileNumber}`,
            styles: {
              halign: "left",
            },
          },
          {
            content: `From:\n${salerName}\n${salerDetails.address}\n${salerDetails.mobileNumber}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Shipment Details",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    const shipmentDetailsArray = [
      [
        shipmentDetails.portOfShipment,
        shipmentDetails.portOfDelivery,
        shipmentDetails.dateOfShipment,
        shipmentDetails.paymentTerms,
        new Date(shipmentDetails.dateOfExpire).toLocaleDateString(),
        new Date(shipmentDetails.latestShipmentDate).toLocaleDateString(),
      ],
    ];

    autoTable(doc, {
      head: [
        [
          "Port Of Shipment ",
          "Port Of Delivery",
          "Date Of Shipment",
          "Payment Terms",
          "Date of Expire",
          "Latest Shipment Date      ",
        ],
      ],
      body: shipmentDetailsArray,
      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Products & Services",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [["Stock ID", "Description", "Freight", "FOB Price"]],
      body: items.map((item) => [
        item?.itemCode,
        `${item?.name}\n\n MAKE ${item?.make}\n\n MODEL ${item?.model}\n\n YEAR ${new Date(item?.year).getFullYear()} \n\n ENGINE CC ${item?.engine}\n\n CHSSISS NO ${item?.chssiss}\n`,
        item?.freight,
        item?.price,
      ]),
      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Freight:",
            styles: {
              halign: "right",
            },
          },
          {
            content: `$${items?.reduce(
              (total, item) => total + item?.freight,
              0
            )}`,
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: "FOB :",
            styles: {
              halign: "right",
            },
          },
          {
            content: `$${items?.reduce(
              (total, item) => total + item?.price,
              0
            )}`,
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: "Total Amount:",
            styles: {
              halign: "right",
            },
          },
          {
            content: `$${items.reduce(
              (total, item) => total + item?.freight + item?.price,
              0
            )}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };
  img.crossOrigin = "";
  img.src = "/logo.png"; // change this to the path of your image
}
