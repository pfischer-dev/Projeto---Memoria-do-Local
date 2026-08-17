/* funcao que chama todas apis qdo a entrada for CEP, reduzindo o espaço produzido no index.js */
import { criarConsultaGeografica } from "../utils/criarConsultaGeografica.js";
import { montarLocalHistorico } from "../utils/montarLocalHistorico.js";
import { consultarNominatim } from "./nominatimService.js";
import { consultarViaCep } from "./viaCepService.js";
import { consultarWikipedia } from "./wikipediaService.js";

export async function consultarCaseCep(yourSearch, tipo) {
    const enderecoViaCEP = await consultarViaCep(yourSearch);
    console.log(`Saída ViaCep:`, enderecoViaCEP);
    if(!enderecoViaCEP){
        return null;
    }

    const consultaGeografica = criarConsultaGeografica({rua: enderecoViaCEP.logradouro, bairro: enderecoViaCEP.bairro, localidade: enderecoViaCEP.localidade})/* add os resultados retornados da viaCEP e add aos parametros da pesquisa destinada ao nominatim */
    const localizacao = await consultarNominatim(consultaGeografica);
    console.log(`Saída Nominatim:`, localizacao);
    
    const artigoWikipedia = await consultarWikipedia(enderecoViaCEP.logradouro);
    console.log(`Saída Wiki: `, artigoWikipedia);
    
    
    const localHistorico = montarLocalHistorico({
        consulta: {
            termoOriginal: yourSearch,
            tipoPesquisa: tipo,
            pesquisadoEm: new Date()
        },
        classificacao: {

        },
        viaCep: enderecoViaCEP,
        nominatim: localizacao,
        wikipedia: artigoWikipedia
    });
    console.log(`Meu Objeto (CaseCep):`, localHistorico);
    return localHistorico
}

/* const enderecoViaCEP = await consultarViaCep(yourSearch); */ /* pega o cep digitado, limpa ele e consulta na api ViaCep, retornando seu resultado */
                /* console.log(`Saida ViaCEP:`);
                console.log(enderecoViaCEP); */
                
                /* const consultaGeografica = criarConsultaGeografica({rua: enderecoViaCEP.logradouro, bairro: enderecoViaCEP.bairro, localidade: enderecoViaCEP.localidade}); *//* add os resultados retornados da viaCEP e add aos parametros da pesquisa destinada ao nominatim */
                /* const localizacao = await consultarNominatim(consultaGeografica)
                console.log(`Saida Nominatim:`);
                console.log(localizacao);
                
                const artigoWikipedia = await consultarWikipedia(enderecoViaCEP.logradouro);
                console.log(`Saida Wiki:`);
                console.log(artigoWikipedia); */
                
                /* Meu Objeto: */
                /* const localHistorico = montarLocalHistorico({
                    consulta: {
                        termoOriginal: yourSearch,
                        tipoPesquisa: tipo,
                        pesquisadoEm: new Date()
                    },
                    classificacao : {
                        
                    },
                    viaCep: enderecoViaCEP,
                    nominatim: localizacao,
                    wikipedia: artigoWikipedia
                }); */