module.exports = {

    re: [
        /^https?:\/\/(?:listen\.)?tidal\.com\/(?:browse\/)?(album|track|video)\/(\d+)/i,
        /^https?:\/\/(?:listen\.)?tidal\.com\/(?:browse\/)?(playlist)\/([a-zA-Z0-9\-]+)/i
    ],

    mixins: ["*"],

    getLink: function(urlMatch) {

        var type = urlMatch[1].charAt(0).toLowerCase();
        var player = {
            template_context: {
                id: urlMatch[2],
                type: type,
            },
            type: CONFIG.T.text_html,
            rel: [CONFIG.R.player, CONFIG.R.inline, CONFIG.R.ssl, CONFIG.R.html5]
        };

        if (type === 't') {
            player.height = 180;
        }

        return player;

    },

    getData: function (url, cb)  {

        if (/^https?:\/\/listen\.tidal\.com\/(album|track|video|playlist)/i.test(url)) {

            return cb ({
                redirect: url.replace(/^https?:\/\/listen\./i, 'http://')
            }); 
        } else { return cb (null, {});}
    },

    tests: [{
        skipMethods: ['getData']
    },
        "http://tidal.com/track/56638583",
        "http://tidal.com/album/64522277",
        "http://tidal.com/video/64415005",
        "http://tidal.com/track/61554642",
        "https://listen.tidal.com/album/64979423",
        "http://tidal.com/track/61757248",
        "https://tidal.com/video/59727844",
        "https://listen.tidal.com/playlist/6a230741-f052-49f1-99aa-d8845e581c2e"
    ]
};