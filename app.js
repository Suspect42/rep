const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const verifyRoute = require('./routes');
const requests = require('./requests');

var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET

app.get('/api/:id', function (req, res) {
    const id = req.params.id;
    res.send(verifyRoute.verifyRoute1(id));
});

app.get('/api/:id1/:id2', function (req, res) {
    const id1 = req.params.id1;
    const id2 = req.params.id2;

    verifyRoute.verifyRoute2(id1, id2, function () {
        requests.refreshToken(function () {
            requests.getBaree(function (data) {
                res.send(data);
            });
        });
    });
});

//POST

app.post('', function (req, res) {

});



//LISTEN

app.listen(port, function () {
    console.log('Server running on port ' + port);
});