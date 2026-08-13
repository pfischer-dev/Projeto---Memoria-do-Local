import express from "express";
import { consultarWikipedia } from "./services/wikipediaService.js";
import { identificarPesquisa } from "./utils/identificarPesquisa.js";
import { consultarViaCep } from "./services/viaCepService.js";
import { montarLocalHistorico } from "./utils/montarLocalHistorico.js";
import { consultarNominatim } from "./services/nominatimService.js";
import { criarConsultaGeografica } from "./utils/criarConsultaGeografica.js";

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { localHistorico: null})
});

app.get("/consulta", async (req, res) => { 
    const yourSearch = req.query.local.trim();
    console.log(yourSearch + " teste");
    
    const tipo = identificarPesquisa(yourSearch);
    switch (tipo) {
        case "CEP":
            try {
                const enderecoViaCEP = await consultarViaCep(yourSearch); /* pega o cep digitado, limpa ele e consulta na api ViaCep, retornando seu resultado */
                console.log(`Saida ViaCEP:`);
                console.log(enderecoViaCEP);
                
                const consultaGeografica = criarConsultaGeografica({rua: enderecoViaCEP.logradouro, bairro: enderecoViaCEP.bairro, localidade: enderecoViaCEP.localidade});/* add os resultados retornados da viaCEP e add aos parametros da pesquisa destinada ao nominatim */
                const localizacao = await consultarNominatim(consultaGeografica)
                console.log(`Saida Nominatim:`);
                console.log(localizacao);
                
                const artigoWikipedia = await consultarWikipedia(enderecoViaCEP.logradouro);
                console.log(`Saida Wiki:`);
                console.log(artigoWikipedia);
                
    
                /* Meu Objeto: */
                const localHistorico = montarLocalHistorico({
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
                });
                
                
                res.render("index.ejs", {localHistorico: localHistorico,
                    error: null
                });
            } catch (error) {
                console.log(error.message);
                res.render("index.ejs", { localHistorico: null,
                    error: `Número de cep inválido!!!`
                })
            }
            break;
        
        case "TEXTO":
            try {
                const resultadoNominatim = await consultarNominatim(yourSearch);
                console.log(`Saida Nominatim:`);
                console.log(resultadoNominatim);

                if(!resultadoNominatim) {
                    res.render("index.ejs", {
                        localHistorico: null,
                        error: `Local não Encontrado.`
                    })
                }

                const consultaTexto = criarConsultaGeografica({
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
                console.log(consultaTexto);


                const resultadoWiki = await consultarWikipedia(consultaTexto);
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
                    wikipedia: resultadoWiki,
                    nominatim: resultadoNominatim
                });

                res.render("index.ejs", { 
                    localHistorico: localHistorico
                });         
            } catch (error) {
                console.log(error.message);
                res.render("index.ejs", { localHistorico: null,
                error: `Ocorreu um erro ao consultar o WIKIPEDIA`
                });
            }
            break;
        
        case "INVALIDO":
            res.render("index.ejs", { localHistorico: null,
                error: `Entrada Inválida!!! Tente Novamente...`
            })
            break;
    }
});

app.listen(port, () => {
    console.log(`Listenning on port ${port}`);
});