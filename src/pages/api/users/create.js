import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
    const {email, firstName, lastName, country, phoneNumber, avatar, role} = req.body.data
    return req.db
    .collection('users')
    .insertOne({
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        avatar,
        role,
    })
    .then((user) => {
        // console.log(user)
        res.send({
            state: 'ok',
            message: 'Create successfully',
            user: user.ops[0]
        })
    })
})

export default handler;