const CAMPEONATOS = {
    4351: "Brasileirão Série A",
    4680:  "Copa do Brasil",
    4405:  "Libertadores",
    4771:  "Sul Americana",
    4481:  "Champions League",
};

async function buscarJogosDeHoje() {
    const hoje = new Date().toLocaleDateString('en-CA');
    let jogos = {};

    for (const [idCampeonato, nomeCampeonato] of Object.entries(CAMPEONATOS)) {
        try {
            jogos[nomeCampeonato] = [];
            const response = await fetch(`https://thesportsdb.com/api/v1/json/1/eventsday.php?d=${hoje}&s=Soccer`);

            if (!response.ok) {
                throw new Error(`Erro HTTP com status ${response.status}`);
            }

            const dados = await response.json();
            const jogosDoDia = dados.events.filter(evento =>
                Object.keys(CAMPEONATOS).includes(evento.idLeague));

            jogosDoDia.forEach(jogoDoDia => {
                jogos[nomeCampeonato].push(`${jogoDoDia.strHomeTeam} x ${jogoDoDia.strAwayTeam}`);
            });

        } catch (error) {
            console.error("Falha ao obter dados dos jogos:", error);
            throw error;
        }
    }

    return jogos;
}

async function inicializar() {
    const dadosJogos = await buscarJogosDeHoje();
    const divJogos = document.getElementById("jogos");

    if (dadosJogos && dadosJogos.length > 0) {
        Object.entries(dadosJogos).forEach(([campeonato, jogos]) => {
            const pCampeonato = document.createElement("p");
            pCampeonato.textContent = campeonato;
            divJogos.appendChild(pCampeonato);

            jogos.forEach(jogo => {
                const pJogo = document.createElement("p");
                pJogo.textContent = jogo;
                divJogos.appendChild(pJogo);
            });
            
        });
    } else {
        divCampeonatos.innerHTML = "<p>Nenhum campeonato pra exibir.</p>";
    }
}

inicializar();