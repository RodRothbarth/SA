$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(99) 99999-9999');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];
let dataCerti = []; 

function User (name, cpf, email, dataNasc, interrest, pswd, university, lattes){ //função construtora para o cadastro.
    this.nome = name;
    this.cpf = cpf;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9]));
    localStorage.setItem("user", JSON.stringify(dataBase));
    alert("Cadastro Realizado com Sucesso!");
}

function validation(){
//validação de login e senha para entrar na area de perfil.
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");
    for (i = 0; i <= dataBase.length; i++){
        if(i == dataBase.length){
            alert("Login Incorreto");
        }else if (dataBase[i].cpf == usern.value || dataBase[i].email == usern.value){
            if(dataBase[i].pswd == pssw.value){
                console.log("Sucesso");
                localStorage.setItem('user', JSON.stringify(dataBase[i]));
                location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
            }else{
                alert("Senha Incorreta");
            }
            break;
        } 
    }
    usern.value = "";
    pssw.value = "";
}

function Exit(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.remove("user");
    location.href="home.html"; //ou window.open("home.html") para abrir em uma nova aba
}

// function AddHour(event, hour, type, date){
//     this.evento = event;
//     this.data = date;
//     this.horas = hour;
//     this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
// }

function Add(){ //adicopnar certificados (array para os certificados)
    let certificado;
    Array.from(document.getElementsByName("addCerti")).forEach(function(element){
    certificado[element.keys] = element.value;});
    // let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
    //     return element.value;});
    console.log(certificado)
    if (certificado){
        if (localStorage.getItem("certificate") === null ){
            dataCerti.push(certificado);
                localStorage.setItem("certificate", JSON.stringify(dataCerti));
                alert("Certificado adicionado com Sucesso!");
        } else { 
            dataCerti = JSON.parse(localStorage.getItem("certificate"));  
            dataCerti.push(certificado);
                localStorage.setItem("certificate", JSON.stringify(dataCerti));
                alert("Certificado adicionado com Sucesso!");
        }
    }else{  
        alert("Todos os campos devem ser preenchidos.");
        }  
            
}
function RemoveCert(){
    localStorage.removeItem("certificate")
    let confirm = prompt("Digite o nome do evento para confirmar:")
    
    for (let i=0; i > dataCerti.length; i++){
        if(dataCerti[i].evento === confirm){
            localStorage.removeItem("certificate")
        }
    }
}
   
function Teste(){
    localStorage.removeItem("certificate")
}

let linhasTabela = getDataCertificate()

function getDataCertificate() {
    return JSON.parse(localStorage.getItem("certificate"));
}

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