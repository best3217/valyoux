import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
    const { uid, data } = req.body;

    return req.db
    .collection('users')
    .updateOne({_id: new ObjectId(uid)}, {$set: {firstName: data.firstName, lastName: data.lastName, phoneNumber: data.phoneNumber, country: data.country, avatar: data.avatar, role: data.role}})
    .then(() => {
        res.send({
            state: 'ok',
            message: 'Update successfully'
        })
    })
})

export default handler;