import joi from 'joi';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const validateSchema = (req: VercelRequest, res: VercelResponse) => {
  const validation = joi
    .object()
    .keys({
      body: joi
        .object()
        .keys({
          ownerId: joi.string().required(),
          photoUrl: joi.string().required(),
          price: joi.object().keys({
            amount: joi.number().min(0).required(),
            currency: joi.string().required(),
          }),
          title: joi.string().required(),
          subtitle: joi.string().required(),
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
