import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Typography, Button, TextField } from "@mui/material";
import { setToken } from "../../lib/auth";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";

const Login = () => {
  const { user, loading } = useFetchUser();
  const history = useRouter();

  useEffect(() => {
    if (!loading && user) {
      history.replace("/dashboard");
    }
  }, [loading, user, history]);

  const LoginSchema = Yup.object().shape({
    identifier: Yup.string().required("User Name Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      if (!values.identifier || !values.email || !values.password) {
        setLoginError("Please fill all fields");
        setSubmitting(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: values.identifier,
            password: values.password,
          }),
        }
      );
      if (response.ok) {
        const userData = await response.json();

        setToken(userData);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
      toast.success("Successfully Login");
    } catch (error) {
      toast.error("Invalid Username or password");
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "#141b2d",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          borderRadius: "16px",
          width: "30%",
          p: "60px",
          pt: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            margin: "2rem 0",
            color: "black",
          }}
        >
          Login
        </Typography>
        <Formik
          initialValues={{
            identifier: "",
            email: "",
            password: "",
            touched: {},
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <Field
                as={TextField}
                name="identifier"
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.identifier}
                error={touched.identifier && !values.identifier}
                helperText={
                  touched.identifier && !values.identifier
                    ? errors.identifier
                    : ""
                }
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={touched.email && !values.email}
                helperText={touched.email && errors.email ? errors.email : ""}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={touched.password && errors.password ? true : false}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                sx={{ mt: 3, mb: 2, p: 2, fontSize: "0.9rem" }}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
              <Link
                style={{
                  color: "blue",
                  fontSize: "0.9rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  letterSpacing: "0.1rem",
                }}
                href={"/register"}
              >
                Register
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
