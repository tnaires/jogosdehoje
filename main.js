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
        return campeonatos;
    } catch (error) {
        console.error("Falha ao obter campeonatos:", error);
        throw error;
    }
}