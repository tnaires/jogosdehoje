const API_ROOT = "https://espn.com"
const CAMPEONATOS = {
    85: "Brasileirão Série A",
    87:  "Copa do Brasil",
    2254:  "Libertadores",
    2256:  "Sul Americana",
    2119:  "Champions League",
};

async function buscarJogosDeHoje() {
    let jogos = {};

    for (const [idCampeonato, nomeCampeonato] of Object.entries(CAMPEONATOS)) {
        try {
            jogos[nomeCampeonato] = [];
            const response = await fetch(API_ROOT);

            if (!response.ok) {
                throw new Error(`Erro HTTP com status ${response.status}`);
            }

            const dados = await response.json();
            const jogosDoDia = dados.events.filter(evento => {
                const campeonatoId = parseInt(evento.leagueId);
                return Object.keys(CAMPEONATOS).includes(campeonatoId);
            });

            jogosDoDia.forEach(jogoDoDia => {
                const mandante = jogoDoDia.competitions[0].competitors[0].team.displayName;
                const visitante = jogoDoDia.competitions[0].competitors[1].team.displayName;

                jogos[nomeCampeonato].push(`${mandante} x ${visitante}`);
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