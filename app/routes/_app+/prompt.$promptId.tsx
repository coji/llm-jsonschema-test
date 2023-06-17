import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { zx } from 'zodix'
import { getPrompt } from '~/models/prompt.server'
import { schema } from '~/schemas/prompt'
import { requireUser } from '~/services/auth.server'

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  const { promptId } = zx.parseParams(params, { promptId: zx.NumAsString })
  const prompt = await getPrompt(promptId, user.id)
  return json({ prompt })
}

export default function PromptDetailPage() {
  const { prompt } = useLoaderData<typeof loader>()
  const [form, { title, body }] = useForm({
    onValidate: ({ formData }) => parse(formData, { schema }),
    defaultValue: prompt,
    shouldValidate: 'onBlur',
  })

  return (
    <HStack>
      <Form method="POST" {...form.props}>
        <Stack>
          <FormControl isInvalid={!!title.error}>
            <FormLabel>Title</FormLabel>
            <Input name={title.name}></Input>
            <FormErrorMessage>{title.error}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!body.error}>
            <FormLabel>Prompt</FormLabel>
            <Textarea name={body.name}></Textarea>
            <FormErrorMessage>{body.error}</FormErrorMessage>
          </FormControl>

          <HStack>
            <Button as={Link} to="..">
              Cancel
            </Button>

            <Spacer />
            <Button type="submit" colorScheme="blue">
              Create
            </Button>
          </HStack>
        </Stack>
      </Form>
    </HStack>
  )
}
