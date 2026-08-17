/* Funcao para unir os dados recebidos do nominatim para ser utilizado na proxima pesquisa do wikipedia */
export function criarConsultaGeografica(endereco) {
    console.log(endereco);
    
    return [
        endereco.nome,
        endereco.rua, 
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.pais,
        endereco.localidade,
        
        `Brasil`
    ] 
    .filter(Boolean)
    .join(", ")
}