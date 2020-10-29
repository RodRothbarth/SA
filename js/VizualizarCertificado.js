let dataCerti = [];
let array = [];

function Certificado(evento, dataI, dataF, horas, tipo){
    this.evento = evento;
    this.dataIni = dataI
    this.dataFim = dataF;
    this.horas = horas;
    this.tipo = tipo;
}

function contForm(){ //constroi o objeto para utilizar na criação da tabela e armazenamento dos certificados no localStorage
    let dadosForm = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let inicioEvento = new Date(dadosForm[1].split('-').join('/')).toLocaleDateString('pt-br')
        let fimEvento = new Date(dadosForm[2].split('-').join('/')).toLocaleDateString('pt-br')
        let form = new Certificado(dadosForm[0],inicioEvento, fimEvento,dadosForm[3],dadosForm[4])
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

function Deletar(){
    JSON.parse(localStorage.getItem("certificate")).forEach(function(){ 
        array.splice(this, 1)
    });
}

function getDataCertificate() { //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
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
let indicesTabela = ["Evento", "Data Inicial", "Data Final", "Horas", "Tipo","Editar/Deletar"];   
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
    let btnedit = document.createElement('img')
        btnedit.src="/imagens/edit.png"
        btnedit.setAttribute("onclick","EditarUser()")

    let clickdel = document.createElement('img') 
       clickdel.src="/imagens/lixo.png"
       clickdel.setAttribute("onclick","Teste2()")

    for(i = 0; i < linhasTabela[j].length; i++) {
        cel = criaCelula("td", linhasTabela[j][i]);
        linhaBody.appendChild(cel); 
        linhaBody.appendChild(btnedit);
        linhaBody.appendChild(clickdel);
    }
    tbody.appendChild(linhaBody);
}
let linhaFoot = criaTag("tr");
let celulaFoot = criaCelula("td","Certistack");
celulaFoot.setAttribute("colspan",6);
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

function EditarUser(){ //olhar melhor
    let lineTabela, tabela = document.getElementById("tabela"); ;
    alert(lineTabela)
    for (let i = 0; i<tabela.rows.lenght; i++){
        alert("aqui")
        tabela.rows[i] = function(){
            lineTabela = this.rowIndex;
            console.log("oi")
        }
    }
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="/html/cadastro_login.html"; //ou window.open("home.html") para abrir em uma nova aba
}