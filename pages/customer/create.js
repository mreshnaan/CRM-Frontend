import DLayout from "@/components/Layout/DLayout";
import CustomerForm from "@/components/Form/CustomerForm";
import fectcher from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useFetchUser } from "@/lib/Context/auth";
import { useEffect } from "react";

export default function CreateCustomers() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);

  const handleFormData = async (values) => {
    try {
      await fectcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            customerName: values.customerName,
            email: values.email,
            personType: values.personType,
            country: values.country,
            mobile: values.mobile,
            telephone: values.telephone,
            address: values.address,
          },
        }),
      });
      toast.success("Successfully Created");
      history.push("/customer");
    } catch (error) {
      toast.error(error);
      console.error("error with request", error);
    }
  };

  return (
    <>
      <DLayout>
        <CustomerForm setFromData={handleFormData} />
      </DLayout>
    </>
  );
}
