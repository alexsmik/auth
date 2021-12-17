const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000
console.log(PORT)
const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try { // user user1 password user1
        await mongoose.connect(`mongodb+srv://user1:user1@cluster0.ryrmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}
start();