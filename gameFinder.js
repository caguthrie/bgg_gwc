const bggAPIService = require("./bggAPIService");
const utils = require("./utils");
const _ = require('lodash');
const colors = require("colors/safe");
const prompt = require('prompt');
prompt.message = "";

function askUserForGame(){
    prompt.start();

    const options = {
        properties: {
            game: {
                description: colors.magenta("Search for a board game"),
                type: "string",
                required: true
            }
        }
    };

    prompt.get(options, function (err, result) {
        if (err)
            process.exit(1);
        bggAPIService.search(result.game)
            .then(function(results){
                const convertedResults = utils.convertXmlStringToObject(results.data);
                const limitTo20 = _.take(convertedResults.items.item,20);
                console.log(limitTo20[0]);
                listGames(limitTo20);
            });
    });
}

function listGames(games){
    const options = {
        properties: {
            game: {
                description: colors.magenta("Please enter the game number you are interested in"),
                type: "string",
                required: true
            }
        }
    };
    let message = "";
    _.each(games, (game, index) => {
        message += colors.green(`${index}) `);
        message += colors.blue(game.name._value);
        message += "\n";
    });

    prompt.message = message;

    prompt.get(options, function (err, result) {
        if (err)
            process.exit(1);
        const gameDataFromSearch = games[parseInt(result.game)];
        bggAPIService.getByID(gameDataFromSearch._id)
            .then(function(results){
                const convertedResults = utils.convertXmlStringToObject(results.data);
                showUserGameData(convertedResults);
            });
    });
}

function showUserGameData(gameData){
    // TODO
}


askUserForGame();