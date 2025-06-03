'use strict'; //modo restrito   

//verifica se o CEP é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();

    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)){
        const dados = await fetch (url);
        const adress = await dados.json();

        if(adress.hasOwnProperty('erro')){
            alert("CEP nao encontrado");        
        } else{
            preencherFormulario(adress);
        }
    } else{
        alert("cep Incorreto, tente novamente");
    }
}

const preencherFormulario = (endereco) => {

    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('cep').value = endereco.cep;
    document.getElementById('bairro').value = endereco.bairro;
    //document.getElementById('cidade').value = cidade.localidade;      
    
}

const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    //document.getElementById('cidade').value = '';
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);