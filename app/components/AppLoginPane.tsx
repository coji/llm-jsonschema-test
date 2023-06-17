import type { StackProps } from '@chakra-ui/react'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, useNavigation } from '@remix-run/react'
import { useSessionUser } from '~/hooks/use-session-user'

export const AppLoginPane = (props: StackProps) => {
  const navigation = useNavigation()
  const user = useSessionUser()

  if (!user) {
    return (
      <Stack
        direction="row"
        justify="end"
        align="center"
        fontSize="sm"
        color="gray.500"
        {...props}
      >
        <Button
          as={Link}
          to="/auth/google"
          size="sm"
          type="submit"
          variant="outline"
          isLoading={
            navigation.state !== 'idle' &&
            navigation.location.pathname === '/auth/google'
          }
        >
          Sign in
        </Button>
      </Stack>
    )
  }

  return (
    <Stack
      direction="row"
      justify="end"
      align="center"
      fontSize="sm"
      color="gray.500"
      {...props}
    >
      <Menu>
        <MenuButton>
          <Avatar size="sm" src={user.photoUrl}></Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Stack spacing="0">
              <Text>{user.displayName}</Text>
              <Text fontSize="xs">{user.email}</Text>
            </Stack>
          </MenuItem>
          <MenuDivider />
          <MenuItem as={Link} to="/auth/logout">
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}