// $(document).ready(function(){
//     $('.CPF').mask('000.000.000-00');
//     $('.numCelular').mask('(99) 99999-9999');
//   });

let dataBase = [];
let dataCerti = []; 

function User (name, cpf, email, cellphone, dataNasc, pswd, lattes, interrest, university ){ //função construtora para o cadastro.
    this.nome = name;
    this.cpf = cpf;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
    this.celular = cellphone;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9]));
    localStorage.setItem("user", JSON.stringify(dataBase));
    alert("Cadastro Realizado com Sucesso!");
}

function Validation(){
//validação de login e senha para entrar na area de perfil.
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");
    for (i = 0; i <= dataBase.length; i++){
        if(i == dataBase.length){
            alert("Login Incorreto");
        }else if (dataBase[i].cpf == usern.value || dataBase[i].email == usern.value){
            if(dataBase[i].pswd == pssw.value){
                console.log("Sucesso");
                localStorage.setItem('online', JSON.stringify(dataBase[i]));
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

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="index.html"; //ou window.open("home.html") para abrir em uma nova aba
}

function AddHour(event, beginEvent, endEvent, hour, type){
    this.evento = event;
    this.beginEvent = beginEvent;
    this.endEvent = endEvent;
    this.horas = hour;
    this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
}

function Add(){

    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let day1 = new Date(document.getElementById("day1").value.split('-').join('/')) 
        let dataFormatada = ("0" + day1.getDate()).substr(-2) + "/" 
        + ("0" + (day1.getMonth() + 1)).substr(-2) + "/" + day1.getFullYear();
        let day2 = new Date(document.getElementById("day2").value.split('-').join('/'))
        let dayFormat = ("0" + day2.getDate()).substr(-2) + "/" 
        + ("0" + (day2.getMonth() + 1)).substr(-2) + "/" + day2.getFullYear(); //uso para formatar a data em pt-br

    if (certificado[0] && certificado[1] && dayFormat && dataFormatada){
    
        if (localStorage.getItem("certificate") === null){
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]))
                localStorage.setItem("certificate", JSON.stringify(dataCerti))
                alert("oi estou aqui")
        } else { 
            let qwe =  JSON.parse(localStorage.getItem("certificate"))
            alert(localStorage)
            dataCerti.push(new AddHour (qwe))
            localStorage.setItem("certificate", JSON.stringify(dataCerti))   
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]))
            localStorage.setItem("certificate", JSON.stringify(dataCerti))
            alert("entrei")
        }
    }else{  
            alert("Todos os campos devem ser preenchidos.")
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
// if(localStorage.certificate === undefined ){alert("aqui!")
// }else {localStorage.remove("certificate")}

function Add(){ //adicona certificados no cadastro do cliente (array para os certificados)
    
    //  Array.from(document.getElementsByName("addCerti")).forEach(function(element){
    //     certificado[element.keys] = element.value;});
    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
         return element.value;}); //tentar pegar direto do formulario 
    if (certificado){

        let update = JSON.parse(localStorage.getItem("online"))
        dataCerti.push(certificado);
        update.certificados = dataCerti;    
        alert("Certificado adicionado com Sucesso!");
        //adicionar no objeto 'user.certificado"

    }else{  
        alert("Todos os campos devem ser preenchidos.");
    }              
}

function RemoveCert(){ // remove do cadastro o certificado desejado
    
    let confirm = prompt("Digite o nome do evento para confirmar:");
     for (let i=0; i < dataCerti.length; i++){
         
         if(Object.keys(dataCerti[i].evento) === confirm){
             dataCerti.splice(dataCerti[i],1);
             alert(dataCerti);
         };
     };   
 }

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    dataBase = JSON.parse(localStorage.getItem("user"))
    for(let i =0; i < dataBase.length; i++){
        if (dataBase[i].documento === JSON.parse(localStorage.getItem("online")).documento){
            dataBase[i] = JSON.parse(localStorage.getItem("online"))
        }
    }
    localStorage.removeItem("online");
    location.href="index.html"; //ou window.open("home.html") para abrir em uma nova aba
}


function getDataCertificate() {
    let array = [];
    
    JSON.parse(localStorage.getItem("certificate")).forEach(function(info){ 
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