export function identificarPesquisa(yourSearch) {
    const yourSearchFormatted = yourSearch.replace("-", "")
    console.log(yourSearchFormatted);

    switch (/^\d+$/.test(yourSearchFormatted)) {
        case true:
            if(yourSearchFormatted.length === 8) {
                return "CEP";
            } 
            else {
                return "INVALIDO"
            }
            
        case false:
            return "TEXTO";     
    }   
}