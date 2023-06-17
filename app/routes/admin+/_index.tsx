import { Container } from '@chakra-ui/react'
import { json, type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/',
  })
  return json({ user })
}

export default function AdminIndexPage() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <Container
      maxW="container.md"
      display="grid"
      minH="100dvh"
      gridTemplateRows="auto 1fr"
    >
      {JSON.stringify(user, null, 2)}
    </Container>
  )
}
