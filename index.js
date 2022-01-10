'use strict';

const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api')

var obj = JSON.parse(fs.readFileSync('something.json', 'utf8'));

const bot = new TelegramBot('', { polling: true })

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function printbyname(uid)
{
  if(isNumeric(uid))
  {
  var obj1 = obj.find(o => o.UID === uid);
  if (typeof obj1 === "undefined")
  {
    var arruser = {
      UID: "not found",
      Username: "not found",
      Usergroup: "not found"
    }
    return arruser
  }
  return obj1
  }
  else
  {
    var obj1 = obj.find(o => o.Username === uid);
    if (typeof obj1 === "undefined")
    {
      var arruser = {
        UID: "not found",
        Username: "not found or u didnt texted in right case",
        Usergroup: "not found"
      }
      return arruser
    }
    return obj1
  }

}

bot.on('message', (msg, match)=>
{
  if(msg.text === "/start")
  {
      bot.sendMessage(msg.chat.id, "created by javax64")
  }
  else {
    var object = printbyname(msg.text)
      console.log(object)
      bot.sendMessage(msg.chat.id, 'uid: ' + object.UID + '\n' +  "Username: "+object.Username + '\n'+ "Usergroup: " + object.Usergroup)
  }
})
