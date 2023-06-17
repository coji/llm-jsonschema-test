import { Center } from '@chakra-ui/react'
import { json, type LoaderArgs } from '@remix-run/node'
import { requireUser } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request)
  return json({ user })
}

export default function IndexPage() {
  return <Center>hoge</Center>
}
