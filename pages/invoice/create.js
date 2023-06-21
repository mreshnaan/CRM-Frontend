import DLayout from "@/components/Layout/DLayout";
import InvoiceForm from "@/components/Form/InvoiceForm";
import fectcher from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useFetchUser } from "@/lib/Context/auth";
import { useEffect } from "react";

export default function CreateInvoice() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);
  const handleCraeteInvoice = async (data) => {
    console.log("handleCraeteInvoice ", data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/invoices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              customer: data.customerDetails.customerId,
              saler: data.salerDetails.salerId,
              salesCode: data.salesCode,
              invoiceNumber: data.invoiceNumber,
              items: data.items,
              payments: data.payments,
              shipmentDetails: data.shipmentDetails,
            },
          }),
        }
      );

      if (response.ok) {
        toast.success("Successfully Created");
        history.push("/invoice");
      } else {
        const error = await response.json();
        throw new Error(error.error.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("error with request", error);
    }
  };
  return (
    <>
      <DLayout>
        <InvoiceForm
          handleInvoice={handleCraeteInvoice}
        />
      </DLayout>
    </>
  );
}

