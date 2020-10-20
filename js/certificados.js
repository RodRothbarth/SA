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


// criação de tabela para mostrar os certificados que estao no cadastro.
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