var Post = require('../../models/post.js'),
    auth = require("./auth"),
    checkLogin = auth.checkLogin,
    shortid = require('shortid'),
    htmlCode = require('../../util/htmlCode.js'),
    settings = require('../../settings.js');;

module.exports = function(app) {
    var routtings = "/";
    if(settings.subWebsite!="")
    {
        routtings += settings.subWebsite;
    }
    app.get(routtings+'article/:id', function(req, res) {
        //查询并返回id的文章
        Post.getOne(req.params.id, true, function(err, post, comments) {
            if (err) {
                post = {};
            }
            post = {
                shortid: 1,
                title: "百分百音标课——四年级必修",
                price: "100",
                imgFile: "...",
                post: "test  post",
                options: ["8:00-9:00","9:00-10:00"]
            };
            res.render('Client/article.html', {
                title: '文章',
                post: post
            });
        });
    });

    //app.post('/article', checkLogin)
    app.post(routtings+'article', function(req, res) {
        var currentUser = req.session.user,
            order = {
                id: req.body.id,

            };
        res.render('Client/order.html', {
                title: '文章',
                order: order
        });
    });
}