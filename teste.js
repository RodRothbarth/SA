// let array = [1,2,3,4,5,6]

// //let test = array.splice(2,1)
// let test2 = array.pop()

// console.log(array[5], array[2])
// console.log(array.length)


// $(document).ready(function(){
//     $('.CPF').mask('000.000.000-00');
//     $('.numCelular').mask('(99) 99999-9999');
//   });

let dataBase = [];
let dataCerti = []; 
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
let usern = document.getElementById("cpf");
let pssw = document.getElementById("senha");

function User (name, document, email, cellphone, dataNasc, pswd, lattes, interrest, university, account, certificates ){ //função construtora para o cadastro.
    this.nome = name;
    this.documento = document;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
    this.celular = cellphone;
    this.conta = account;
    this.certificados = certificates;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    if (!ValidPass() || !user){ // confirma se os campos foram preenchidos com a mesma senha  VERIFICAR COMO ATESTAR TREU OU FALSE NO RETURN
        alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS CORRETAMENTE!")
    }else{
        if (localStorage.getItem("user") === null ){
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9], user[10]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }else{
            dataBase = JSON.parse(localStorage.getItem("user"))
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9], user[10]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }
    } 
}

// function ValidEmail(field){
//     let address = field.value.substring(0, field.value.indexOf("@"));
//     let domain = field.value.substring(field.value.indexOf("@")+1, field.value.length);

//     if ((address.length >=1)&&
//         (domain.length>=3)&&
//         (adress.search("@")==-1)&&
//         (domain.search("@")==-1)&&
//         (address.search(" ")==-1)&&
//         (domain.search(" ")==-1)&&
//         (domain.search(".")!=-1)&&
//         (domain.indexOf(".")>=1)&&
//         (domain.lastIndexOf(".")< domain.length - 1)){
//             document.getElementById("msgEmail").innerHTML = "E-mail Válido"
//             return true
//     }else{
//             document.getElementById("msgEmail").innerHTML = "E-mail Inválido"
//             return false
//         }
// }

function ValidPass(){
    if (user[5] === user[6]){
        document.getElementById("msgSenha").innerHTML = "Senha OK!"
            return true
    }else{
        document.getElementById("msgSenha").innerHTML = "Senha Diferente"
            return false
        }
}

function DelUser(){
    let toDel = JSON.parse(localStorage.getItem("online"))
    for (let i=0; i < dataBase.length; i++){
        if (dataBase[i].cpf === toDel.cpf){
          alert("deletaria o que pediu")
            // dataBase.splice(dataBase[i],1);
           // location.href="index.html";
        }
    }
}

function Validation(){ //validação de login e senha para entrar na area de perfil.
    
    for (i = 0; i <= dataBase.length; i++){
        if(i == dataBase.length){
            alert("Login Incorreto");
        }else if (dataBase[i].documento == usern.value || dataBase[i].email == usern.value){
            if(dataBase[i].pswd == pssw.value){
                console.log("Sucesso");
                localStorage.setItem('online', JSON.stringify(dataBase[i]));
                if(user[10] === "evento"){
                    location.href="cadastroCertificado.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
                }else{
                    location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
                }
            }else{
                alert("Senha Incorreta");
            }
            break;
        } 
    }
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

// function AddHour(event, beginEvent, endEvent, hour, type){
//     this.evento = event;
//     this.beginEvent = beginEvent;
//     this.endEvent = endEvent;
//     this.horas = hour;
//     this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
// }

function Add(){ //adicopnar certificados (array para os certificados)
    let certificado;
     Array.from(document.getElementsByName("addCerti")).forEach(function(element){
        certificado[element.keys] = element.value;});
    //  let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
    //      return element.value;}); //tentar pegar direto do formulario 
    if (certificado){

        let update = JSON.parse(localStorage.getItem("online"))
        dataCerti.push(certificado);
        update.certificados = dataCerti;    
        localStorage.setItem("online", JSON.stringify(update));
        alert("Certificado adicionado com Sucesso!");
        //adicionar no objeto 'user.certificado"

    }else{  
        alert("Todos os campos devem ser preenchidos.");
    }              
}

// let linhasTabela= []
// function criaTag(elemento) {
//     return document.createElement(elemento)
//     }
    
//     let titulo = document.querySelector("section h1");
//     titulo.textContent = "A DOS ALUNOS";
    
//     let tabela = document.getElementById("tabela");
    
//     let thead = criaTag("thead");
//     let tbody = criaTag("tbody");
//     let tfoot = criaTag("tfoot");
    
//     let indicesTabela = ["Nome do Aluno", "Nota 1", "Nota 2", "Nota 3", "Nota 4", "Media", "Status"];
//     let linhaHead = criaTag("tr");
    
//     function criaCelula(tag, text) {
//         tag = criaTag(tag);
//         tag.textContent = text;
//         return tag;
//     }
    
//     for(j = 0; j < indicesTabela.length; j++) {
//         let th = criaCelula("th", indicesTabela [j]);
//         linhaHead.appendChild(th);
//     }
//     thead.appendChild(linhaHead);
    
    
//     for(j = 0; j < linhasTabela.length; j++) {
//         let linhaBody = criaTag("tr");
    
//         for(i = 0; i < linhasTabela[j].length; i++) {
//             cel = criaCelula("td", linhasTabela[j][i]);
//             linhaBody.appendChild(cel); 
//         }
//         tbody.appendChild(linhaBody);
//     }
//     let linhaFoot = criaTag("tr");
//     let celulaFoot = criaCelula("td","Colégio Floripa");
//     celulaFoot.setAttribute("colspan",7);
//     linhaFoot.appendChild(celulaFoot);
//     tfoot.appendChild(linhaFoot);
    
//     tabela.appendChild(thead);
//     tabela.appendChild(tbody);
//     tabela.appendChild(tfoot);




    // for (let i=0; i < dataCerti.length; i++){
        
    //     if(Object.keys(dataCerti[i].evento) === confirm){
    //         dataCerti.splice(dataCerti[i],1);
    //         alert(dataCerti);
    //     };
    // };


//    "user" : {nome: "rodrigo", ..... certificado:  }, {nome: "rafa", ..... certificado:  },{nome: "luci", ..... certificado:  }
//    "online": {nome: "rodrigo", ..... certificado:  }

//    table: online.certificado

//    add() + certificado


//    let test = {nome: "rodrigo", ... certificado: [[1],[2],[3]]}
//    let test = {nome: "rodrigo", ... certificado: [{1},{2},{3}]}

//    test.certificado = dataCerti.push(test.certificado) ^