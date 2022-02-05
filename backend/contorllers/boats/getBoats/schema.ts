import joi from 'joi';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const validateSchema = (req: VercelRequest, res: VercelResponse) => {
  const validation = joi
    .object()
    .keys({
      query: joi
        .object()
        .keys({
          search: joi.string().allow('').required(),
          startDate: joi.string().isoDate().required(),
          endDate: joi.string().isoDate().required(),
          sailors: joi.number().integer().min(1).required(),
        })
        .required(),
    })
    .required()
    .validate({ query: req.query });

  if (validation.error) {
    res.status(400).json({ errors: validation.error.details });
  }
};

export default validateSchema;
