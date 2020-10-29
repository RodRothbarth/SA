
let arrayTabela = [];
let idLinha = $(this).data("id") //se nao funcionar testar colocar em cada função


let dataCerti = [];
let array = [];

function Certificado(evento, dataI, dataF, horas, tipo){
    this.evento = evento;
    this.dataIni = dataI
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
}

function contForm(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let inicioEvento = new Date(dadosForm[1].split('-').join('/')).toLocaleDateString('pt-br')
        let fimEvento = new Date(dadosForm[2].split('-').join('/')).toLocaleDateString('pt-br')
        let form = new Certificado(dadosForm[0],inicioEvento, fimEvento,dadosForm[3],dadosForm[4])
        return form 
}

function Add(){ //adiciona certificados 
    let certificados = contForm()
    if (localStorage.getItem('certificate') === null){
        dataCerti.push(certificados)
        localStorage.setItem('certificate', JSON.stringify(dataCerti))   
        alert("Certificado adicionado com Sucesso!");
        
    }else{
        dataCerti = JSON.parse(localStorage.getItem('certificate')) 
        dataCerti.push(certificados) 
        localStorage.setItem('certificate', JSON.stringify(dataCerti))   
        alert("Certificado adicionado com Sucesso!");
    }              
}


let myArray = getDataCertificate()
function getDataCertificate(){ //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    JSON.parse(localStorage.getItem("certificate")).forEach(function(info){ 
        arrayTabela.push((info))
    });
    return arrayTabela;
}

$('th').on('click', function(){
    let coluna = $(this).data('coluna');
    let ordem = $(this).data('ordem');

    if(ordem == 'decr'){
        $(this).data('ordem', "cresc")
        myArray = myArray.sort((a,b) => a[coluna]>b[coluna] ? 1 : -1)
    }else{
        $(this).data('ordem', "decr")
        myArray = myArray.sort((a,b) => a[coluna]<b[coluna] ? 1 : -1)
    }  
    tabela(myArray)  
})

tabela(myArray)

function tabela(dados){
    let tabela = document.getElementById("tabela")
    tabela.innerHTML = ""
    for(let i=0; i< dados.length; i++){

        let row = `<tr class="linha-${i}"> 
                        <td>${dados[i].documento}</td> 
                        <td>${dados[i].evento}</td> 
                        <td>${dados[i].dataIni}</td> 
                        <td>${dados[i].dataFim}</td> 
                        <td>${dados[i].horas}</td> 
                        <td>${dados[i].tipo}</td> 
                        <td>
                            <img id="edita-${i}" onclick='EditarLinha()' src='/imagens/edit.png'  data-id="${i}">
                            <img id="deleta-${i}" onclick='DeletaLinha()' src='/imagens/lixo.png' data-id="${i}">
                            <img id="confirma-${i}" onclick='ConfirmaDelet()' src='/imagens/lixo.png' hidden data-id="${i}"> 
                            <img id="cancela-${i}" onclick='CancelaDel()' src='/imagens/lixo.png' hidden data-id="${i}">    
                            <img id="cancEdit-${i}" onclick='CancelaEdit()' src='/imagens/lixo.png' hidden data-id="${i}">    
                            <img id="confimEdit-${i}" onclick='ComfirmaEdit()' src='/imagens/lixo.png' hidden data-id="${i}">  
                        </td> 
                         
                   </tr>`
        $('#tabela').append(row)

        // $(`#deleta-${i}`).on('click', DeletaLinha) se deletar todas as linhas usar o jquery aqui.
        // $(`#edita-${i}`).on('click', EditarLinha)
        // $(`#confirma-${i}`).on('click', Confirma)
        // $(`#confirmEdit-${i}`).on('click', ConfirmaEdit)
        // $(`#cancela-${i}`).on('click', Cancela)
        // $(`#cancEdit-${i}`).on('click', CancelaEdit)
    }
}

function EditarLinha(){
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancelar-${idLinha}`)
    let confirmar = $(`confirma-${idLinha}`)

    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    confirmar.removeClass('hidden')
}

function SalvarEdicao(){
    let valor = $(this).html()
    let salvar = $(`#confirma-${idLinha}`)


    $(this).html(`<input type="text" data-value="${valor}">`)
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    salvar.removeClass('hidden')
}

function DeletaLinha(){
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancelar-${idLinha}`)
    let confirmar = $(`confirma-${idLinha}`)

    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    confirmar.removeClass('hidden')    
}

function ConfirmaDel(){
    //let linha = $(`.linha-${idLinha}`)
    arrayTabela.splice(`${idLinha}`,1)
    localStorage.setItem(JSON.stringify('certificate', arrayTabela))
    //linha.remove()
}

function CancelaDel(){
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancelar-${idLinha}`)
    let confirmar = $(`confirma-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    confirmar.addClass('hidden')  
}

function CancelaEdit(){
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancelar-${idLinha}`)
    let salvar = $(`#confirma-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    salvar.addClass('hidden')  
}

