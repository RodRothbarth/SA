$(document).ready(function(){
    $(".cpf").mask('000.000.000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

  let dataClient = [];

  function Cliente(name, email, documento, telefone, dataNasc, instituicao, area, lattes, id){
    this.nome = name;
    this.email = email;
    this.documento = documento;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.instituicao = instituicao;
    this.area = area;
    this.lattes = lattes;
    this.id = id;
}
//realizateste para verificar a autenticidade do numero de cpf
function TestaCPF(strCPF) {
    var Soma = 0;                  
    var Resto;
    
    if(strCPF.length !== 11 ) return false
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;    
}
    
function ChamarCpf(){ //realiza o teste no cpf inserido
    var strCPF = document.getElementById("documento").value;
    strCPF = strCPF.replace(/\./g, '');
    strCPF = strCPF.replace('-', '');
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) !== true) {
        alert("Você digitou um CPF Inválido!")
    } 
}

function CadastrarCliente(){ //sistema para cadastrar um novo usuario.
    let cliente = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    let nasc = new Date(user[5].split('-').join('/')).toLocaleDateString('pt-br')    
        
    if (localStorage.getItem("cliente") === null ){
        dataClient.push(new Cliente(cliente[0],cliente[1],cliente[2],cliente[3],cliente[4],nasc,cliente[6],cliente[7]));
        localStorage.setItem("cliente", JSON.stringify(dataClient));
        alert("Cadastro Realizado com Sucesso!");
    }else{
        dataClient = JSON.parse(localStorage.getItem("cliente"))
        dataClient.push(new Cliente(cliente[0],cliente[1],cliente[2],cliente[3],cliente[4],nasc,cliente[6],cliente[7]));
        localStorage.setItem("cliente", JSON.stringify(dataClient));
        alert("Cadastro Realizado com Sucesso!");
    }        
}

function getDataCliente(){ //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    JSON.parse(localStorage.getItem("cliente")).forEach(function(info){ 
        dataClient.push((info))
    });
    return dataClient;
}

$('th').on('click', function(){
    let coluna = $(this).data('coluna');
    let ordem = $(this).data('ordem');

    if(ordem == 'decr'){
        $(this).data('ordem', "cresc")
        dataClient = dataClient.sort((a,b) => a[coluna]>b[coluna] ? 1 : -1)
    }else{
        $(this).data('ordem', "decr")
        dataClient = dataClient.sort((a,b) => a[coluna]<b[coluna] ? 1 : -1)
    }  
    tabela(dataClient)  
})

tabela(getDataCliente())

function tabela(dados){
    let tabela = document.getElementById("tabela")
    tabela.innerHTML = ""
    for(var i=0; i< dados.length; i++){
        dados[i].id = `${i}`
    
       var row = `<tr class="linha-${dados[i].id}"> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].nome}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].documento}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].email}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].telefone}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].dataNasc}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].instituicao}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].area}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].lattes}</td> 
                         
                        <td>
                            <img id="edita-${dados[i].id}"  src='/imagens/edit.png'  class='' data-id="${dados[i].id}">
                            <img id="deleta-${dados[i].id}"  src='/imagens/lixo.png' class='' data-id="${dados[i].id}">
                            <img id="confirma-${dados[i].id}"  src='/imagens/certo.png' class='hidden' data-id="${dados[i].id}"> 
                            <img id="cancela-${dados[i].id}"  src='/imagens/errado.png' class='hidden' data-id="${dados[i].id}">    
                            <img id="cancEdit-${dados[i].id}"  src='/imagens/errado.png' class='hidden' data-id="${dados[i].id}">    
                            <img id="edit-${dados[i].id}" src='/imagens/certo.png' class='hidden' data-id="${dados[i].id}">  
                        </td> 
                         
                   </tr>`
        tabela.innerHTML += row

        $(`#edita-${dados[i].id}`).on('click', EditarCliente)
        $(`#edit-${dados[i].id}`).on('click', ConfirmaCliente)
        $(`#cancEdit-${dados[i].id}`).on('click', CancelaEditCliente)
        $(`#deleta-${dados[i].id}`).on('click', DeletaCliente)
        $(`#confirma-${dados[i].id}`).on('click', ConfirmaDelCliente)
        $(`#cancela-${dados[i].id}`).on('click', CancelaDelCliente) 
    }
}

function EditarCliente(){
    let idLinha = $(this).data('id')
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancEdit-${idLinha}`)
    let salvar = $(`#edit-${idLinha}`)
    let nome = dataClient[`${idLinha}`].nome;
    let email = dataClient[`${idLinha}`].email;
    let documento = dataClient[`${idLinha}`].documento;
    let telefone = dataClient[`${idLinha}`].telefone;
    let dataNasc = dataClient[`${idLinha}`].dataNasc;
    let instituicao = dataClient[`${idLinha}`].instituicao;
    let area = dataClient[`${idLinha}`].area;
    let lattes = dataClient[`${idLinha}`].lattes;     
     
    $(this).parents('tr').find(`td:eq(0)`).html(`<input id='cpf-${idLinha}' type="text" value="${nome}">`)
    $(this).parents('tr').find(`td:eq(1)`).html(`<input id='evento-${idLinha}' type="text" value="${email}">`)
    $(this).parents('tr').find(`td:eq(2)`).html(`<input id='documento-${idLinha}' class="dataCertInicio" "type="text" value="${documento}">`)
    $(this).parents('tr').find(`td:eq(3)`).html(`<input id='telefone-${idLinha}' class="dataCertFim" type="text" value="${telefone}">`)
    $(this).parents('tr').find(`td:eq(4)`).html(`<input id='dataNasc-${idLinha}' type="number" value="${dataNasc}">`).mask('00/00/0000')
    $(this).parents('tr').find(`td:eq(5)`).html(`<input id='instituicao-${idLinha}' type="text" value="${instituicao}">`)
    $(this).parents('tr').find(`td:eq(6)`).html(`<input id='area-${idLinha}' type="text" value="${area}">`)
    $(this).parents('tr').find(`td:eq(7)`).html(`<input id='lattes-${idLinha}' type="text" value="${lattes}">`)
    
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    salvar.removeClass('hidden')
}

function ConfirmaCliente(){
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let salvar = $(`#edit-${idLinha}`);
        
    let nome = document.getElementById(`nome-${idLinha}`).value;
    let email = document.getElementById(`email-${idLinha}`).value;
    let documento = document.getElementById(`documento-${idLinha}`).value;
    let telefone = document.getElementById(`telefone-${idLinha}`).value;
    let dataNasc = document.getElementById(`dataNasc-${idLinha}`).value;
    let instituicao = document.getElementById(`instituicao-${idLinha}`).value;
    let area = document.getElementById(`area-${idLinha}`).value;
    let lattes = document.getElementById(`lattes-${idLinha}`).value

    dataClient[`${idLinha}`].nome = nome;
    dataClient[`${idLinha}`].email = email;
    dataClient[`${idLinha}`].documento = documento;
    dataClient[`${idLinha}`].telefone = telefone;
    dataClient[`${idLinha}`].dataNasc = dataNasc;
    dataClient[`${idLinha}`].instituicao = instituicao;
    dataClient[`${idLinha}`].area = area;
    dataClient[`${idLinha}`].lattes = lattes;

    localStorage.setItem('cliente', JSON.stringify(dataClient))
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    salvar.addClass('hidden')
}

function CancelaEditCliente(){
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

function DeletaCliente(){
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

function ConfirmaDelCliente(){
    let idLinha = $(this).data("id")
    let linha = $(`.linha-${idLinha}`)
    
    arrayTabela.splice(`${idLinha}`,1)
    localStorage.setItem('cliente', JSON.stringify(dataClient))  
    linha.remove()
}

function CancelaDelCliente(){
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

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="/html/cadastro_login.html"; //ou window.open("home.html") para abrir em uma nova aba
}