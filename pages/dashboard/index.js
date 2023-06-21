import DLayout from "@/components/Layout/DLayout";
import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);

  return (
    <>
      <DLayout>Dashboard</DLayout>
    </>
  );
}
