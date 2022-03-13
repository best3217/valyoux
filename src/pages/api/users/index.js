import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { uid } = req.query;

    const users = await req.db
    .collection('users')
    .find({_id: {$ne: new ObjectId(uid)}}).toArray()

    res.send({
        state: 'ok',
        message: 'Get users Successfully',
        users:users
    })
})

export default handler;