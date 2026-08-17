/* funcao que chama todas apis qdo a entrada for TEXTO, reduzindo o espaço produzido no index.js */
import { criarConsultaGeografica } from "../utils/criarConsultaGeografica.js";
import { montarLocalHistorico } from "../utils/montarLocalHistorico.js";
import { consultarNominatim } from "./nominatimService.js";
import { consultarViaCep } from "./viaCepService.js";
import { consultarWikipedia } from "./wikipediaService.js";


export async function consultarCaseTexto(yourSearch) {
    /* chamada API Nominatim */
    const resultadoNominatim = await consultarNominatim(yourSearch);
    console.log(`Saida Nominatim:`, resultadoNominatim);
    
    if(!resultadoNominatim) {
        return null
    }
    /* variavel onde pego o retorno do nominatim e add a ela a criar consulta, chamanda ela no WIKI */
    const consultaTexto = criarConsultaGeografica({ 
        nome: resultadoNominatim?.name,
        rua: resultadoNominatim.address?.road,
        bairro: resultadoNominatim.address?.suburb, 
        cidade: resultadoNominatim.address?.city,
        estado: resultadoNominatim.address?.state,
        pais: resultadoNominatim.address?.country,
        localidade:
        resultadoNominatim.address?.city ?? resultadoNominatim.address?.municipality
    });
    
    const enderecoViaCEP = await consultarViaCep(resultadoNominatim.address?.postcode);
    console.log(`Saida ViaCEP:`, enderecoViaCEP);
    if(!enderecoViaCEP) {
        return null;
    }
    
    const resultadoWiki = await consultarWikipedia(consultaTexto);
    console.log(`Saída Wiki:`, resultadoWiki);
    if(!resultadoWiki) {
        return null;
    }

    const localHistorico = montarLocalHistorico({
        consulta: {
            termoOriginal: yourSearch,
            tipoPesquisa: "TEXTO",
            pesquisadaEm: new Date()
        },
        nominatim: resultadoNominatim,
        viaCep: enderecoViaCEP,
        wikipedia: resultadoWiki
    });
    console.log(`Meu Objeto (CaseTexto): `, localHistorico);
    return localHistorico;
}




/* ANTIGO CODIGO que ESTAVA NO INDEX.JS, TESTANDO TUDO ANTES DE APAGa lo */

/* chamada API Nominatim */
                /* const resultadoNominatim = await consultarNominatim(yourSearch);
                console.log(`Saida Nominatim:`);
                console.log(resultadoNominatim);

                if(!resultadoNominatim) {
                    return res.render("index.ejs", {
                        localHistorico: null,
                        error: `Local não Encontrado.`
                    })
                } */
                /* variavel onde pego o retorno do nominatim e add a ela a criar consulta, chamanda ela no WIKI */
                /* const consultaTexto = criarConsultaGeografica({
                    nome: resultadoNominatim?.name,
                    rua: resultadoNominatim.address?.road,
                    bairro: resultadoNominatim.address?.suburb,
                    cidade: resultadoNominatim.address?.city,
                    estado: resultadoNominatim.address?.state,
                    pais: resultadoNominatim.address?.country,
                    localidade: 
                        resultadoNominatim.address?.city ??
                        resultadoNominatim.address?.municipality
                });
                console.log(`resultado consulta texto:`);
                console.log(consultaTexto); */

                /* Chamada API ViaCEP */
                /* const enderecoViaCEP = await consultarViaCep(resultadoNominatim.address?.postcode);
                console.log(`Saída ViaCep:`);
                console.log(enderecoViaCEP);

                if(!enderecoViaCEP) {
                    return res.render("index.ejs", {
                        localHistorico: null,
                        error: `Endereço de Cep não encontrado`
                    });
                } */
                
                /* chamada API Wiki */
                /* const resultadoWiki = await consultarWikipedia(consultaTexto);
                console.log(`Saída Wiki:`);
                console.log(resultadoWiki);
                if (!resultadoWiki) {
                    return res.render("index.ejs", {
                        localHistorico: null,
                        error: `Pesquisa inválida!!! Tente outro nome ou local...`
                    });
                }

                const localHistorico = montarLocalHistorico({
                    consulta: {
                        termoOriginal: yourSearch,
                        tipoPesquisa: tipo,
                        pesquisadoEm: new Date()
                    },
                    viaCep: enderecoViaCEP,
                    wikipedia: resultadoWiki,
                    nominatim: resultadoNominatim
                }); */