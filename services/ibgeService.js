//funçao para buscar os Dados do IBGE
//ja linkei as 3 primeiras urls, falta apenas uma, e tentar achar o gentilico, idhm e o outro
import axios from "axios";

export async function buscarDadosIBGE(codigoIbge) {
    const urlIndicadores = `https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/29168|47001|29167/resultados/${codigoIbge}`;
    const config = {
        headers: {
            "User-Agent": "ConsultaHistorica/1.0 (contato: paulofischer.dev@gmail.com)"    
        }
    }    
    try {
        const resultadoIBGE = await axios.get(urlIndicadores, config);
        if(!resultadoIBGE) {
            return null;
        }
        return resultadoIBGE;
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}