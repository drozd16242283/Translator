var request  = require('request');
var urlutils = require('url');
var config   = require('../config/');

// get
exports.renderIndexPage = function(req, res) {
    res.render('main', {
        title: 'Заполните форму для перевода!'
      });
};

// post
exports.translate = function(req, res) {
    var url = urlutils.format({
        protocol: config.get('url:protocol'),
        hostname: config.get('url:hostname'),
        pathname: config.get('url:pathname'),
            query: {
                key: config.get('url:APIkey'),
                lang: req.body.lang,
                text: req.body.text
            }
    });

    request.get({url: url, json: true},
        function(error, response, json) {
            var data = {};

        if (error || json.code != 200) {
            data = {
                title: 'Ошибка при переводе ' + req.body.text
                //error: json.message
            };
        } else {
            data = {
                title: 'Перевод слова ' + req.body.text + ': ' + json.text
            };
        }

        res.render('main', data);

    });
};
