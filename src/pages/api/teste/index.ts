import { NextApiRequest, NextApiResponse } from "next";

const Teste = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    data: {
      name: "liniker",
    },
  });
};

export default Teste;
