var express    = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var path       = require('path');
// Define configuration file (using nconf)
var config     = require('./app/config');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Confugurate handlebars
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'header',
    layoutsDir: path.join(__dirname, config.get('hbs:layouts'))
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, config.get('hbs:views')));


// Include routes
require('./app/routes')(app);


// 404 error
app.use(function(req, res, next) {
    res.send('404: Not Found');
    next();
});


app.listen(config.get('port'), function () {
    console.log('app start at ' + config.get('port') + ' port');
});
