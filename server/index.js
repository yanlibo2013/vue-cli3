let userlist = require("../data/userlist.json");
module.exports = function() {
  return {
    menu: require("../data/menu.json"),
    userlist: userlist,
    adduser: userlist
  };
};
