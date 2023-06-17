import { Button, Center } from '@chakra-ui/react'
import { json, type LoaderArgs } from '@remix-run/node'
import { Link, useNavigation } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, { successRedirect: '/' })
  return json({})
}

export default function LoginPage() {
  const navigation = useNavigation()

  return (
    <Center>
      <Button
        as={Link}
        to="/auth/google"
        variant="outline"
        colorScheme="blue"
        isLoading={
          navigation.state !== 'idle' &&
          navigation.location.pathname === '/auth/google'
        }
      >
        Sign in
      </Button>
    </Center>
  )
}
