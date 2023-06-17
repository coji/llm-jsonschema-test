import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Stack,
} from '@chakra-ui/react'
import { defer, type LoaderArgs } from '@remix-run/node'
import { Await, Link, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { listPrompts } from '~/models/prompt.server'
import { requireUser } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request)
  const prompts = listPrompts(user.id)
  return defer({ user, prompts })
}

export default function IndexPage() {
  const { prompts } = useLoaderData<typeof loader>()
  return (
    <Stack>
      <Button as={Link} to="prompt/new">
        New
      </Button>

      <Suspense>
        <Await resolve={prompts}>
          {(prompts) => (
            <Grid gap="4">
              {prompts.length === 0 ? (
                <Box>No prompts</Box>
              ) : (
                prompts.map((prompt) => (
                  <Card as={Link} to={`prompt/${prompt.id}`} key={prompt.id}>
                    <CardHeader>{prompt.title}</CardHeader>
                    <CardBody></CardBody>
                  </Card>
                ))
              )}
            </Grid>
          )}
        </Await>
      </Suspense>

      <Outlet />
    </Stack>
  )
}
