$(document).ready(function(){
    $(".cnpj").mask('00.000.000/0000-00');
    $(".cpf").mask('000.000.000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
});

function mostraCadastro(){
    $(".cadastro").show();
    $(".login").hide();
};

let dataClient = [];
let arrayTabela = [];
let dataBase = [];
let dataCerti = []; 
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
let usern = document.getElementById("cpf");
let pssw = document.getElementById("senha");

function Cliente(name, email, documento, telefone, dataNasc, instituicao, area, lattes, certificados){
    this.nome = name;
    this.email = email;
    this.documento = documento;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.instituicao = instituicao;
    this.area = area;
    this.lattes = lattes;
    this.certificados = certificados;
};

function User(name, email, senha, documento, telefone, area, site, certificados){
    this.nome = name;
    this.email = email;
    this.senha = senha;
    this.documento = documento;
    this.telefone = telefone;
    this.atuacao = area;
    this.site = site;
    this.certificados = certificados;
};

function Certificado(cpf, evento, dataI, dataF, horas, tipo){
    this.documento = cpf;
    this.evento = evento;
    this.dataIni = dataI;
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
};

function FormularioUsuario(){//cria o objeto a ser utilizado no cadastro
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;}); 
    let form = new User(user[0], user[1], user[2], user[4], user[5], user[6], user[7], user[8]); //mexer!!!
        return form; 
};

function CadastrarUser(){ //sistema para cadastrar um novo usuario.
    let novo = FormularioUsuario();
    
    if (localStorage.getItem("user") === null ){
        dataBase.push(novo);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        dataBase = JSON.parse(localStorage.getItem("user"));
        dataBase.push(novo);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    };        
};

function ValidPass(){
    let test = document.getElementById("senhac").value;
    let test2 = document.getElementById("passc").value;
    if(test !== test2){
        alert("Os campos de senha devem ser iguais!");
    };
};

function ChamarCnpj(){ //chama a função para validar o numero inserido de CNPJ			
    let cnpj = document.getElementById("documento").value;
    cnpj = cnpj.replace(".", "");
    cnpj = cnpj.replace(/[^\d]+/g,''); //transforma a mascara para fazer corretamente a checagem de CNPJ
    cnpj = cnpj.replace("-", "");
    ValidarCNPJ(cnpj);
    if (ValidarCNPJ(cnpj) !== true){
        alert("CNPJ Invalido!");
        cnpj = "";
    };
};

function ValidarCNPJ(cnpj) {
    if(cnpj == '') return false;
     
    if (cnpj.length !== 14) return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || 
        cnpj == "22222222222222" || cnpj == "33333333333333" || 
        cnpj == "44444444444444" || cnpj == "55555555555555" || 
        cnpj == "66666666666666" || cnpj == "77777777777777" || 
        cnpj == "88888888888888" || cnpj == "99999999999999") return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    };
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
    let usern = document.getElementById("documento");
    let pssw = document.getElementById("senha");

    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === usern.value){
            if(dataBase[i].senha === pssw.value){
                localStorage.setItem("online", JSON.stringify(dataBase[i]));
                location.href="/html/home.html";
            }else{
                alert("Senha Incorreta!");
            };
            break;
        }else{
            alert("Login Incorreto!");
        };
    };
};

function MostraPerfil(){
    let info = JSON.parse(localStorage.getItem("online"))
    document.getElementById("nome").value = info.nome;
    document.getElementById("email").value = info.email;
    document.getElementById("cnpj").value = info.documento;
    document.getElementById("telefone").value = info.telefone;
    document.getElementById("instituição").value = info.instituicao;
    document.getElementById("site").value = info.lattes;
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
// ambas as funçoes para testar a validação dos cpfs inceridos.
function Chamar(){
    var strCPF = document.getElementById("cpf").value;
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) == true) {
        alert("Você digitou um CPF Válido!");
    }else{
        alert("Você digitou um CPF Inválido!");
    }; 
};

function FormularioCertificados(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
    let form = new Certificado(dadosForm[0], dadosForm[1], dadosForm[2], dadosForm[3], dadosForm[4],dadosForm[5]);
    return form; 
};

function AdicionarCertificados(){ //adiciona certificados 
    let certificados = FormularioCertificados();
    if (localStorage.getItem('certificate') === null){
        dataCerti.push(certificados)
        localStorage.setItem('certificate', JSON.stringify(dataCerti));   
        alert("Certificado adicionado com Sucesso!");    
    }else{
        dataCerti = JSON.parse(localStorage.getItem('certificate')); 
        dataCerti.push(certificados) ;
        localStorage.setItem('certificate', JSON.stringify(dataCerti));   
        alert("Certificado adicionado com Sucesso!");
    };              
};

let myArray = getDataCertificate()
function getDataCertificate(){ //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    JSON.parse(localStorage.getItem("certificate")).forEach(function(info){ 
        array.push((info))});
    return arrayTabela;
}

$('th').on('click', function(){
    let coluna = $(this).data('coluna');
    let ordem = $(this).data('ordem');

    if(ordem == 'decr'){
        $(this).data('ordem', "cresc");
        myArray = myArray.sort((a,b) => a[coluna]>b[coluna] ? 1 : -1);
    }else{
        $(this).data('ordem', "decr");
        myArray = myArray.sort((a,b) => a[coluna]<b[coluna] ? 1 : -1);
    };  
    tabela(myArray);  
});

tabela(myArray);

function tabela(dados){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    for(var i=0; i< dados.length; i++){
        dados[i].id = `${i}`;
    
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
        $('#tabela').append(row);
        
        $(`#edita-${dados[i].id}`).on('click', EditarLinha);
        $(`#deleta-${dados[i].id}`).on('click', DeletaLinha);
        $(`#confirma-${dados[i].id}`).on('click', ConfirmaDel);
        $(`#cancela-${dados[i].id}`).on('click', CancelaDel);
        $(`#cancEdit-${dados[i].id}`).on('click', CancelaEdit);
        $(`#edit-${dados[i].id}`).on('click', ConfirmaEdicao);
    };
;}

function EditarLinha(){
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let salvar = $(`#edit-${idLinha}`);
    let cpf= arrayTabela[`${idLinha}`].documento;
    let evento = arrayTabela[`${idLinha}`].evento;
    let dataI = arrayTabela[`${idLinha}`].dataIni;
    let dataF = arrayTabela[`${idLinha}`].dataFim;
    let horas = arrayTabela[`${idLinha}`].horas;
    let tipo = arrayTabela[`${idLinha}`].tipo;
     
    $(this).parents('tr').find(`td:eq(0)`).html(`<input id='cpf-${idLinha}' type="text" value="${cpf}">`);
    $(this).parents('tr').find(`td:eq(1)`).html(`<input id='evento-${idLinha}' type="text" value="${evento}">`);
    $(this).parents('tr').find(`td:eq(2)`).html(`<input id='dataI-${idLinha}' class="dataCertInicio" "type="text" value="${dataI}">`);
    $(this).parents('tr').find(`td:eq(3)`).html(`<input id='dataF-${idLinha}' class="dataCertFim" type="text" value="${dataF}">`);
    $(this).parents('tr').find(`td:eq(4)`).html(`<input id='horas-${idLinha}' type="number" value="${horas}">`);
    $(this).parents('tr').find(`td:eq(5)`).html(`<input id='tipo-${idLinha}' type="text" value="${tipo}">`);
    editar.addClass('hidden');
    deletar.addClass('hidden');
    cancelar.removeClass('hidden');
    salvar.removeClass('hidden');
};

function ConfirmaEdicao(){
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let salvar = $(`#edit-${idLinha}`);
    let cpf =  document.getElementById(`cpf-${idLinha}`).value;
    let evento =  document.getElementById(`evento-${idLinha}`).value;
    let dataI =  document.getElementById(`dataI-${idLinha}`).value;
    let dataF =  document.getElementById(`dataF-${idLinha}`).value;
    let horas =  document.getElementById(`horas-${idLinha}`).value;
    let tipo =  document.getElementById(`tipo-${idLinha}`).value;

    arrayTabela[`${idLinha}`].documento = cpf;
    arrayTabela[`${idLinha}`].evento = evento;
    arrayTabela[`${idLinha}`].dataIni = dataI;
    arrayTabela[`${idLinha}`].dataFim = dataF;
    arrayTabela[`${idLinha}`].horas = horas;
    arrayTabela[`${idLinha}`].tipo = tipo;

    // myArray[idLinha].dataIni = $(this).parents('tr').find(`td:eq(2)`).html(`<input name='linha' type="date" value="${dataI}">`).val()
    // myArray[idLinha].dataFim = $(this).parents('tr').find(`td:eq(3)`).html(`<input name='linha' type="date" value="${dataF}">`).val()
    // myArray[idLinha].horas = $(this).parents('tr').find(`td:eq(4)`).html(`<input name='linha' type="number" value="${horas}">`).val()
    // myArray[idLinha].tipo = $(this).parents('tr').find(`td:eq(5)`).html(`<input name='linha' type="text" value="${tipo}">`).val()

    localStorage.setItem('certificate', JSON.stringify(arrayTabela));
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    salvar.addClass('hidden');
};

function CancelaEdit(){
    let idLinha = $(this).data('id');
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancEdit-${idLinha}`);
    let confirmar = $(`#confimEdit-${idLinha}`);
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    confirmar.addClass('hidden');
    //location.reload()
};

function DeletaLinha(){
    let idLinha = $(this).data("id");
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancela-${idLinha}`);
    let confirmar = $(`#confirma-${idLinha}`);
    editar.addClass('hidden');
    deletar.addClass('hidden');
    cancelar.removeClass('hidden');
    confirmar.removeClass('hidden');    
};

function ConfirmaDel(){
    let idLinha = $(this).data("id");
    let linha = $(`.linha-${idLinha}`);
    arrayTabela.splice(`${idLinha}`,1);
    localStorage.setItem('certificate', JSON.stringify(arrayTabela));  
    linha.remove();
};

function CancelaDel(){
    let idLinha = $(this).data("id");
    let editar = $(`#edita-${idLinha}`);
    let deletar = $(`#deleta-${idLinha}`);
    let cancelar = $(`#cancela-${idLinha}`);
    let confirmar = $(`#confirma-${idLinha}`);
    editar.removeClass('hidden');
    deletar.removeClass('hidden');
    cancelar.addClass('hidden');
    confirmar.addClass('hidden');  
};

function RemoveCert(){
   let confirm = prompt("Digite o nome do evento para confirmar:");
    for (let i=0; i < dataCerti.length; i++){       
        if(Object.keys(dataCerti[i].evento) === confirm){
            dataCerti.splice(dataCerti[i],1);
            alert(dataCerti);
        };
    };   
};

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="/html/cadastro_login.html"; //ou window.open("home.html") para abrir em uma nova aba
};