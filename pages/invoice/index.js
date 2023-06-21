/* eslint-disable react-hooks/rules-of-hooks */
import DLayout from "@/components/Layout/DLayout";
import fectcher from "@/lib/api";
import useSWR from "swr";
import { useEffect, useState } from "react";
import InvoiceTable from "@/components/Table/InvoiceTable";
import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";

export default function invoices({ invoices }) {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);

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
