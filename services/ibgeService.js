//funçao para buscar os Dados do IBGE
//ja linkei as 3 primeiras urls, falta apenas uma, e tentar achar o gentilico, idhm e o outro
import axios from "axios";

export async function buscarDadosIBGE(codigoIbge) {
    const urlIndicadores = `https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/29168|47001|29167/resultados/${codigoIbge}`;
    const urlPopulacaoMunicipal = `https://apisidra.ibge.gov.br/values/t/4709/v/93/p/2022/n6/${codigoIbge}`
    const config = {
        headers: {
            "User-Agent": "ConsultaHistorica/1.0 (contato: paulofischer.dev@gmail.com)"    
        }
    }    

    try {
        const [indicadoresIBGE, populacaoMunicipalSidra] = await Promise.all([
            await axios.get(urlIndicadores, config),
            await axios.get(urlPopulacaoMunicipal, config)
        ]);

    
        if(!indicadoresIBGE || !indicadoresIBGE.data) {
            return null;
        }
        if (!populacaoMunicipalSidra || !populacaoMunicipalSidra.data) {
            return null;
        }
        console.log("Indicadores:", indicadoresIBGE.data);
        console.log("SIDRA:", populacaoMunicipalSidra.data);
        return { indicadoresIBGE, populacaoMunicipalSidra };
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}