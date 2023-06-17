import type { FlexProps } from '@chakra-ui/react'
import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { Link } from '@remix-run/react'
import { AppLoginPane } from './AppLoginPane'

type AppHeaderProps = FlexProps
export const AppHeader = ({ ...rest }: AppHeaderProps) => {
  return (
    <Flex {...rest}>
      <Heading py="2" textAlign="center" size={['md', 'xl']}>
        <Link to="/">LLM JSON Schema Test</Link>
      </Heading>

      <Spacer />
      <AppLoginPane py="2" />
    </Flex>
  )
}
