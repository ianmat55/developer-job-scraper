const express = require('express');
const app = express();
const path = __dirname;

const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(path + 'public/css'));
app.use('/js', express.static(path + 'public/js'));
app.use('/img', express.static(path + 'public/img'));

// Set Views

app.get('/', (req, res) => {
	res.sendFile(path + '/views/index.html')
});

app.listen(port, () => {
	console.log('listening for requests on port 3000...')
});