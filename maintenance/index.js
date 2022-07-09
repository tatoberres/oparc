require('dotenv').config();

const multer  = require('multer')

const app = require('./app');

const bodyParser = multer();
app.use(bodyParser.none());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.dir(`Server started on http://localhost:${PORT}`);
})