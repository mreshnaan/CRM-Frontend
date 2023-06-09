import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Typography, Button, TextField } from "@mui/material";
import { setToken } from "../../lib/auth";
import Link from "next/link";
import { toast } from "react-hot-toast";

const Login = () => {
  const LoginSchema = Yup.object().shape({
    identifier: Yup.string().required("User Name Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      if (!values.identifier || !values.password) {
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
        toast.success("Successfully Login");
      } else {
        const error = await response.json();
        console.log(error)
        throw new Error(error.error.message);
      }
    } catch (error) {
      toast.error(error.message);
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
