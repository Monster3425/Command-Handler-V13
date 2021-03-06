const chalk = require("chalk");
const { MessageSelectMenu, MessageActionRow, SystemChannelFlags } = require("discord.js");

/* MENU CREATOR */
/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (array) => {
  if (!array)
    throw new Error(
      chalk.red.bold(
        "The options were not provided! Make sure you provide all the options!"
      )
    );
  if (array.length < 0)
    throw new Error(
      chalk.red.bold(`The array has to have atleast one thing to select!`)
    );
  let select_menu;

  let id = "help-menus";

  let menus = [];

  const emo = {
    fun: "๐",
    giveaways: "๐",
    info: "๐ป",
    administration: "885039372351709194",
    testing: "๐",
    utilities: "โ๏ธ",
    purge: "๐งจ",
    verification: "๐",
    ticket: "๐ซ",
    counting: "๐ข",
    welcome : "๐ฑ",
    economy: "๐ฐ",
    owner: "โ",
  };

  array.forEach((cca) => {
    let name = cca;
    let sName = `${name[0].toUpperCase() + name.slice(1).toLowerCase()}`;
    let fName = name.toUpperCase();

    return menus.push({
      label: sName,
      value: fName,
    });
  });

  let chicken = new MessageSelectMenu()
    .setCustomId(id)
    .setPlaceholder("Choose the command category")
    .addOptions(menus);

  select_menu = new MessageActionRow().addComponents(chicken);

  //console.log(select_menu.components[0].options)

  return {
    smenu: [select_menu],
    sid: id,
  };
};

module.exports = create_mh;
