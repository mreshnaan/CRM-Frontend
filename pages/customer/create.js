import DLayout from "@/components/Layout/DLayout";
import CustomerForm from "@/components/Form/CustomerForm";
import { useState } from "react";
import { fectcher } from "@/lib/api";
import toast from "react-hot-toast";

export default function CreateCustomers() {

  const handleFormData = async (values) => {
    try {
      await fectcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            fName: values.firstName,
            lName: values.lastName,
            personType: values.personType,
            country: values.country,
            mobile: values.mobile,
            address: values.address,
          },
        }),
      });
      toast.success("Successfully Created");
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
