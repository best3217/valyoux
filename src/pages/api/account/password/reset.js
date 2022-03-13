
import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';
import { nanoid } from "nanoid";
import bcrypt from 'bcryptjs';

const handler = nextConnect();

handler.use(middleware)

let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
})

handler.post( async (req, res) => {
    const { email } = req.body;

    return req.db
        .collection("users")
        .findOne({ email })
        .then(async(user) => {
            if (user) {
                const securedTokenId = nanoid(32); // create a secure reset password token
                await req.db.collection("tokens").insertOne({
                    _id: securedTokenId,
                    creatorId: user._id,
                    type: "passwordReset",
                    expireAt: new Date(Date.now() + 20 * 60 * 1000), // let's make it expire after 20 min
                });

                const mailData = {
                    to: user.email,
                    from: "no-reply@nextjs-mongodb.vercel.app",
                    subject: "Reset your password.",
                    html: `
                        <div>
                            <p>Hello, ${user.name}</p>
                            <p>Please follow <a href="${process.env.WEB_URI}/reset-password?token=${securedTokenId}">this link</a> to reset your password.</p>
                        </div>
                    `,
                }

                transporter.sendMail(mailData, (error, info) => {
                    if(error) {
                        res.send(
                            {
                                status: 'error',
                                message: error
                            }
                        )
                    }else {
                        console.log(info)
                        res.send(
                            {
                                status: 'ok',
                                message: "mail sent successfully"
                            }
                        )
                    }
                })
            }else {
                return Promise.reject(Error('The email dose not exist.'));
            }
        })
})

handler.put( async(req, res) => {

    const { token, password } = req.body

    const deletedToken = await req.db
        .collection("tokens")
        .findOneAndDelete({ _id: token });
    if(!deletedToken.value) {
        return Promise.reject(Error('Invalid token!'));
    }else {
        return req.db
          .collection("users")
          .updateOne({ _id: deletedToken.value.creatorId }, { $set: {password: bcrypt.hashSync(password)} })
          .then(() => {
            res.status(200).send({
                status: 'ok',
                message: 'Reset Password successfully',
            });
          })
    }
})

export default handler;