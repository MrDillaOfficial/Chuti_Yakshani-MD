const { cmd } = require('../command');
const axios = require('axios');
const cheerio = require('cheerio');
const fg = require('api-dylux');
const { tiktokdl } = require('@bochilteam/scraper');
const { tiktok } = require('@xct007/frieren-scraper'); // Use this if you have the module

// Register the 'tiktok' command
cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide the TikTok URL.");

        let videoUrl = q;

        // Try using the API-Dylux method
        try {
            let down = await fg.tiktok(videoUrl);
            let downloadUrl = down.nowm; // Change based on API response
            let desc = `
👹️ *_TikTok Video Downloader_* 👹️

*Title:* ${down.author || 'Unknown'}

*Description:* ${down.description || 'No Description'}

*Duration:* ${down.timestamp || 'Unknown'}

*Views:* ${down.views || 'Unknown'}

♻️ *~Generated by YourBot~* ♻️
            `;

            // Send video details with thumbnail
            await conn.sendMessage(from, { image: { url: down.thumbnail }, caption: desc }, { quoted: mek });

            // Send the video file
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });

            // Send the video as a document file
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: "TikTokVideo.mp4", caption: "♻️ *~Generated by YourBot~* ♻️" }, { quoted: mek });

        } catch (e) {
            console.log('FG Error:', e);

            // Fallback to alternative methods
            try {
                const data = await tiktokdl(videoUrl);
                const url = data.video.no_watermark2 || data.video.no_watermark || 'https://tikcdn.net' + data.video.no_watermark_raw || data.video.no_watermark_hd;
                let desc = `
👹️ *_TikTok Video Downloader_* 👹️

*Title:* ${data.author.nickname || 'Unknown'}

*Description:* ${data.description || 'No Description'}

♻️ *~Generated by YourBot~* ♻️
                `;

                // Send video details with thumbnail
                await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

                // Send the video file
                await conn.sendMessage(from, { video: { url: url }, mimetype: "video/mp4" }, { quoted: mek });

                // Send the video as a document file
                await conn.sendMessage(from, { document: { url: url }, mimetype: "video/mp4", fileName: "TikTokVideo.mp4", caption: "♻️ *~Generated by YourBot~* ♻️" }, { quoted: mek });

            } catch (e) {
                console.log('TikTokDL Error:', e);
                reply("An error occurred while downloading the TikTok video.");
            }
        }

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
