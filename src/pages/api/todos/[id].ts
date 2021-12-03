import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const catcher = (error: Error) => res.status(400).json({ error })

  const id: string = req.query.id as string

  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(await Todo.findById(id).catch(catcher))
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(
        await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      )
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(await Todo.findByIdAndRemove(id).catch(catcher))
    },
  }

  // Verifique se há uma resposta para o método específico
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler