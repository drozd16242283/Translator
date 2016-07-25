var express    = require('express');
var bodyParser = require('body-parser');
var request    = require('request');
var urlutils   = require('url');
var handlebars = require('express-handlebars');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');




app.get('/', function(req, res) {
    res.render('main', {
        title: 'Заполните форму для перевода!'
      });
  });



app.post('/', function(req, res) {
    if (!req.body.text && req.body.text == '') {
        res.render('main', {
            title: 'Введите слово для перевода'
        });
    } else {
        var url = urlutils.format({
            protocol: 'https',
            hostname: 'translate.yandex.net',
            pathname: 'api/v1.5/tr.json/translate',
            query: {
                key: 'trnsl.1.1.20160612T104726Z.a22895cbe4a4da20.6103336416b3e450ecfe33ebd6be77041eda1969',
                lang: req.body.lang,
                text: req.body.text
            }
        });
    }

    request.get({url: url, json: true},
        function(error, response, json) {
            var data = {};

        if (error || json.code != 200) {
            data = {
                title: 'Ошибка при переводе ' + req.body.text
                //error: json.message
            }
        } else {
            data = {
                title: 'Перевод слова ' + req.body.text + ': ' + json.text
            }
        }

        res.render('main', data);

    });
});


app.listen(8000, function () {
    console.log('app start at 1337 port');
});
