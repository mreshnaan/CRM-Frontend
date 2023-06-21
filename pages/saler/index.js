import DLayout from "@/components/Layout/DLayout";
import fectcher from "@/lib/api";
import useSWR from "swr";
import { useEffect, useState } from "react";
import SalerTable from "@/components/Table/SalerTable";
import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";

export default function Salers({ salers }) {
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/salers?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    fectcher,
    {
      fallbackData: salers,
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
        <SalerTable
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
  const salersResponse = await fectcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/salers?pagination[page]=1&pagination[pageSize]=10&populate=*`
  );
  return {
    props: {
        salers: salersResponse,
    },
  };
}
