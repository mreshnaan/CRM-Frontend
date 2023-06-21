import Register from "@/components/Auth/Register";
import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && user) {
      history.replace("/dashboard");
    }
  }, [loading, user, history]);
  return (
    <>
      <Register />
    </>
  );
}
