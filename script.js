async function carregarDadosMercado() {
    const cryptoId = document.getElementById('cryptoSelect').value;
    const elementoPreco = document.getElementById('precoAtual');
    const elementoPrecoJusto = document.getElementById('precoJusto');
    const elementoPrecoTeto = document.getElementById('precoTeto');
    const elementoStatus = document.getElementById('statusOportunidade');

    elementoPreco.innerText = "Buscando dados na web...";

    try {
        const resposta = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
        const dados = await resposta.json();

        if (dados[cryptoId] && dados[cryptoId].usd) {
            const precoAtual = dados[cryptoId].usd;
            elementoPreco.innerText = `$ ${precoAtual.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;

            let fatorProjecao = 1.45; 
            let precoJusto = precoAtual * fatorProjecao;
            let precoTeto = precoJusto * 0.70; 

            elementoPrecoJusto.innerText = `$ ${precoJusto.toFixed(2)} USD`;
            elementoPrecoTeto.innerText = `$ ${precoTeto.toFixed(2)} USD`;

            if (precoAtual <= precoTeto) {
                elementoStatus.innerText = "🟢 Excelente Compra (Descontado)";
                elementoStatus.style.color = "#4ade80";
            } else if (precoAtual <= precoJusto) {
                elementoStatus.innerText = "🟡 Zona Neutra (Preço Justo)";
                elementoStatus.style.color = "#facc15";
            } else {
                elementoStatus.style.color = "#f87171";
            }

        } else {
            elementoPreco.innerText = "Erro ao carregar preço.";
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        elementoPreco.innerText = "Falha de conexão com a API.";
    }
}

window.onload = carregarDadosMercado;
