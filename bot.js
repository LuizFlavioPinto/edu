const bot = {
    pauling (msg) {
        let tabelaPeriodica = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'],
            ordemResultante = [],
            numeroEletronico = msg.content.replace('!pauling ',''),
            atual, valor, camadaDeValencia = 0
        for(let i = 0; i < tabelaPeriodica.length; i++){
            if (numeroEletronico > 0 ){
                atual = tabelaPeriodica[i].split('')[1]
                if(atual === 's')valor = 2
                if(atual === 'p')valor = 6
                if(atual === 'd')valor = 10
                if(atual === 'f')valor = 14

                if(numeroEletronico - valor >= 0){
                    numeroEletronico -= valor
                }else{
                    valor = numeroEletronico
                    numeroEletronico = 0
                }

                ordemResultante[i] = tabelaPeriodica[i] + valor 
                camadaDeValencia = ordemResultante[i].split('')[0] > camadaDeValencia ? ordemResultante[i].split('')[0] : camadaDeValencia
            }
        }
        msg.reply(`
            ${ordemResultante.toString().replace(/,/g, " ")}
            Subnível mais energético: ${ordemResultante[ordemResultante.length - 1]}    
            Camada de valência: ${camadaDeValencia} 
        `)
    }
}

module.exports = bot