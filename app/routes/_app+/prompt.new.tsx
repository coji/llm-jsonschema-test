import {
  Box,
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
import { json, redirect, type ActionArgs } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { createPrompt } from '~/models/prompt.server'
import { schema } from '~/schemas/prompt'
import { requireUser } from '~/services/auth.server'

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request)

  const formData = await request.formData()
  const submission = parse(formData, { schema })

  if (!submission.value) {
    return json(submission, { status: 400 })
  }

  const prompt = await createPrompt({
    authorId: user.id,
    title: submission.value.title,
    body: submission.value.body,
  })
  return redirect(`../prompt/${prompt.id}`)
}

export default function PromptNewPage() {
  const [form, { title, body }] = useForm({
    onValidate: ({ formData }) => parse(formData, { schema }),
    shouldValidate: 'onBlur',
  })

  return (
    <Box>
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
    </Box>
  )
}
