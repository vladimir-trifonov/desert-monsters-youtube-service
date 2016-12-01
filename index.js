'use strict'

var YouTube = require('youtube-node');

module.exports = function(youtubeApiKey) {
    var youTube = new YouTube();
    youTube.setKey(youtubeApiKey);

    function getVideoId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return null;
        }
    }


    function getId(url) {
        return new Promise(function(resolve, reject) {
            var id = getVideoId(url);
            if (id) {
                youTube.getById(id, function(error, result) {
                    if (error) return reject(error);

                    resolve(result);
                });
            } else {
                resolve(null);
            }
        });

    }

    return getId;
}