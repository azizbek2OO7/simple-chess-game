import React from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Button, Container, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Service } from "modules/auth";
import { IForm } from "modules/auth/types";
import { alert } from "utils";
import * as yup from "yup";

const schema = yup.object({ email: yup.string().email().label("Email").required() });

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<IForm.ForgotPassword>({
    initialValues: { email: "" },
    validate: yupResolver(schema),
  });

  const onSubmit = async ({ email }: IForm.ForgotPassword) => {
    try {
      setLoading(true);
      await Service.sendResetPassword(email);

      alert.success("We sent reset password link your inbox 📥");
    } catch (err: any) {
      alert.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} sx={{ textAlign: "center" }}>
          Forgot password
        </Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput label="Email" placeholder="Your email address" radius="md" {...form.getInputProps("email")} />
            <Button loading={loading} type="submit" radius="xl">
              Send
            </Button>
            <Anchor component="button" type="button" color="dimmed" onClick={() => navigate("/auth/login")} size="xs">
              Login
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
