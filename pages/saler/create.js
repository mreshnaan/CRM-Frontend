import DLayout from "@/components/Layout/DLayout";
import SalerForm from "@/components/Form/SalerForm";
import fectcher from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useFetchUser } from "@/lib/Context/auth";
import { useEffect } from "react";

export default function CreateSalers() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);

  const handleFormData = async (values) => {
    try {
      await fectcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/salers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            salerName: values.salerName,
            email: values.email,
            personType: values.personType,
            country: values.country,
            mobile: values.mobile,
            address: values.address,
          },
        }),
      });
      toast.success("Successfully Created");
      history.push("/saler");
    } catch (error) {
      toast.error(error);
      console.error("error with request", error);
    }
  };

  return (
    <>
      <DLayout>
        <SalerForm setFromData={handleFormData} />
      </DLayout>
    </>
  );
}
