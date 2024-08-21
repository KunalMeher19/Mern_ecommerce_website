const express = require('express');
require('dotenv').config();
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
}))

app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the Home Page" });
});


// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/productRouter'));
app.use('/api',require('./routes/upload'))



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

