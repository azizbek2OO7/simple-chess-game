import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Anchor, Button, Container, Paper, PasswordInput, Stack, Text } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Service } from 'modules/auth'
import { IForm } from 'modules/auth/types'
import queryString from 'query-string'
import { alert } from 'utils'
import * as yup from 'yup'

const schema = yup.object({ password: yup.string().min(6).label('Password').required() })

const ResetPassword = () => {
  const { oobCode = '' } = queryString.parse(window.location.search) as unknown as { oobCode: string }

  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const form = useForm<IForm.ResetPassword>({
    initialValues: { password: '', oobCode: oobCode! },
    validate: yupResolver(schema)
  })

  const onSubmit = async ({ password, oobCode }: IForm.ResetPassword) => {
    try {
      setLoading(true)
      await Service.confirmResetPassword(oobCode, password)
      alert.success('Success! Password reset 🎉')
      navigate('/auth/login')
    } catch (err: any) {
      alert.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} sx={{ textAlign: 'center' }}>
          Reset password
        </Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <PasswordInput label="Password" placeholder="Your new password" radius="md" {...form.getInputProps('password')} />
            <Button loading={loading} type="submit" radius="xl">
              Reset
            </Button>
            <Anchor component="button" type="button" color="dimmed" onClick={() => navigate('/auth/login')} size="xs">
              Login
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default ResetPassword
