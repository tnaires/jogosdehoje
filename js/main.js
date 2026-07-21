const API_KEY = "19c64b519c03bc7dae5839be47d278dc";

async function buscarCampeonatos() {
    var myHeaders = new Headers();
    myHeaders.append("x-apisports-key", API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://v1.afl.api-sports.io/leagues", requestOptions);

        if (!response.ok) {
            throw new Error(`Erro HTTP com status ${response.status}`);
        }

        const campeonatos = await response.json();
        return campeonatos.response;
    } catch (error) {
        console.error("Falha ao obter campeonatos:", error);
        throw error;
    }
}

async function inicializar() {
    const campeonatos = await buscarCampeonatos();
    const divCampeonatos = document.getElementById("campeonatos");

    if (campeonatos && campeonatos.length > 0) {
        divCampeonatos.innerHTML = campeonatos.map(campeonato => `<p>${campeonato.name}</p>`).join('');
    } else {
        divCampeonatos.innerHTML = "<p>Nenhum campeonato pra exibir.</p>";
    }
}

inicializar();