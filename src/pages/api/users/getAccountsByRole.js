import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { tableName } = req.query;
    let returnAccounts = [];
    const accounts = await req.db
    .collection(tableName)
    .find({}).toArray()

    const users = await req.db
    .collection('users')
    .find({}).toArray()
    
    // console.log(users)
    // console.log(accounts)
    accounts.map((acc) => {
        users.map((user) => {
            if(String(acc.uid) === String(user._id)) {
                acc.firstName = user.firstName
                acc.lastName = user.lastName
                acc.email = user.email
                acc.avatar = user.avatar
                returnAccounts.push(acc)
            }
        })
    })

    res.send({
        state: 'ok',
        message: 'Get users Successfully',
        accounts:returnAccounts
    })
})

export default handler;