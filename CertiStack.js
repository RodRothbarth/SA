$(document).ready(function(){
    $(".cpf_certificado").mask('000.000.000-00');
    $(".cpfParticipente").mask('000.000.000-00');
    $(".cnpj_login").mask('00.000.000/0000-00');
    $(".documento").mask('00.000.000/0000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".telefoneCliente").mask('(00) 00000-0000')
    $(".data-inicio").mask("00/00/0000");
    $(".data-fim").mask("00/00/0000");
    $(".data-nasc").mask("00/00/0000");
})

function rollInfos(){
    window.scrollTo({
        top: 860,
        behavior: "smooth"
    })
}

$(document).ready(function(){
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        fade: true
    });
});

function mostraHome(){
    $(".container-perfil").hide();
    $(".certificados").hide();
    $(".participantes").hide();
    $(".home").show();
}

function mostraWelcome(){
    $(".login").hide();
    $(".cadastro").hide();
    $(".apresentacao").show();
    $(".seta").hide();
}

function mostraLogin(){
    $(".seta").show();
    $(".login").show();
    $(".apresentacao").hide();
}

function mostraCadastro(){
    $(".cadastro").show();
    $(".seta").show();
    $(".apresentacao").hide();
    $(".login").hide();
}


let dataClient = [];
let dataBase = [];
let dataCerti = []; 
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
let usern = document.getElementById("cpf");
let pssw = document.getElementById("senha");

function Cliente(name, documento, email, dataNasc, telefone, instituicao, area, lattes, id){
    this.nome = name;
    this.email = email;
    this.documento = documento;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.instituicao = instituicao;
    this.area = area;
    this.lattes = lattes;
    this.id = id;
};

function User(name, email, senha, telefone, documento, centro_ensino, departamento, tipo, site, id){
    this.nome = name;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.documento = documento;
    this.centro_ensino = centro_ensino;
    this.departamento = departamento;
    this.atuacao = tipo;
    this.site = site;
    this.id = id;
};

function Certificado(documento, evento, tipo, dataI, dataF, horas, id){
    this.documento = documento;
    this.evento = evento;
    this.dataIni = dataI;
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
    this.id = id;
};

function FormularioUsuario(){//cria o objeto a ser utilizado no cadastro
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;}); 
    let form = new User(user[0], user[1], user[2], user[4], user[5], user[6], user[7], user[8], user[9]); //mexer!!!
        return form; 
};
function test(){
    
    dataBase = JSON.parse(localStorage.getItem("user"))
    
    for(let i=0;i<dataClient.length;i++){
        let existe = dataBase[i].documento.includes(novo.documento)
        if(existe === true){
            alert("participante ja cadastrado")
        }
    }    

}
function CadastrarUser(){ //sistema para cadastrar um novo usuario.
    let novo = FormularioUsuario();
    dataBase = JSON.parse(localStorage.getItem("user"));
    
    if (localStorage.getItem("user") === null ){
        dataBase.push(novo);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        for(let i=0;i<dataBase.length;i++){
            let existe = dataBase[i].documento.includes(novo.documento)
            if(existe === true){
                alert("Usuário já cadastrado")
            }else{
                dataBase.push(novo);
                localStorage.setItem("user", JSON.stringify(dataBase));
                alert("Cadastro Realizado com Sucesso!");
                $(".login").show();
                $(".cadastro").hide();
            }
        }
        
    };        
};

function ValidPass(){
    let test = document.getElementById("senhac").value;
    let test2 = document.getElementById("passc").value;
    if(test !== test2){
        alert("Os campos de senha devem ser iguais!");
    };
};

function ChamarCnpj(){			
    let cnpj = document.getElementById("cnpj_cadastro").value;
    cnpj = cnpj.replace(".", "");
    cnpj = cnpj.replace(/[^\d]+/g,'');
    cnpj = cnpj.replace("-", "");
    ValidarCNPJ(cnpj)
    if (ValidarCNPJ(cnpj) !== true){
        alert("CNPJ Invalido!")
        cnpj = ""
    }
}

function ChamarCnpjLogin(){			
    let cnpj = document.getElementById("cnpj_login").value;
    cnpj = cnpj.replace(".", "");
    cnpj = cnpj.replace(/[^\d]+/g,'');
    cnpj = cnpj.replace("-", "");
    ValidarCNPJ(cnpj)
    if (ValidarCNPJ(cnpj) !== true){
        alert("CNPJ Invalido!")
        cnpj = ""
    }
}

function ValidarCNPJ(cnpj) {
 
    if(cnpj == '') return false;
     
    if (cnpj.length !== 14) return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999") return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;
           
    return true;
    
}

function Validation(){//valida o login para entrada no perfil do usuario ou cliente desejado
    dataBase = JSON.parse(localStorage.getItem('user'));
    let usern = document.getElementById("cnpj_login").value;
    let pssw = document.getElementById("senha").value;

    for(let i = 0; i < dataBase.length; i++){
        dataBase[i].id = dataBase.indexOf(dataBase[i])
        localStorage.setItem("user", JSON.stringify(dataBase));
        if(dataBase[i].documento === usern){
            if(dataBase[i].senha === pssw){
                localStorage.setItem("online", JSON.stringify(dataBase[i]));
                location.href="home.html";
            }else{
                alert("Senha Incorreta!");
            };
            break;
        }else{
            alert("Login Incorreto!");
        };
    };
};

function PerfilOnline(){
    dataBase = JSON.parse(localStorage.getItem("user"))
    let info = JSON.parse(localStorage.getItem("online"))
    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === info.documento){
            document.getElementById("nome_usuario").innerHTML = dataBase[i].departamento;
            document.getElementById("nome").value = dataBase[i].nome;
            document.getElementById("email").value = dataBase[i].email;
            document.getElementById("cnpj").value = dataBase[i].documento;
            document.getElementById("telefone").value = dataBase[i].telefone;
            document.getElementById("centro").value = dataBase[i].centro_ensino;
            document.getElementById("departamento").value = dataBase[i].departamento;
            document.getElementById("site").value = dataBase[i].site;
        };
    };
};

function EditarPerfil(){
    $("#nome").removeAttr("readonly");
    $("#email").removeAttr("readonly");
    $("#cnpj").removeAttr("readonly");
    $("#telefone").removeAttr("readonly");
    $("#centro").removeAttr("readonly");
    $("#departamento").removeAttr("readonly");
    $("#site").removeAttr("readonly");
    $("#salvar").show();
    $("#editar").hide();
    $("#confirma-senha").show();
}

function ComfirmaEditarPerfil(){
    dataBase = JSON.parse(localStorage.getItem("user"));
    let info = JSON.parse(localStorage.getItem("online"));
    let confirmacao = document.getElementById("confirma-senha").value;
    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === info.documento){
            if(confirmacao === dataBase[i].senha ){
                dataBase[i].email = document.getElementById("email").value;
                dataBase[i].documento = document.getElementById("cnpj").value;
                dataBase[i].telefone = document.getElementById("telefone").value;
                dataBase[i].centro_ensino = document.getElementById("centro").value;
                dataBase[i].departamento = document.getElementById("departamento").value;
                dataBase[i].site = document.getElementById("site").value;
                dataBase[i].departamento = document.getElementById("nome_usuario").innerHTML;
                localStorage.setItem('user', JSON.stringify(dataBase));
                localStorage.setItem('online', JSON.stringify(dataBase[i])); 
                if(document.getElementById('deletar').checked === true){
                    DeletarUser();
                };
            };
        };
    };
    $("#nome").attr('readonly', true);
    $("#email").attr('readonly', true);
    $("#cnpj").attr('readonly', true);
    $("#telefone").attr('readonly', true);
    $("#centro").attr('readonly', true);
    $("#departamento").attr('readonly', true);
    $("#site").attr('readonly', true);
    $("#salvar").hide();
    $("#editar").show();
    $("#confirma-senha").hide();
};

function DeletarUser(){
    dataBase = JSON.parse(localStorage.getItem("user"))
    let info = JSON.parse(localStorage.getItem("online"))
    let url = 'cadastro-login.html';
    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === info.documento){
            console.log("dasfd")
            dataBase.splice(dataBase[i],1)
            localStorage.setItem('user', JSON.stringify(dataBase)) 
            localStorage.removeItem("online");
            history.replaceState(null, '', url);
            location.href = "cadastro-login.html";
        };
    };
};

function TestaCPF(strCPF) {
    var Soma = 0;
    var Resto;
    
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
// ambas as funçoes para testar a validação dos cpfs inseridos.
function ValidarCpf(){
    var strCPF = document.getElementById("cpf").value;
    strCPF = strCPF.replace(".", "");
    strCPF = strCPF.replace(/[^\d]+/g,'');
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) !== true) {
        alert("Você digitou um CPF Inválido!");
        strCPF = ''
    }; 
};

function FormularioCertificados(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
    let form = new Certificado(dadosForm[0], dadosForm[1], dadosForm[2], dadosForm[3], dadosForm[4], dadosForm[5], dadosForm[6]);
    return form; 
};

function AdicionarCertificados(){ //adiciona certificados 
    let certificados = FormularioCertificados();
    if (localStorage.getItem('certificate') === null){ //se o localStorage nao existir, cria-se um
        dataCerti.push(certificados)
        localStorage.setItem('certificate', JSON.stringify(dataCerti));   
        alert("Certificado adicionado com Sucesso!");    
    }else{ //se ele existir, recupera a informação e adiciona a nova
        dataCerti = JSON.parse(localStorage.getItem('certificate')); 
        dataCerti.push(certificados) ;
        localStorage.setItem('certificate', JSON.stringify(dataCerti));   
        alert("Certificado adicionado com Sucesso!");
    };              
};

function getDataCertificate(){ //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    JSON.parse(localStorage.getItem("certificate")).forEach(function(info){ 
        dataCerti.push((info))
    });
    return dataCerti;
}

$('#cet-table').on('click', function(){ //permite que a tabela seja organizada pela ordem desejada
    let coluna = $(this).data('coluna');
    let ordem = $(this).data('ordem');

    if(ordem == 'decr'){
        $(this).data('ordem', "cresc")
        dataCerti = dataCerti.sort((a,b) => a[coluna]>b[coluna] ? 1 : -1)
    }else{
        $(this).data('ordem', "decr")
        dataCerti = dataCerti.sort((a,b) => a[coluna]<b[coluna] ? 1 : -1)
    }  
    Criatabela(dataCerti)  
})

function Criatabela(dados){ // função que cria a tabela para os certificados
    let tabela = document.getElementById("tabelaCertificados")
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
                            <img id="edita-${dados[i].id}" src='imagens/edit.png' style="padding-left: 10px;" class='' data-id="${dados[i].id}">
                            <img id="deleta-${dados[i].id}"  src='imagens/lixo.png' style="padding-left: 10px;" class='' data-id="${dados[i].id}">
                            <img id="confirma-${dados[i].id}"  src='imagens/certo.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}"> 
                            <img id="cancela-${dados[i].id}"  src='imagens/errado.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">    
                            <img id="cancEdit-${dados[i].id}"  src='imagens/errado.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">    
                            <img id="edit-${dados[i].id}" src='imagens/certo.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">  
                        </td> 
                         
                   </tr>`
        $('#tabelaCertificados').append(row)
        
        $(`#deleta-${dados[i].id}`).on('click', DeletaLinha)
        $(`#edita-${dados[i].id}`).on('click', EditarLinha)
        $(`#confirma-${dados[i].id}`).on('click', ConfirmaDel)
        $(`#cancela-${dados[i].id}`).on('click', CancelaDel)
        $(`#cancEdit-${dados[i].id}`).on('click', CancelaEdit)
        $(`#edit-${dados[i].id}`).on('click', ConfirmaEdicao)
    }
}

function EditarLinha(){ //abre a linha de edição para os certificados
    let idLinha = $(this).data('id')
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancEdit-${idLinha}`)
    let salvar = $(`#edit-${idLinha}`)
    let cpf= dataCerti[`${idLinha}`].documento
    let evento = dataCerti[`${idLinha}`].evento
    let dataI = dataCerti[`${idLinha}`].dataIni
    let dataF = dataCerti[`${idLinha}`].dataFim
    let horas = dataCerti[`${idLinha}`].horas
    let tipo = dataCerti[`${idLinha}`].tipo    
     
    $(this).parents('tr').find(`td:eq(0)`).html(`<input id='cpf-${idLinha}' type="text" value="${cpf}" >`);
    $(this).parents('tr').find(`td:eq(1)`).html(`<input id='evento-${idLinha}' type="text" value="${evento}" >`);
    $(this).parents('tr').find(`td:eq(2)`).html(`<input id='dataI-${idLinha}' class="dataCertInicio data-inicio" "type="text" value="${dataI}" >`).mask('00/00/0000');
    $(this).parents('tr').find(`td:eq(3)`).html(`<input id='dataF-${idLinha}' class="dataCertFim data-fim" type="text" value="${dataF}" >`).mask('00/00/0000');
    $(this).parents('tr').find(`td:eq(4)`).html(`<input id='horas-${idLinha}' type="number" value="${horas}" >`);
    $(this).parents('tr').find(`td:eq(5)`).html(`<input id='tipo-${idLinha}' type="text" value="${tipo}" >`);
    
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    salvar.removeClass('hidden')
}

function ConfirmaEdicao(){//confirma a edição feita nas linhas da table
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

    dataCerti[`${idLinha}`].documento = cpf
    dataCerti[`${idLinha}`].evento = evento
    dataCerti[`${idLinha}`].dataIni = dataI
    dataCerti[`${idLinha}`].dataFim = dataF
    dataCerti[`${idLinha}`].horas = horas
    dataCerti[`${idLinha}`].tipo = tipo

    localStorage.setItem('certificate', JSON.stringify(dataCerti))
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    salvar.addClass('hidden');
    location.reload();
}

function CancelaEdit(){ //cancela a opção de edição
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let confirmar = $(`#edit-${idLinha}`);
    
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    confirmar.addClass('hidden');
    location.reload();
}

function DeletaLinha(){ // ldeleta as informação do certificado desejado
    let idLinha = $(this).data("id")
    let editar = $(`#edita-${idLinha}`)
    let deletar = $(`#deleta-${idLinha}`)
    let cancelar = $(`#cancela-${idLinha}`)
    let confirmar = $(`#confirma-${idLinha}`)

    editar.addClass('hidden');
    deletar.addClass('hidden');
    cancelar.removeClass('hidden');
    confirmar.removeClass('hidden');   
}

function ConfirmaDel(){ // confirma a deleção do item da tabela
    let idLinha = $(this).data("id")
    let linha = $(`.linha-${idLinha}`)
    
    dataCerti.splice(`${idLinha}`,1)
    localStorage.setItem('certificate', JSON.stringify(dataCerti))  
    linha.remove()
}

function CancelaDel(){ // cancela a atribuição de deleção do item da tabela
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

function FormularioCliente(){
    let cliente = Array.from(document.getElementsByName("cadastroParticipante")).map(function(element){return element.value;});
    let form = new Cliente(cliente[0],cliente[1],cliente[2],cliente[3],cliente[4],cliente[5],cliente[6],cliente[7])
        return form;
}

function CadastrarCliente(){ //sistema para cadastrar um novo usuario.
    let cliente = FormularioCliente()  
    dataClient = JSON.parse(localStorage.getItem("cliente")) 
        
    if (localStorage.getItem("cliente") === null ){ //cria um localStorage cliente se inexistente
        dataClient.push(cliente);
        localStorage.setItem("cliente", JSON.stringify(dataClient));
        alert("Cadastro Realizado com Sucesso!");
    }else{ // adiciona novos parametros no localStorage cliente
    
        for(let i=0;i<dataClient.length;i++){
            let existe = dataClient[i].documento.includes(cliente.documento)
            if(existe === true){
                alert("Participante já cadastrado!")
            }else{
                dataClient.push(cliente);
                localStorage.setItem("cliente", JSON.stringify(dataClient));
                alert("Cadastro Realizado com Sucesso!");
            }
        }   
    }        
}

function getDataCliente(){ //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    JSON.parse(localStorage.getItem("cliente")).forEach(function(info){ 
        dataClient.push((info))
    });
    return dataClient;
}

$('#client-table').on('click', function(){ // organiza a tabela 
    let coluna = $(this).data('coluna');
    let ordem = $(this).data('ordem');

    if(ordem == 'decr'){
        $(this).data('ordem', "cresc")
        dataClient = dataClient.sort((a,b) => a[coluna]>b[coluna] ? 1 : -1)
    }else{
        $(this).data('ordem', "decr")
        dataClient = dataClient.sort((a,b) => a[coluna]<b[coluna] ? 1 : -1)
    }  
    tabelaParticipantes(dataClient)  
})

function tabelaParticipantes(dados){ //cria a tabela de participantes de eventos
    let tabela = document.getElementById("tabela-cliente")
    tabela.innerHTML = ""
    for(var i=0; i< dados.length; i++){
        dados[i].id = `${i}`
    
       var row = `<tr class="linha-${dados[i].id}"> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].nome}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].documento}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].email}</td>
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].dataNasc}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].telefone}</td>  
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].instituicao}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].area}</td> 
                        <td name='linha-${dados[i].id}' data-id="${dados[i].id}" >${dados[i].lattes}</td> 
                         
                        <td>
                            <img id="editCliente-${dados[i].id}"  src='imagens/edit.png'  style="padding-left: 10px;" class='' data-id="${dados[i].id}">
                            <img id="deletaCliente-${dados[i].id}"  src='imagens/lixo.png' style="padding-left: 10px;" class='' data-id="${dados[i].id}">
                            <img id="confirmaDelCliente-${dados[i].id}"  src='imagens/certo.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}"> 
                            <img id="cancelaDelCliente-${dados[i].id}"  src='imagens/errado.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">    
                            <img id="cancEditCliente-${dados[i].id}"  src='imagens/errado.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">    
                            <img id="ConfirmaEditCliente-${dados[i].id}" src='imagens/certo.png' style="padding-left: 10px;" class='hidden' data-id="${dados[i].id}">  
                        </td> 
                         
                   </tr>`
        $('#tabela-cliente').append(row)

        $(`#editCliente-${dados[i].id}`).on('click', EditarCliente)
        $(`#ConfirmaEditCliente-${dados[i].id}`).on('click', ConfirmaCliente)
        $(`#cancEditCliente-${dados[i].id}`).on('click', CancelaEditCliente)
        $(`#deletaCliente-${dados[i].id}`).on('click', DeletaCliente)
        $(`#confirmaDelCliente-${dados[i].id}`).on('click', ConfirmaDelCliente)
        $(`#cancelaDelCliente-${dados[i].id}`).on('click', CancelaDelCliente) 
    }
}

function EditarCliente(){
    let idLinha = $(this).data('id')
    let editar = $(`#editCliente-${idLinha}`)
    let deletar = $(`#deletaCliente-${idLinha}`)
    let cancelar = $(`#cancEditCliente-${idLinha}`)
    let salvar = $(`#ConfirmaEditCliente-${idLinha}`)
    let nome = dataClient[`${idLinha}`].nome;
    let email = dataClient[`${idLinha}`].email;
    let documento = dataClient[`${idLinha}`].documento;
    let telefone = dataClient[`${idLinha}`].telefone;
    let dataNasc = dataClient[`${idLinha}`].dataNasc;
    let instituicao = dataClient[`${idLinha}`].instituicao;
    let area = dataClient[`${idLinha}`].area;
    let lattes = dataClient[`${idLinha}`].lattes;     
     
    $(this).parents('tr').find(`td:eq(0)`).html(`<input id='nome-${idLinha}' type="text" value="${nome}">`)
    $(this).parents('tr').find(`td:eq(1)`).html(`<input style="width:120px"id='documento-${idLinha}'  "type="text" value="${documento}">`)
    $(this).parents('tr').find(`td:eq(2)`).html(`<input style="width:150px"id='email-${idLinha}' type="text" value="${email}">`)
    $(this).parents('tr').find(`td:eq(3)`).html(`<input style="width:100px"id='dataNasc-${idLinha}' type="text" value="${dataNasc}">`).mask('00/00/0000')
    $(this).parents('tr').find(`td:eq(4)`).html(`<input style="width:100px"id='telefone-${idLinha}'  type="text" value="${telefone}">`)
    $(this).parents('tr').find(`td:eq(5)`).html(`<input style="width:100px"id='instituicao-${idLinha}' type="text" value="${instituicao}">`)
    $(this).parents('tr').find(`td:eq(6)`).html(`<input style="width:100px"id='area-${idLinha}' type="text" value="${area}">`)
    $(this).parents('tr').find(`td:eq(7)`).html(`<input style="width:100px"id='lattes-${idLinha}' type="text" value="${lattes}">`)
    
    editar.addClass('hidden');
    deletar.addClass('hidden');
    cancelar.removeClass('hidden');
    salvar.removeClass('hidden');
}

function ConfirmaCliente(){
    let idLinha = $(this).data('id');
    let editar = $(`#editCliente-${idLinha}`);
    let deletar = $(`#deletaCliente-${idLinha}`);
    let cancelar = $(`#cancEditCliente-${idLinha}`);
    let salvar = $(`#ConfirmaEditCliente-${idLinha}`);
        
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
    location.reload();
}

function CancelaEditCliente(){
    let idLinha = $(this).data('id')
    let editar = $(`#editCliente-${idLinha}`)
    let deletar = $(`#deletaCliente-${idLinha}`)
    let cancelar = $(`#cancEditCliente-${idLinha}`)
    let confirmar = $(`#ConfirmaEditCliente-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    confirmar.addClass('hidden')
    location.reload();
}

function DeletaCliente(){
    let idLinha = $(this).data("id")
    let editar = $(`#editCliente-${idLinha}`)
    let deletar = $(`#deletaCliente-${idLinha}`)
    let cancelar = $(`#cancelaDelCliente-${idLinha}`)
    let confirmar = $(`#confirmaDelCliente-${idLinha}`)
    
    editar.addClass('hidden')
    deletar.addClass('hidden')
    cancelar.removeClass('hidden')
    confirmar.removeClass('hidden')    
}

function ConfirmaDelCliente(){
    let idLinha = $(this).data("id")
    let linha = $(`.linha-${idLinha}`)
    
    dataClient.splice(`${idLinha}`,1)
    localStorage.setItem('cliente', JSON.stringify(dataClient))  
    linha.remove()
}

function CancelaDelCliente(){
    let idLinha = $(this).data("id")
    let editar = $(`#editCliente-${idLinha}`)
    let deletar = $(`#deletaCliente-${idLinha}`)
    let cancelar = $(`#cancelaDelCliente-${idLinha}`)
    let confirmar = $(`#confirmaDelCliente-${idLinha}`)
    
    editar.removeClass('hidden')
    deletar.removeClass('hidden')
    cancelar.addClass('hidden')
    confirmar.addClass('hidden')  
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    let url = 'cadastro-login.html';
    location.href = "cadastro-login.html"; //ou window.open("home.html") para abrir em uma nova aba
    history.replaceState(null, '', url)
};