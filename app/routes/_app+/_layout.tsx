import { Container } from '@chakra-ui/react'
import { Outlet } from '@remix-run/react'
import { AppFooter, AppHeader } from '~/components'

export default function IndexPage() {
  return (
    <>
      <Container
        maxW="container.md"
        display="grid"
        gridTemplateRows="auto 1fr auto"
        minH="100dvh"
      >
        <AppHeader />
        <Outlet />
        <AppFooter />
      </Container>
    </>
  )
}
