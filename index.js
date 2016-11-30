'use strict'

var YouTube = require('youtube-node');

function getVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}

exports = function(data) {
    return new Promise(function(resolve, reject) {
        var youTube = new YouTube();

        if (data.videoId) {
            youTube.setKey(data.youtubeApiKey);
            youTube.getById(data.videoId, function(error, result) {
                if (error) return reject(error);

                resolve(result);
            });
        } else {
            resolve(null);
        }
    });
}