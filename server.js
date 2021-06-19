/////////////// EXPRESS /////////////////////

const express = require('express')

const app = express()

app.get("/", (request, response) => {
    const ping = new Date()
    ping.setHours(ping.getHours() - 3)
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
    response.sendStatus(200)
})

app.listen(process.env.PORT)

/////////////// BANCO DE DADOS /////////////////////

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('banco.json')
const db = low(adapter)

const pegarComando = (msg) => {
    let comandoEnviado = msg.content.split(' ')[0].toLowerCase()
    let comando = db.get('comandos').find({comando: comandoEnviado}).value()
    if(!comando)return(
    `Comando não econtrado. Certifique-se de estar escrevendo o comando de 
    maneira correta ou se ele existe, por meio do comando: !listarComandos`
    )
    else return comando
}
const novoComando = (msg) => {
    let regExp = /\(([^)]+)\)/;
    let novoComando = regExp.exec(msg.content)[1].split('//')[0].split(' ').toLowerCase(),
        novoTexto = regExp.exec(msg.content)[1].split('//')[1],
        comandoIgual = db.get('comandos').find({comando: novoComando}).value()

    if(!comandoIgual){
        db.get('comandos').push({
            comando: novoComando,
            texto: novoTexto
        }).write()

        msg.reply('Comando criado com sucesso')
    }else msg.reply('O comando já existe !!!')

}

/////////////// DISCORD /////////////////////

const discord = require('discord.js');
const bot = require('./bot')
    client = new discord.Client(),
    token = 'ODQwNTkyMTQ2NTk5NzcyMjIw.YJaccQ.noI5LRSD4kCxj0aJFrOHirq8I8k';

client.on('ready', () => console.log('pronto'))
client.on('message', msg => {
    if(!msg.content.startsWith('!'))return;
 
    let mensagemComando = pegarComando(msg)

    if(msg.content.startsWith("!novoComando"))novoComando(msg) 
    else if (msg.content.startsWith('!pauling'))bot.pauling(msg)
    else msg.reply(mensagemComando)
})

client.login(token)