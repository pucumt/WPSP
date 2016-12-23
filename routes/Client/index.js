var home = require('./home.js'),
    article = require('./article.js');
    // login = require('./login.js'),
    // logout = require('./logout.js'),
    // reg = require('./reg.js'),

//     suggest = require('./suggest.js'),
//     eng100 = require('./100Eng.js'),
//     qiniu = require('./qiniu.js');

module.exports = function(app) {
    home(app);

    article(app);
    // login(app);

    // logout(app);

    // post(app);

    // reg(app);

    

    // eng100(app);
};