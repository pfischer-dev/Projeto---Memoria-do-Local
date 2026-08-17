import express from "express";
import { identificarPesquisa } from "./utils/identificarPesquisa.js";
import { consultarCaseTexto } from "./services/consultarCaseTextoService.js";
import { consultarCaseCep } from "./services/consultarCaseCepService.js";



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
                const localHistorico = await consultarCaseCep(yourSearch, tipo);
                if(!localHistorico) {
                    return res.render("index.ejs", {
                        localHistorico: null,
                        error: `Não foi possível encontrar informações sobre o local.`
                    })
                }
                res.render("index.ejs", {
                    localHistorico: localHistorico,
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
                const localHistorico = await consultarCaseTexto(yourSearch)
                if(!localHistorico) {
                    return res.render("index.ejs", {
                        localHistorico: null,
                        error: `Não foi possível encontrar informações sobre o local.`
                    });
                }

                res.render("index.ejs", { 
                    localHistorico: localHistorico,
                    error: null
                });         
            } catch (error) {
                console.log(error.message);
                res.render("index.ejs", { 
                    localHistorico: null,
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