import joi from 'joi';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const validateSchema = (req: VercelRequest, res: VercelResponse) => {
  const validation = joi
    .object()
    .keys({
      query: joi
        .object()
        .keys({
          userId: joi.string().required(),
        })
        .required(),
      body: joi
        .object()
        .keys({
          role: joi.string().valid('tenant', 'owner').required(),
        })
        .required(),
    })
    .required()
    .validate({ body: req.body, query: req.query });

  if (validation.error) {
    res.status(400).json({ errors: validation.error.details });
  }
};

export default validateSchema;
