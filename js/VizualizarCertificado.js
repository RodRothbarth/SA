let dataCerti = []

function Certificado(evento, dataI, dataF, horas, tipo){
    this.evento = evento;
    this.dataIni = dataI
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
}

function contForm(){
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let inicioEvento = new Date(dadosForm[1].split('-').join('/')).toLocaleDateString('pt-br')
        let fimEvento = new Date(dadosForm[2].split('-').join('/')).toLocaleDateString('pt-br')
        let form = new Certificado(dadosForm[0],inicioEvento, fimEvento,dadosForm[3],dadosForm[4])
        return form 
}

function Add(){ //adicopnar certificados (array para os certificados)
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

function RemoveCert(){
    //.deleterow(row.rowindex) verificar 
    let confirm = prompt("Digite o nome do evento para confirmar:");
     for (let i=0; i < dataCerti.length; i++){
         
         if(Object.values(dataCerti[i].evento) === confirm){
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
    location.href="/html/VizualizarCertificado.html"; //ou window.open("home.html") para abrir em uma nova aba
}