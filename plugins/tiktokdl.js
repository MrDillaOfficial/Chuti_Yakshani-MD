const { cmd, commands } = require('../command');
const { ttdl } = require('ruhend-scraper');

cmd({
    pattern: "tt",
    desc: "To download TikTok videos.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!args[0]) {
            return await reply('*`Please give a valid TikTok link`*');
        }

        await m.react('🕒');
        let res;
        try {
            res = await ttdl(args[0]);
        } catch (error) {
            await m.react('❌');
            return await reply('*`Error obtaining data.`*');
        }

        let result = res.data;
        if (!result || result.length === 0) {
            await m.react('❌');
            return await reply('*`No result found.`*');
        }

        let data;
        try {
            data = result.find(i => i.resolution === "720p (High Definition)") || result.find(i => i.resolution === "360p (Standard definition)");
        } catch (error) {
            await m.react('❌');
            return await reply('*`Error data loss.`*');
        }

        if (!data) {
            await m.react('❌');
            return await reply('*`No data found.`*');
        }

        await m.react('✅');
        let video = data.url;
        let dev = '♻️ *~Powered by Chuti_Yakshani-MD~* ♻️';

        try {
            await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'tt.mp4', mimetype: 'video/mp4' }, { quoted: m });
        } catch (error) {
            await m.react('❌');
            return await reply('*`Error downloading video.`*');
        }
    } catch (e) {
        console.log(e);
        await reply(`${e}`);
    }
});
 {cmd , commands } = require('../command');
const { ttdl } = require('ruhend-scraper');

cmd({
    pattern: "tt",
    desc: "To download tiktok videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!args[0]) {
    return reply('*`Please give a valid Tiktok link`*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`Error obtaining data.`*');
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`No result found.`*');
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (High Definition)") || result.find(i => i.resolution === "360p (Standard definition)");
  } catch (error) {
    return reply('*`Error data loss.`*');
  }

  if (!data) {
    return reply('*`No data found.`*');
  }

  await m.react('✅');
  let video = data.url;
  let dev = '♻️ *~Powered by Chuti_Yakshani-MD~* ♻️'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'tt.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`Error download video.`*');
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
}); 
