import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
    const { uid } = req.query;
    console.log(uid)
    return req.db
    .collection('users')
    .deleteOne({"_id": new ObjectId(uid)})
    .then(() => {
        res.send({
            state: 'ok',
            message: 'Delete successfully'
        })
    })
})

export default handler;