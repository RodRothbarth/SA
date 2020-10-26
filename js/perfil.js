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

function RemoveUser(){
    localStorage.removeItem("certificate")
    let confirm = prompt("Digite o nome do evento para confirmar:")
    
    for (let i=0; i > dataCerti.length; i++){
        if(dataCerti[i].evento === confirm){
            localStorage.removeItem("certificate")
        }
    }
}

function ModificarCadastro(){ //fazer função de edição
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    let nasc = new Date(user[7].split('-').join('/')).toLocaleDateString('pt-br')    
        
    if (localStorage.getItem("user") === null ){
        dataBase.push(new User(user[0], user[1], user[2], user[4], user[5], user[6], nasc , user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        dataBase = JSON.parse(localStorage.getItem("user"))
        dataBase.push(new User(user[0], user[1], user[2], user[4], user[5], user[6], nasc , user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }        
}

function getDataUser() {
    let array = [];
    
    JSON.parse(localStorage.getItem("online")).forEach(function(info){ 
        array.push(Object.values(info))
    });
    return array;
}