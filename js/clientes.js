$(document).ready(function(){
    $(".cpf").mask('000.000.000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

  const dataClient = []; //ou deixar let?

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

function getDataCertificate() {
    let array = [];

    JSON.parse(localStorage.getItem("cliente")).forEach(function(info){ 
        array.push(Object.values(info))
    });

    return array;
}


let linhasTabela = getDataCertificate() //criação de tabela para mostrar os certificados armazenados no perfil do cliente.

function criaTag(elemento) {
    return document.createElement(elemento)
}
        
let titulo = document.querySelector("h1"); 
let tabela = document.getElementById("tabela");    
let thead = criaTag("thead");
let tbody = criaTag("tbody");
let tfoot = criaTag("tfoot");    
let indicesTabela = ["Evento", "Data Inicial", "Data Final", "Horas", "Tipo"];   
let linhaHead = criaTag("tr");
        
function criaCelula(tag, text) {
    tag = criaTag(tag);
    tag.textContent = text;
    return tag;
}
    
for(j = 0; j < indicesTabela.length; j++) {
    let th = criaCelula("th", indicesTabela [j]);
    linhaHead.appendChild(th);
}
thead.appendChild(linhaHead);

for(j = 0; j < linhasTabela.length; j++) {
    let linhaBody = criaTag("tr");

    for(i = 0; i < linhasTabela[j].length; i++) {
        cel = criaCelula("td", linhasTabela[j][i]);
        linhaBody.appendChild(cel); 
    }
    tbody.appendChild(linhaBody);
}
let linhaFoot = criaTag("tr");
let celulaFoot = criaCelula("td","Certistack");
celulaFoot.setAttribute("colspan",5);
linhaFoot.appendChild(celulaFoot);
tfoot.appendChild(linhaFoot);
    
tabela.appendChild(thead);
tabela.appendChild(tbody);
tabela.appendChild(tfoot);