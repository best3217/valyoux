import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 

const handler = nextConnect();
handler.use(middleware);

handler.post((req, res) => {
    const { data, role, uid } = req.body;

    return req.db.collection('users')
        .findAndModify(
            { _id: new ObjectId(uid) }, [], 
            { $push: {role: role}},
            {new: true})
        .then((_user) => {
            req.db
            .collection(role)
            .insertOne(({
                data,
                uid: new ObjectId(uid)
            })).then(() => {
                res.status(200).send({
                    status: 'ok',
                    message: 'Submit success',
                    user: _user.value
                });
            })
        })
        .catch(err => console.log(err))
})

export default handler;