import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma = new PrismaClient()

app.post('/users', async (c) => {
  const body = await c.req.json()
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })
  return c.json(user)
})

app.get('/users', async (c) => {
  const users = await prisma.user.findMany()
  return c.json(users)
})

app.get('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const user = await prisma.user.findUnique({
    where: { id },
  })
  return c.json(user)
})

app.put('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return c.json(user)
})

app.delete('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))

  await prisma.user.delete({
    where: { id },
  })

  return c.json({ message: 'User deleted' })
})

export default app
