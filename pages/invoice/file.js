import DLayout from "@/components/Layout/DLayout";
import { Formik, Form } from "formik";

const initialValues = {
  customerName: "",
  amount: "",
  paidReceipt: null,
  invoiceId: "",
};

export default function Files({}) {
  const handleSubmit = async (values) => {
    const { paidReceipt, invoiceId } = values;
    console.log("paid receipt : ", paidReceipt);

    // Upload the file
    const formData = new FormData();
    formData.append("files", paidReceipt);
    formData.append("ref", invoiceId);
    formData.append("refId", invoiceId);
    const uploadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedFiles = await uploadResponse.json();
    const uploadedFileUrl = uploadedFiles[0].url;
    alert(uploadedFileUrl);

    // Associate the image with the invoice
    await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/image-uploads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { Paid: uploadedFileUrl, invoice: invoiceId },
      }),
    });
    alert("Done");

    // Handle successful submission
  };

  return (
    <>
      <DLayout>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="invoiceId">Invoice ID</label>
                <input
                  type="text"
                  name="invoiceId"
                  value={values.invoiceId}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFieldValue("invoiceId", value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="paidReceipt">Paid Receipt</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("paidReceipt", file);
                  }}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </DLayout>
    </>
  );
}
