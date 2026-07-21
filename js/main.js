const API_ROOT = "https://v3.football.api-sports.io"
const API_KEY = "19c64b519c03bc7dae5839be47d278dc";
const CAMPEONATOS = {
    740: "Brasileirão Série A",
    13:  "Libertadores",
    73:  "Copa do Brasil",
    11:  "Sul Americana",
    17:  "Champions League",
};

async function buscarJogosDeHoje() {
    var myHeaders = new Headers();
    myHeaders.append("x-apisports-key", API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const hoje = new Date().toLocaleDateString('en-CA');
    let jogos = {};

    for (const [idCampeonato, nomeCampeonato] of Object.entries(CAMPEONATOS)) {
        try {
            jogos[nomeCampeonato] = [];
            const response = await fetch(`${API_ROOT}}/fixtures?league=${idCampeonato}&date=${hoje}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro HTTP com status ${response.status}`);
            }

            const jogosDoDia = await response.json();

            jogosDoDia.forEach(jogoDoDia => {
                jogos[nomeCampeonato].push(`${jogoDoDia.teams.home.name} x ${jogoDoDia.teams.away.name}`);
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