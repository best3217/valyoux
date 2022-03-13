import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post((req, res) => {
    const { email, password, firstName, lastName, phoneNumber, birthDay, country, avatar } = req.body;
    return req.db
      .collection('users')
      .countDocuments({ email })
      .then((count) => {
        if (count) {
          return Promise.reject(Error('The email has already been used.'));
        }
        return bcrypt.hashSync(password);
      })
      .then(hashedPassword => req.db.collection('users').insertOne({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        birthDay,
        country,
        avatar,
        role: ['investor']
      }))
      .then(() => {
        res.status(200).send({
          status: 'ok',
          message: 'User signed up successfully',
        });
      })
      .catch(error => res.send({
        status: 'error',
        message: error.toString(),
      }));
  });
  
  export default handler;