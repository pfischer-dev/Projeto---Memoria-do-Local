/* funcao que faz a pequisa no nominatim e retorna seu valor */
import axios from "axios";

export async function consultarNominatim(dados) {
    const NOMINATIM_API = `https://nominatim.openstreetmap.org/search?`
    const config = {
        headers: {
            "User-Agent": "ConsultaHistorica/1.0 (contato: paulofischer.dev@gmail.com)"    
        },
        params: {
            q: dados,
            format: "json",
            addressdetails: 1,
            limit: 1
        }
    }
    
    try {
        const pesquisaNominatim = await axios.get(`${NOMINATIM_API}`, config)
        /* console.log(pesquisaNominatim.data); */
        
        if(pesquisaNominatim.data.length === 0) {
            return null;
        }
        return pesquisaNominatim.data[0];

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}