/* funcao usada para tratar o codigo postal deixando ele sem traços ou espaços */
import axios from "axios";

export async function consultarViaCep(yourSearch) {
    const yourSearchFormatted = yourSearch.replace("-", "");
    const viaCEP_API = `https://viacep.com.br/ws/${yourSearchFormatted}/json/`;
    try {
        const pesquisaViaCep = await axios.get(`${viaCEP_API}`);

        if(pesquisaViaCep.data.erro === true) {
            return null;
        }
        return pesquisaViaCep.data;
    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}