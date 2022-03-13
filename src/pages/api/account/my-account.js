import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
    const { uid }  = req.query;
    return req.db
    .collection('users')
    .findOne({ _id: new ObjectId(uid) })
    .then((user) => res.send({
            status: 'ok',
            user: user,
          }))
})

export default handler;