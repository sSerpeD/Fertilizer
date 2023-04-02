const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt')
const dbConnection = require('./database')
const { body, validationResult} = require('express-validator')
const router = require('./routes/myRouter')
const app = express()

app.use(express.urlencoded({ extended: false }))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000
}))

const ifNotLoggedIn = (req, res ,next) => {
    if (!req.session.isLoggedIn) {
        return res.render('index.ejs');
    }
    next();
}

const ifLoggedIn = (req, res ,next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/home');
    }
    next();
}

//root page
app.get('/', ifNotLoggedIn,(req,res,next)=>{
    dbConnection.execute("SELECT name FROM users WHERE id = ?", [req.session.userID])
    .then(([rows]) => {
        res.render('home.ejs', {
            name: rows[0].name
        })
    })
})

// Register Page
app.post('/register', ifLoggedIn, [
    body('user_card', 'กรอกเลขบัตรผิด!').isLength({min: 13}).custom((value) => {
        return dbConnection.execute('SELECT user_card FROM users WHERE user_card = ?', [value])
        .then(([rows]) => {
            if (rows.length > 0) {
                return Promise.reject("เลขบัตรนี้ถูกใช้ไปแล้ว!");
            }
            return true;
        })
    }),
    body('user_pass', 'รหัสผ่านควรมีอย่างน้อย 6 ตัว').trim().isLength( {min: 6}),
], (req, res, next) => {
        console.log('Request received:', req.body);
        const validation_result = validationResult(req);
        const { user_card, user_pass } = req.body;

        console.log('Validation result:', validation_result);

        if (validation_result.isEmpty()) {
            bcrypt.hash(user_pass, 12).then((hash_pass) => {
                dbConnection.execute("INSERT INTO users (card_id, password) VALUES(?, ?)", [user_card, hash_pass])
                .then(result => {
                    console.log('User data inserted successfully:', result);
                    res.send('สร้างบัญชีเรียบร้อยแล้ว');
                }).catch(err => {
                    console.error('Error inserting user data:', err);
                    if (err) throw err;
                })
            }).catch(err => {
                console.error('Error hashing password:', err);
                if (err) throw err;
            })
        } else {
            let allErrors = validation_result.errors.map((error) => {
                return error.msg;
            })

            res.render('index.ejs', {
                register_error: allErrors,
                old_data: req.body
            });
        }
    })


app.use(router)
app.use(express.static(__dirname + '/public'));

app.listen(3000,()=>{
    console.log("start server at 3000")
})