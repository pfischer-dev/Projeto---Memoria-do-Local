import axios from "axios";
const SEARCH_API_URL = "https://pt.wikipedia.org/w/api";
const SUMMARY_API = "https://pt.wikipedia.org/api/rest_v1/page/summary";

export async function consultarWikipedia(yourSearch) {
    const config = {
            headers: {
                "User-Agent": "ConsultaHistorica/1.0 (contato: paulofischer.dev@gmail.com)"
            },
            params: {
                action: "query",
                list: "search",
                srsearch: yourSearch,
                addressdetails: 1,
                limit: 1,
                format: "json"
            },
    }
    try {
        const pesquisa = await axios.get(`${SEARCH_API_URL}.php`, config);
        if(pesquisa.data.query.search.length === 0) {
            return null;
        }
        const titulo = pesquisa.data.query.search[0].title;
        const summaryWikipedia = await axios.get(`${SUMMARY_API}/${titulo}`, config)
        return summaryWikipedia.data;
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

    