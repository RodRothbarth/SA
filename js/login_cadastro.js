$(document).ready(function(){
    $(".documento").mask('00.000.000/0000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];

function mostraCadastro(){ //muda a mostragem da pagina de login para cadastro
    $(".cadastro").show();
    $(".login").hide();
};

//função criadora de objeto para adição de informação em cadastro
function User(name, email, senha, documento, telefone, dataNasc, instituicao, area, lattes, certificados){
    this.nome = name;
    this.email = email;
    this.senha = senha;
    this.documento = documento;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.instituicao = instituicao;
    this.area = area;
    this.lattes = lattes;
    this.certificados = certificados;
}

function conteudoForm(){//cria o objeto a ser utilizado no cadastro
    let dadosForm = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
        let nasc = new Date(user[7].split('-').join('/')).toLocaleDateString('pt-br')
        let form = new User(dadosForm[0], dadosForm[1], dadosForm[2], dadosForm[4], dadosForm[5], nasc, dadosForm[8], dadosForm[9])
        return form 
}
function CadastrarUser(){ //sistema para cadastrar um novo usuario.
    let user = conteudoForm()
        
    if (localStorage.getItem("user") === null ){
        dataBase.push(user);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        dataBase = JSON.parse(localStorage.getItem("user"))
        dataBase.push(user);
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }        
}

function Validation(){//valida o login para entrada no perfil do usuario ou cliente desejado
    dataBase = JSON.parse(localStorage.getItem('user'))
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");

    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === usern.value){
            if(dataBase[i].senha === pssw.value){
                localStorage.setItem("online", JSON.stringify(dataBase[i]))
            }else{
                alert("Senha Incorreta!");
            };
            break;
        }else{
            alert("Login Incorreto!")
        };
    };

};



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
        alert(cnpj)
    }
}

function ValidarCNPJ(cnpj) {
 
    if(cnpj == '') return false;
     
    if (cnpj.length !== 14) return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999") return false;
         
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
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}