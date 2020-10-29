
function A(){
    let a = {"nome":"RODRIGO PEREIRA ROTHBARTH","email":"rodrothbarth@gmail.com","senha":"senha1","documento":"31.362.311/0001-24","telefone":"(48) 99999-9999","dataNasc":"25/05/1988","instituicao":"ufsc","area":"Saúde","lattes":"lattes"}
localStorage.setItem("online", JSON.stringify(a))
}

function getDataUser() { //trasforma os objetos vindos do localStorage com um array para formar corretamente as tabelas.
    let array=[];
    JSON.parse(localStorage.getItem("online")).forEach(function(info){ 
        array.push(Object.values(info))
    });
    return array;
}

function MostraPerfil(){
     let info = JSON.parse(localStorage.getItem("online"))
     document.getElementById("nome").value = info.nome
     document.getElementById("email").value = info.email
     document.getElementById("cnpj").value = info.documento
     document.getElementById("telefone").value = info.telefone
     document.getElementById("instituição").value = info.instituicao
     document.getElementById("site").value = info.lattes
     
}

function EditarUser(){
    let linhaTabela = getElementById("tabela")
}

function RemoveUser(){
    dataBase = localStorage.getItem("certificate")
    let confirm = prompt("Digite o nome do evento para confirmar:")
    
    for (let i=0; i > dataBase.length; i++){
        if(dataBase[i].evento === confirm){
            dataBase = dataBase.splice(dataBase[i],1);
            localStorage.setItem(dataBase);
        }
    }
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="/html/cadastro_login.html"; //ou window.open("home.html") para abrir em uma nova aba
}
