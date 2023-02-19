const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { playlist } = require("../../Database/playliist.js");
const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
const yts = require("youtube-yts");


module.exports = { 
    name: "playlist", 
    desc: "Create and Manage Music Playlists", 
    alias: ["pl", "music"],
    category: "playlist",  
    react: "🎵", 
    start: async (Miku, m, { text, prefix, mentionByTag, args, pushname, owner, includes}) => { 
        const commandRegex = /^(create|add|remove|view)\s+(\S+)(?:\s+(\S+))?/i;
        const match = text.match(commandRegex);
        if (!match) {
            // if no arguments provided, retrieve all playlists owned by the sender
            playlist.find({ owner: m.sender }, (err, pls) => {
                if (err) {
                    console.log(err);
                    Miku.sendMessage(m.from, { text: `An error occurred while retrieving playlists.` }, { quoted: m });
                } else {
                    if (pls.length == 0) {
                        Miku.sendMessage(m.from, { text: `You have no playlists.` }, { quoted: m });
                    } else {
                        var sections = [{
                            "title": "Your Playlists",
                            "rows": []
                        }];
                        for (let i = 0; i < pls.length; i++) {
                            sections[0].rows.push({
                                "title": `${i+1}. ${pls[i].name}`,
                                "description": `View songs in ${pls[i].name}`,
                                "rowId": `${prefix}pl view ${pls[i].name}`
                            });
                        }
                        let ments = [m.sender.split('@')[0]]
                        let fot = `${pls.length}`
                        const listMessage = {
                            footer: fot,
                            text: `Hi ${m.pushName}\n\n*TO CREATE PLAYLIST*\n${prefix}pl create playlistName\n\n*TO ADD SONG IN PLAYLIST*\n${prefix}pl add playlistName SongName\n\n*To VIEW PLAYLIST*\n${prefix}pl view playlistName`,
                            buttonText: `Playlists🎶 🎵`,
                            mentions: ments, 
                            sections
                        }
                        const sendMsg = Miku.sendMessage(m.from, listMessage, { quoted:m });
                    }
                }
            });
            return;
        }
var action = match[1].toLowerCase();
var playlistName = match[2];
var songUrl = match[3];
        switch (action) {
            case "create":
                if(!playlistName) return Miku.sendMessage(m.from, { text: `Please provide a name for the playlist` }, { quoted: m });
                var newPlaylist = new playlist({
                    name: playlistName,
                    owner: m.sender,
                    songs: []
                });
                newPlaylist.save()
                    .then(() => {
                        Miku.sendMessage(m.from, { text: `Playlist ${playlistName} created successfully` }, { quoted: m });
                    })
                    .catch(error => {
                        console.log(error);
                        Miku.sendMessage(m.from, { text: `An error occurred while creating the playlist` }, { quoted: m });
                    });
                break;
                case "add":
                    if(!playlistName) return Miku.sendMessage(m.from, { text: `Please provide the name of the playlist to add the song to to`}, { quoted: m });
                    if(!songUrl) return Miku.sendMessage(m.from, { text: `Please provide the url of the song to add` }, { quoted: m });
                    const songSerachTerm = args.join(" ");
                    const songInfo = await yts(songSerachTerm);
                    const song =songInfo.videos[0];
                    playlist.findOne({name: playlistName, owner: m.sender})
                    .then(async (pl) => {
                    if(!pl) return Miku.sendMessage(m.from, { text: `Playlist not found` }, { quoted: m });
                    pl.songs.push({
                        title: song.title,
                        url: song.url,
                        savedAt: new Date()
                        });
                        if(!song.title) return Miku.sendMessage(m.from, { text: `title not found` }, { quoted: m });
                    await pl.save();
                    Miku.sendMessage(m.from, { text: `Song added to ${playlistName} successfully` }, { quoted: m });
                    }).catch(error => {
                    console.log(error);
                    Miku.sendMessage(m.from, { text: `An error occurred while adding the song to the playlist` }, { quoted: m });
                    });
                    break;
                
                case 'ehi': {
await XeonBotInc.sendMessage(from, { react: { text: `🗂️`, key: m.key }})
await reply (`*Please Wait Im Uploading Ehi Files 🗂️*`)
                   
let ehi = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Zoom.ehi'
let ehi1 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Zero.ehi'
let ehi2 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Twitter.ehi'
let ehi3 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Whatsapp.ehi'
let ehi4 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/YouTube.ehi'
let ehi5 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Facebook.ehi'
let ehi6 = 'https://github.com/nimaofficial/Server/raw/main/Ehi/Instergram.ehi'
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi }, mimetype: 'application/octet-stream', fileName: `🟣 Zoom 🟣.ehi`}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi1 }, mimetype: 'application/octet-stream', fileName: `🟣 Zero 🟣.ehi `}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi2 }, mimetype: 'application/octet-stream', fileName: `🟣 Twitter 🟣.ehi`}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi3 }, mimetype: 'application/octet-stream', fileName: `🟣 Whatsapp 🟣.ehi`}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi4 }, mimetype: 'application/octet-stream', fileName: `🟣 YouTube 🟣.ehi`}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi5 }, mimetype: 'application/octet-stream', fileName: `🟣 Facebook 🟣.ehi`}, { quoted: m })
    await XeonBotInc.sendMessage(m.chat, { document: { url: ehi6 }, mimetype: 'application/octet-stream', fileName: `🟣 Instergram 🟣.ehi`}, { quoted: m })
                              
    }
  break;
                
                
                case "remove":
                if(!playlistName) return Miku.sendMessage(m.from, { text: `Please provide the name of the playlist to remove the song from` }, { quoted: m });
                if(!songUrl) return Miku.sendMessage(m.from, { text: `Please provide the url of the song to remove` }, { quoted: m });
                playlist.findOne({name: playlistName, owner: m.sender})
                .then(async (pl) => {
                if(!pl) return Miku.sendMessage(m.from, { text: `Playlist not found` }, { quoted: m });
                pl.songs = pl.songs.filter(song => song.url !=songUrl);
                await pl.save();
                Miku.sendMessage(m.from, { text: `Song removed from ${playlistName} successfully` }, { quoted: m });
                })
                .catch(error => {
                console.log(error);
                Miku.sendMessage(m.from, { text: `An error occurred while removing the song from the playlist` }, { quoted: m });
            });
            break;
            case "view":
               if(!playlistName) return Miku.sendMessage(m.from, { text: 'Please provide the name of the playlist to view' }, { quoted: m });
               playlist.findOne({name: playlistName, owner: m.sender})
               .then((pl) => {
                if(!pl) return Miku.sendMessage(m.from, { text: 'Playlist not found' }, { quoted: m });
                var sections = [{
                "title": "Songs in Playlist",
                "rows": []
                }];
                pl.songs.forEach((song, i) => {
                sections[0].rows.push({
                "title": `${i+1}. ${song.title}`,
                "description": `Url: ${song.url} \nSaved: ${song.savedAt}`,
                "rowId": `${prefix}play ${song.url}`
                });
                });
                let ments = [m.sender]
                const listMessage = {
                footer: `${botName}`,
                text: `*${botName}* powered by *𝙏𝙚𝙖𝙢 𝘼𝙩𝙡𝙖𝙨*`,
                buttonText: 'Menu ⎙',
                mentions: ments,
                sections
                }
                const sendMsg = Miku.sendMessage(m.from, listMessage,{ quoted:m })
                });
                break;
            }
            }
            };
            
            
            
            
            

    
