export function montarLocalHistorico(dados) {
    const localHistorico = {
        consulta: {},
        identificacao: {},
        classificacao: {},
        endereco: {},
        historia: {},
        geografia: {},
        mapas: {},
        imagens: {},
        fontes: {},
        apisConsultadas: {
            viaCep: false,
            wikipedia: false,
            nominatim: false,
            ibge: false,
            iphan: false
        }
    };

    if(dados.consulta) {
        localHistorico.consulta = dados.consulta; 
    }
    if(dados.viaCep) {
        localHistorico.endereco.rua = dados.viaCep?.logradouro;
        localHistorico.endereco.bairro = dados.viaCep?.bairro;
        localHistorico.endereco.cidade = dados.viaCep?.localidade;
        localHistorico.endereco.uf = dados.viaCep?.uf;
        localHistorico.endereco.regiao = dados.viaCep?.regiao;
        localHistorico.endereco.ibge = dados.viaCep?.ibge;
        localHistorico.apisConsultadas.viaCep = true;
    }
    if(dados.nominatim) {
        localHistorico.identificacao = {
            nome: dados.nominatim.name,
            
            endereco: {
                pais: dados.nominatim.address.country,
                enderecoCompleto: dados.nominatim.display_name
            }
        },
        localHistorico.classificacao = {
            categoria: dados.nominatim.class,
            subtipo: dados.nominatim.type,
            enderecoTipo: dados.nominatim.addresstype,
            enderecoPostal: dados.nominatim.address?.postcode
        },
        localHistorico.endereco = { 
            nome: dados.nominatim.name,
            rua: dados.nominatim.address.road,
            bairro: dados.nominatim.address.suburb,
            cidade: dados.nominatim.address.city,
            estado: dados.nominatim.address.state,
            pais: dados.nominatim.address.country,
            cep: dados.nominatim.address.postcode,
            
        }

        localHistorico.mapas = {
            latitude: dados.nominatim.lat,
            longitude: dados.nominatim.lon,
            limites: dados.nominatim.boundingbox
        },
        localHistorico.apisConsultadas.nominatim = true;
    }
        
    if (dados.wikipedia) {
        localHistorico.historia.titulo = dados.wikipedia?.title;
        localHistorico.historia.descricao = dados.wikipedia?.description;
        localHistorico.historia.coordenadas = dados.wikipedia?.coordinates;
        localHistorico.historia.resumo = dados.wikipedia?.extract;
        localHistorico.imagens.imagem = dados.wikipedia.originalimage?.source;
        localHistorico.fontes.pagina = dados.wikipedia.content_urls?.desktop?.page;
        localHistorico.apisConsultadas.wikipedia = true;
    }
    console.log(`Meu Objeto:`);
    console.log(localHistorico)
    return localHistorico; 
}
