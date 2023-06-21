import Login from "@/components/Auth/Login";
import { useEffect } from "react";

import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";

export default function Home() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && user) {
      history.replace("/dashboard");
    } else {
      <span style={{ color: "red" }}>Loading</span>;
    }
  }, [loading, user, history]);
  return (
    <>
      <Login />
    </>
  );
}
