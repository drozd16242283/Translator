var indexController = require('./controller/indexController');

module.exports = function(app) {
    app.get('/', indexController.renderIndexPage);
    app.post('/', indexController.translate);
};
