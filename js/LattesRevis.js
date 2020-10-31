$(document).ready(function(){
    $(".cnpj").mask('00.000.000/0000-00');
    $(".cpf").mask('000.000.000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
});

let arrayTabela = [];
 //se nao funcionar testar colocar em cada função

let dataCerti = [];
let array = [];

function Certificado(evento, dataI, dataF, horas, tipo, id){
    this.evento = evento;
    this.dataIni = dataI
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
    this.id = id;
}

function contForm(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let form = new Certificado(dadosForm[0],dadosForm[1], dadosForm[2],dadosForm[3],dadosForm[4])
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
        getDataCertificate() = getDataCertificate().sort((a,b) => a[coluna]>b[coluna] ? 1 : -1)
    }else{
        $(this).data('ordem', "decr")
        getDataCertificate() = getDataCertificate().sort((a,b) => a[coluna]<b[coluna] ? 1 : -1)
    }  
    tabela(getDataCertificate())  
})

tabela(getDataCertificate())

function tabela(dados){
    let tabela = document.getElementById("tabela")
    tabela.innerHTML = ""
    for(var i=0; i< dados.length; i++){
        dados[i].id = `${i}`
    
       var row = `<tr class="linha-${dados[i].id}"> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].documento}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].evento}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].dataIni}</td>  
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].dataFim}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].horas}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].tipo}</td> 
                        <td>
                            <img id="edita-${dados[i].id}"  src='/imagens/edit.png'  class='' data-id="${dados[i].id}">
                            <img id="deleta-${dados[i].id}"  src='/imagens/lixo.png' class='' data-id="${dados[i].id}">
                            <img id="confirma-${dados[i].id}"  src='/imagens/certo.png' class='hidden' data-id="${dados[i].id}"> 
                            <img id="cancela-${dados[i].id}"  src='/imagens/errado.png' class='hidden' data-id="${dados[i].id}">    
                            <img id="cancEdit-${dados[i].id}"  src='/imagens/errado.png' class='hidden' data-id="${dados[i].id}">    
                            <img id="edit-${dados[i].id}" src='/imagens/certo.png' class='hidden' data-id="${dados[i].id}">  
                        </td> 
                         
                   </tr>`
        $('#tabela').append(row)
        
        $(`#edita-${dados[i].id}`).on('click', EditarLinha)
        $(`#deleta-${dados[i].id}`).on('click', DeletaLinha)
        $(`#confirma-${dados[i].id}`).on('click', ConfirmaDel)
        $(`#cancela-${dados[i].id}`).on('click', CancelaDel)
        $(`#cancEdit-${dados[i].id}`).on('click', CancelaEdit)
        $(`#edit-${dados[i].id}`).on('click', ConfirmaEdicao)
    }
}

function EditarLinha(){
    let idLinha = $(this).data('id')
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancEdit-${idLinha}`)
    let salvar = $(`#edit-${idLinha}`)
    let cpf= arrayTabela[`${idLinha}`].documento
    let evento = arrayTabela[`${idLinha}`].evento
    let dataI = arrayTabela[`${idLinha}`].dataIni
    let dataF = arrayTabela[`${idLinha}`].dataFim
    let horas = arrayTabela[`${idLinha}`].horas
    let tipo = arrayTabela[`${idLinha}`].tipo
    
     
    $(this).parents('tr').find(`td:eq(0)`).html(`<input id='cpf-${idLinha}' type="text" value="${cpf}">`)
    $(this).parents('tr').find(`td:eq(1)`).html(`<input id='evento-${idLinha}' type="text" value="${evento}">`)
    $(this).parents('tr').find(`td:eq(2)`).html(`<input id='dataI-${idLinha}' class="dataCertInicio" "type="text" value="${dataI}">`)
    $(this).parents('tr').find(`td:eq(3)`).html(`<input id='dataF-${idLinha}' class="dataCertFim" type="text" value="${dataF}">`)
    $(this).parents('tr').find(`td:eq(4)`).html(`<input id='horas-${idLinha}' type="number" value="${horas}">`)
    $(this).parents('tr').find(`td:eq(5)`).html(`<input id='tipo-${idLinha}' type="text" value="${tipo}">`)
    
    console.log(arrayTabela)
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    salvar.removeClass('hidden')
}

function ConfirmaEdicao(){
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let salvar = $(`#edit-${idLinha}`);
        
    let cpf =  document.getElementById(`cpf-${idLinha}`).value
    let evento =  document.getElementById(`evento-${idLinha}`).value
    let dataI =  document.getElementById(`dataI-${idLinha}`).value
    let dataF =  document.getElementById(`dataF-${idLinha}`).value
    let horas =  document.getElementById(`horas-${idLinha}`).value
    let tipo =  document.getElementById(`tipo-${idLinha}`).value

    arrayTabela[`${idLinha}`].documento = cpf
    arrayTabela[`${idLinha}`].evento = evento
    arrayTabela[`${idLinha}`].dataIni = dataI
    arrayTabela[`${idLinha}`].dataFim = dataF
    arrayTabela[`${idLinha}`].horas = horas
    arrayTabela[`${idLinha}`].tipo = tipo

    // myArray[idLinha].dataIni = $(this).parents('tr').find(`td:eq(2)`).html(`<input name='linha' type="date" value="${dataI}">`).val()
    // myArray[idLinha].dataFim = $(this).parents('tr').find(`td:eq(3)`).html(`<input name='linha' type="date" value="${dataF}">`).val()
    // myArray[idLinha].horas = $(this).parents('tr').find(`td:eq(4)`).html(`<input name='linha' type="number" value="${horas}">`).val()
    // myArray[idLinha].tipo = $(this).parents('tr').find(`td:eq(5)`).html(`<input name='linha' type="text" value="${tipo}">`).val()

    localStorage.setItem('certificate', JSON.stringify(arrayTabela))
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    salvar.addClass('hidden');
}

function CancelaEdit(){
    let idLinha = $(this).data('id')
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancEdit-${idLinha}`)
    let confirmar = $(`#confimEdit-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    confirmar.addClass('hidden')
    //location.reload()
}

function DeletaLinha(){
    let idLinha = $(this).data("id")
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancela-${idLinha}`)
    let confirmar = $(`#confirma-${idLinha}`)
    
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    confirmar.removeClass('hidden')    
}

function ConfirmaDel(){
    let idLinha = $(this).data("id")
    let linha = $(`.linha-${idLinha}`)
    
    arrayTabela.splice(`${idLinha}`,1)
    localStorage.setItem('certificate', JSON.stringify(arrayTabela))  
    linha.remove()
}

function CancelaDel(){
    let idLinha = $(this).data("id")
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancela-${idLinha}`)
    let confirmar = $(`#confirma-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    confirmar.addClass('hidden')  
}



