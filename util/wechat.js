var jsSHA = require('jssha');

module.exports = function(app)
{
    app.get('/wx', function(req, res) {
        var token="weixin",
            signature = req.query.signature,
            timestamp = req.query.timestamp,
            echostr   = req.query.echostr,
            nonce     = req.query.nonce;

        var oriArray = new Array();
        oriArray[0] = nonce;
        oriArray[1] = timestamp;
        oriArray[2] = token;
        oriArray.sort();

        var original = oriArray.join(''),
            shaObj = new jsSHA(original, 'TEXT'),
            scyptoString=shaObj.getHash('SHA-1', 'HEX');
         if(signature == scyptoString){
            res.end(echostr);
         } else {
         //验证失败
            res.end("false");
         }
    };
};