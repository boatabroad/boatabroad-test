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
          photos: joi.array().min(1).items(joi.string()).required(),
          title: joi.string().required(),
          subtitle: joi.string().required(),
          boatType: joi.string().required(),
          size: joi.number().min(0).required(),
          crew: joi.number().min(0).required(),
          city: joi.string().required(),
          beach: joi.string().required(),
          description: joi.string().required(),
          price: joi.object().keys({
            rentBy: joi.string().valid('Hour', 'Day').required(),
            amount: joi.number().min(0).required(),
            currency: joi.string().valid('USD', 'MXN').required(),
          }),
          minimumTime: joi.number().min(0).required(),
          damageDeposit: joi.number().min(0).required(),
          sailors: joi.number().min(0).required(),
          includesFood: joi.boolean().required(),
          includesDrinks: joi.boolean().required(),
          bathrooms: joi.number().min(0).required(),
          bedrooms: joi.number().min(0).required(),
          hasKitchen: joi.boolean().required(),
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
