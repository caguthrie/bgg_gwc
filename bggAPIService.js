const axios = require('axios');

exports.search = function(input){
    return axios.get(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${input}`);
};

exports.getByID = function(id){
    return axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`);
};