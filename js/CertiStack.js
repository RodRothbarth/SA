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
}

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
}

function User(name, email, senha, documento, telefone, area, site, certificados){
    this.nome = name;
    this.email = email;
    this.senha = senha;
    this.documento = documento;
    this.telefone = telefone;
    this.atuacao = area;
    this.site = site;
    this.certificados = certificados;
}

function Certificado(cpf, evento, dataI, dataF, horas, tipo){
    this.documento = cpf;
    this.evento = evento;
    this.dataIni = dataI
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
}

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
        dataBase = JSON.parse(localStorage.getItem("user"))
        dataBase.push(novo);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }        
}

function ValidPass(){
    let test = document.getElementById("senhac").value;
    let test2 = document.getElementById("passc").value;
    if(test !== test2){
        alert("Os campos de senha devem ser iguais!")
    }
}

function ChamarCnpj(){
				
    let cnpj = document.getElementById("documento").value;
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
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || 
        cnpj == "22222222222222" || cnpj == "33333333333333" || 
        cnpj == "44444444444444" || cnpj == "55555555555555" || 
        cnpj == "66666666666666" || cnpj == "77777777777777" || 
        cnpj == "88888888888888" || cnpj == "99999999999999") return false;
         
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
    let usern = document.getElementById("documento");
    let pssw = document.getElementById("senha");

    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === usern.value){
            if(dataBase[i].senha === pssw.value){
                localStorage.setItem("online", JSON.stringify(dataBase[i]))
                location.href="/html/home.html";
            }else{
                alert("Senha Incorreta!");
            };
            break;
        }else{
            alert("Login Incorreto!")
        };
    };

};

function MostraPerfil(){
    let info = JSON.parse(localStorage.getItem("online"))
    document.getElementById("nome").value = info.nome
    document.getElementById("email").value = info.email
    document.getElementById("cnpj").value = info.documento
    document.getElementById("telefone").value = info.telefone
    document.getElementById("instituição").value = info.instituicao
    document.getElementById("site").value = info.lattes
    
}

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
        alert("Você digitou um CPF Válido!")
    }else{
        alert("Você digitou um CPF Inválido!")
    } 
}

function FormularioCertificados(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let inicioEvento = new Date(dadosForm[2].split('-').join('/')).toLocaleDateString('pt-br')
        let fimEvento = new Date(dadosForm[3].split('-').join('/')).toLocaleDateString('pt-br')
        let form = new Certificado(dadosForm[0], dadosForm[1], inicioEvento, fimEvento, dadosForm[4],dadosForm[5])
        return form 
}

function AdicionarCertificados(){ //adiciona certificados 
    let certificados = FormularioCertificados()
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
        array.push((info))
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

        let row = `<tr> 
                        <td>${dados[i].evento}</td> 
                        <td>${dados[i].dataIni}</td> 
                        <td>${dados[i].dataFim}</td> 
                        <td>${dados[i].horas}</td> 
                        <td>${dados[i].tipo}</td> 
                        <td>${"<img onclick='aqui()' src='/imagens/edit.png'>"}, ${"<img onclick='aqui()' src='/imagens/lixo.png'>"} </td> 
                         
                   </tr>`
        tabela.innerHTML += row
    }
}

function RemoveCert(){
    
   let confirm = prompt("Digite o nome do evento para confirmar:");
    for (let i=0; i < dataCerti.length; i++){
        
        if(Object.keys(dataCerti[i].evento) === confirm){
            dataCerti.splice(dataCerti[i],1);
            alert(dataCerti);
        };
    };   
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="/html/cadastro_login.html"; //ou window.open("home.html") para abrir em uma nova aba
}