// export const getCustomerName = (customersData) => {
//   const customerNames = customersData?.map(
//     (customer) => customer.attributes.customerName
//   );
//   return customerNames;
// };

// export const getSalerName = (salersData) => {
//   const salerNames = salersData?.map((saler) => saler.attributes.salerName);
//   return salerNames;
// };

// export const isCheckCustomer = (fromData, customerNames) => {
//   const isCheckCustomer =
//     fromData &&
//     customerNames?.find((customer) => customer === fromData.customerName);
//   return isCheckCustomer;
// };

// export const isCheckSaler = (fromData, salerNames) => {
//   const isCheckSaler =
//     fromData && salerNames?.find((saler) => saler === fromData.salerName);
//   return isCheckSaler;
// };

export const getInitialPaymentValues = (fromData) => {
  if (fromData && Array.isArray(fromData.payments)) {
    return fromData.payments.map(
      ({ description = "", date = null, amount = "" }) => ({
        description,
        date,
        amount,
      })
    );
  }
  return [{ description: "", date: null, amount: "" }];
};

export const getInitialItemValues = (fromData) => {
  if (fromData && Array.isArray(fromData.items)) {
    return fromData.items.map(
      ({
        itemCode,
        make,
        name,
        model,
        year,
        engine,
        chssiss,
        price,
        freight = "",
        fields,
      }) => ({
        itemCode,
        make,
        name,
        model,
        year,
        engine,
        chssiss,
        price,
        freight,
        fields,
      })
    );
  }
  return [
    {
      itemCode: "",
      name: "",
      make: "",
      model: "",
      year: null,
      engine: "",
      chssiss: "",
      price: "",
      freight: "",
      fields: "",
    },
  ];
};

export const getInitialShipmentValues = (fromData) => {
  const initialShipmentDetails = fromData
    ? {
        portOfShipment: fromData?.shipmentDetails?.portOfShipment,
        portOfDelivery: fromData?.shipmentDetails?.portOfDelivery,
        dateOfShipment: fromData?.shipmentDetails?.dateOfShipment,
        paymentTerms: fromData?.shipmentDetails?.paymentTerms,
        dateOfExpire: fromData?.shipmentDetails?.dateOfExpire,
        latestShipmentDate: fromData?.shipmentDetails?.latestShipmentDate,
        status: fromData?.shipmentDetails?.status,
      }
    : {
        portOfShipment: "",
        portOfDelivery: "",
        dateOfShipment: "",
        paymentTerms: "",
        dateOfExpire: "",
        latestShipmentDate: "",
        status: "",
      };

  return initialShipmentDetails;
};
