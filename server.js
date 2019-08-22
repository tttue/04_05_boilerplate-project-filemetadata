'use strict';
/*
	npm install express cors multer body-parser
*/
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');// https://www.npmjs.com/package/multer
// require and use "multer"...

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
	res.json({ greetings: "Hello, API" });
});

var upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse', upload.single("upfile"), (req, res, next) => {
	const file = req.file;
	if (!file) {
		res.json({ error: -1, errorMsg: "No file selected" });
	} else {
		res.json({ name: file.originalname, type: file.mimetype, size: file.size });
	}
});

const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port)
});