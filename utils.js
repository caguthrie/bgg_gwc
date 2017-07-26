const x2js = require('x2js');

exports.convertXmlStringToObject = function(xmlString){
    try{
        return new x2js().xml2js(xmlString);
    }
    catch(e){
        console.log(e);
        console.error("The response from the server was bad. Try again later.");
        process.exit(1);
    }
}