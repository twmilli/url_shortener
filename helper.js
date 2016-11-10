    var crypto = require("crypto");
    var LENGTH = 6;
    module.exports = {
        encode: function(url){
            var key = crypto.createHash('md5').update(url).digest("base64");
            key = key.slice(0,LENGTH);
            var obj = {
                url: url,
                key: key
            };
            return obj;
        }
    }
