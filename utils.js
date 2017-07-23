var xml2json = require('xml2json');

exports.convertXmlStringToObject = function(xmlString){
    try{
        return xml2json.toJson(xmlString, {object: true});
    }
    catch(e){
        console.error("The response from the server was bad. Try again later.");
        process.exit(1);
    }
}