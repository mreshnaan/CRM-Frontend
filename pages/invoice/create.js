import DLayout from "@/components/Layout/DLayout";
import InvoiceForm from "@/components/Form/InvoiceForm";
import fectcher from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function CreateInvoice({ customers }) {
  const history = useRouter();
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
              customer: data.customerId,
              invoiceNumber: data.invoiceNumber,
              items: data.items,
              payments: data.payments,
              
            },
          }),
        }
      );

      if (response.ok) {
        toast.success("Successfully Created");
        history.push("/invoice");
      } else {
        throw new Error(`Request failed with status ${response.status}`);
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
          customersData={customers}
          handleInvoice={handleCraeteInvoice}
        />
      </DLayout>
    </>
  );
}

export async function getServerSideProps() {
  const customersResponse = await fectcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers`
  );
  return {
    props: {
      customers: customersResponse.data,
    },
  };
}
