import type { FlexProps } from '@chakra-ui/react'
import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { Link } from '@remix-run/react'
import { AppLoginPane } from './AppLoginPane'

type AppHeaderProps = FlexProps
export const AppHeader = ({ ...rest }: AppHeaderProps) => {
  return (
    <Flex {...rest}>
      <Heading
        transition="all"
        transitionDuration="1000ms"
        py="2"
        textAlign="center"
      >
        <Link to="/">LLM JSON Schema Test</Link>
      </Heading>

      <Spacer />
      <AppLoginPane py="2" />
    </Flex>
  )
}
