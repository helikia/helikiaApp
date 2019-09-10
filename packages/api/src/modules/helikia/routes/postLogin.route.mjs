import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../../../config/server';

// const { auth: { jwtSecret } } = config;

export default {
//   method: 'POST',
//   path: '/auth/login',
//   config: {
//     auth: false,
//     validate: {
//       payload: Joi.object().keys({
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//       }),
//       query: Joi.object().keys({
//         redirectTo: Joi.string(),
//       }),
//     },
//   },
//   async handler(req) {
//     const { email, password } = req.payload;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await req.server.plugins.mongodb.User.findOne({ email, password: hashedPassword });

//     if (!user) {
//       return Boom.unauthorized('invalidEmailOrPassword');
//     }

//     const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '3h' });
//     return { token };
//   },
};
