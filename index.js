const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongo = require("./db.js")
const usersSchema = require('./Models/UserFiles.js')
const user2022 = require('./Models/User.js')
const cors = require('cors')
const auth = require('./Middleware/auth')
const app = express()
const PORT = process.env.PORT || 4000;
const router = require("./Routes/FormData.js")
const cookieParser = require('cookie-parser')
const path = require('path')


const corsOptions = {
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true, // This is important for cookies
    methods: ["GET", "POST", "DELETE"],
};
console.log(corsOptions)

app.use(bodyParser.urlencoded({ extended: true }));
mongo()
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.json())

// app.use('/api/formData', router)

app.post('/form', async (req, res) => {
    const { roll, Name1 } = req.body
    // const rollNo = roll.toUpperCase()
    // const dob = Name1.toUpperCase()
    let rollNo = req.body.roll;
    let dob = req.body.Name1;
    try {
        let token;
        // const checkName = await usersSchema.findOne({ DOB: dob }, {})
        //    const checkRoll1 = await user2022.findOne({ RollNo: rollNo }, {})
        // const checkName1 = await user2022.findOne({ DOB: dob }, {})

        // console.log(checkRoll1.id)
        // console.log(checkName1.id)
        // console.log(rollNo)
        if (!rollNo || !dob) {
            const response = {
                auth: "notexist"
            }
            return res.json(response)
        }
        const checkRoll = await usersSchema.findOne({ RollNo: rollNo }, {})
        if (checkRoll) {
            if (checkRoll.DOB === dob) {
                token = await checkRoll.generateAuthToken();
                console.log(token);
                res.cookie("jwt", token, {
                    secure: true,
                    sameSite: 'none',

                })
            }
        }
        else if (!rollNo || !dob) {
            const response = {
                auth: "notexist"
            }
            return res.json(response)
        }
        const checkRoll1 = await user2022.findOne({ RollNo: rollNo }, {})
        if (checkRoll1) {
            if (checkRoll1.DOB === dob) {
                token = await checkRoll1.generateAuthToken1();
                // console.log(token);
                res.cookie("jwt", token, {

                    secure: true,
                    sameSite: 'none',

                })
            }
        }
        if (checkRoll) {
            if (checkRoll.DOB === dob) {
                const response = {
                    auth: "exist",
                    username: checkRoll.Name,
                }

                res.json(response);
            }
            else {
                const response = {
                    auth: "notexist"
                }
                res.json(response);
            }
        }

        else if (checkRoll1) {
            if (checkRoll1.DOB === dob) {
                const response = {
                    auth: "notexist2",
                    username: checkRoll1.Name,
                }

                res.json(response);
            }
            else {
                const response = {
                    auth: "notexist2"
                }
                res.json(response);
            }
        }
        else {
            const response = {
                auth: "notexist2"
            }
            return res.json(response)
        }
    }

    catch (err) {
        console.log(err)
    }
})

app.get('/', auth, (req, res) => {
    res.send(req.user)
    // console.log(req.user) ;
})

app.get('/logout', (req, res) => {
    console.log("fetched logout")
    res.clearCookie("jwt", {
        path: '/',
        secure: true,
        sameSite: 'none',
    });
    res.status(200).send('User Logout');

})

app.listen(PORT, () => {
    console.log("PORT connected")
})
