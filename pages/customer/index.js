import DLayout from "@/components/Layout/DLayout";
import CustomerTable from "@/components/Table/CustomerTable";
import { fectcher } from "@/lib/api";
import useSWR from "swr";
import { useState } from "react";

export default function Customers({ customers }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    fectcher,
    {
      fallbackData: customers,
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
        <CustomerTable
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
  const customersResponse = await fectcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/customers?pagination[page]=1&pagination[pageSize]=10`
  );
  return {
    props: {
      customers: customersResponse,
    },
  };
}
