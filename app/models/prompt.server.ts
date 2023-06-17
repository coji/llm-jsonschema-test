import type { Prisma, Prompt } from '@prisma/client'
import { type User } from '@prisma/client'
import { prisma } from '~/services/database.server'

export const listPrompts = async (authorId: User['id']) => {
  return await prisma.prompt.findMany({
    where: { authorId: authorId },
  })
}

export const createPrompt = async (data: Prisma.PromptUncheckedCreateInput) => {
  return await prisma.prompt.create({ data })
}

export const getPrompt = async (id: Prompt['id'], authorId: User['id']) => {
  return await prisma.prompt.findFirstOrThrow({
    where: { authorId: authorId, id: id },
  })
}
