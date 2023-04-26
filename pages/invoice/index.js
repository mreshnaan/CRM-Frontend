import DLayout from "@/components/Layout/DLayout";
import { fectcher } from "@/lib/api";
import useSWR from "swr";
import { useState } from "react";
import InvoiceTable from "@/components/Table/InvoiceTable";

export default function invoices({ invoices }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/invoices?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    fectcher,
    {
      fallbackData: invoices,
    }
  );
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <>
      <DLayout>
        <InvoiceTable
          data={data}
          page={page}
          size={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </DLayout>
    </>
  );
}

export async function getServerSideProps() {
  const invoicesResponse = await fectcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/invoices?pagination[page]=1&pagination[pageSize]=10&populate=*`
  );
  return {
    props: {
      invoices: invoicesResponse,
    },
  };
}
