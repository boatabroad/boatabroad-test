import joi from 'joi';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const validateSchema = (req: VercelRequest, res: VercelResponse) => {
  const validation = joi
    .object()
    .keys({
      body: joi
        .object()
        .keys({
          amount: joi.number().positive().required(),
          id: joi.string().required(),
        })
        .required(),
    })
    .required()
    .validate({ body: req.body });

  if (validation.error) {
    res.status(400).json({ errors: validation.error.details });
  }
};

export default validateSchema;
