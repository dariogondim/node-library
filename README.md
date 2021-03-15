# Backend South.


## 🚀 Aplicação
 Desenvolver uma API RESTFull em que realize a gestão de livros e usuários de uma biblioteca. 

 ### Funcionalidades para Livros:
    Listar todos livros disponíveis
    Retornar dados de um livro
    Salvar, Editar e Excluir.
    Salvar livro na lista de favoritos de um usuário  
    
 ### Funcionalidades para o Usuário:
    Listar os usuários da biblioteca.
    Retornar dados de um usuário
    Salvar, Editar e Excluir.
    Autenticar usuário   
    
 ### Dados mínimos esperados para o Livro: 
    Título, ISBN, Categoria, Ano  
    
 ### Dados mínimos esperados para o Usuário: 
    Nome, Idade, Telefone, Email, Senha
    
    
 ## Considerações importantes
    As funcionalidades para salvar, editar e excluir devem estar protegidas, acessível apenas para usuários autenticados
    Considere salvar os dados sensíveis do usuário de forma segura.
    
O projeto usa <b> nodejs, postgresql, jest, typeorm, express, tsyringe e jwt</b> como tecnologias, biliotecas e frameworks principais 
  

### 📋 Pré-requisitos

 Projeto testado utilizando <b> nodejs 14.16.0 </b> e <b> typescript 4.0.3 </b>, mas deve funcionar em qualquer versão do node a partir da 10
 O projeto também utiliza uma <b> imagem docker do postgresql</b>, veja abaixo como instalar os pré-requisitos`

### 🔧 Instalação

clonar este repositório, comando: <b> git clone https://github.com/dariogondim/node-library </b>

## rápida
  Tendo docker e docker compose instalados, simplesmente,execute:

```
docker-compose up --build
```
De forma detalhada...

Se você não tem o git, faça o download em: https://git-scm.com/downloads

Se você não tiver <b>yarn</b> instalado, baixe em: https://classic.yarnpkg.com/en/docs/install/#debian-stable
Execute <b> yarn --version </b> para se certificar que tudo correu bem, ele deve retornar algo como <b>1.22.5</b>

Se você não tiver o node instalado, você pode baixar daqui: https://github.com/nvm-sh/nvm
Após instalar, execute <b> nvm i 14 </b>, para instalar a versão 14 do node
Após, execute <b> nvm use 14 </b>
Ele deve retornar algo como <b>Now using node v14.16.0 (npm v6.14.11)</b>

Depois disso, vá até a raiz do projeto, aonde você clonou do git

```
cd node-library
yarn
```
Em seguida, você precisa instalar o postgresql, a maneira mais rápida de fazer isso,
é com docker.
Faça o download do docker em:https://www.docker.com/products/docker-desktop
Após a instalação, certifique-se de que ele foi instalado corretamente, digite: <b>docker --version</b>
Ele deve retornar algo parecido com: <i>Docker version 19.03.13, build 4484c46d9d</i>
Se tudo ocorreu bem, execute: <b> docker run --name south -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres </b>
O comando retorna um resultado parecido com <b> 4207bb17f1d2fcd442500b3ae2afca2bbddbdd6d6022161c02c49b81c31131fd </b>
Copie o retorno, que deve ser diferente desse, e
Execute <b>  docker start 4207bb17f1d2fcd442500b3ae2afca2bbddbdd6d6022161c02c49b81c31131fd  </b>, para iniciar o container,<b>não se esqueça de que isso é 
um exemplo, o codigo após o start,  deve ser o gerado pela sua máquina</b>
Qualquer coisa, se perdeu esse codigo, digite <b> docker ps -a</b>, ele deve retornar uma linha, copie da linha de comando o código do container na primeira coluna na linha retornada e então execute o docker start com o código retornado

<b>Usando a interface de comando ou seu gerenciador postgresql favorito, você deve criar um banco de dados chamdo <i>node_library</i> em localhost,
após a conexão com o container tiver sido executada com sucesso</b>

Pela linha de comando, com o container iniciado, execute <b>docker ps</b> e verifique se retornou alguma coisa; se retornar, execute
<b> docker exec -it south psql -U postgres </b>
ele deve exibir no terminal algo parecido com <b>postgres=#</b>
execute <b>create database node_library;</b>, não se esqueça do ;
ele deve retornar <b> CREATE DATABASE </b>
 
Se tudo correu bem, vá até a raiz do seu projeto e execute: <b> yarn typeorm migration:run </b>, isso vai criar o database e os dados de teste
<b> As instruções de conexão com o banco de dados também estão descritas no .env, que coloquei só para facilitar mas há um exemplo chamado .env.example, 
seria so renomear ele para .env e substituir as propriedades a vontade. A boa prática diz para colocar o .env no gitignore, já que contém as verdadeiras variáveis de ambiente, incluindo a senha do db e a key do jwt. Mas para facilitar tudo, já coloquei,pois não se trata de um projeto real em produção. </b>
Esse projeto também não contém nenhuma camada de segurança dos dados ou autenticação, já que não era requisito  

Você então, pode iniciar o projeto com o comando: 

```
yarn start
```

## ⚙️ Executando os testes

  Execute o comando abaixo na raiz do projeto, para se certificar de que as funcionalidades estão funcionando como deveria. Mas os testes de integração 
  só funcionarão se o banco de dados e as migrações tiverem sido executadas com sucesso. Os outros testes,de unidade, não precisam de acesso ao banco de dados
  
  
```
yarn test
```
  
  
  Ao final, você receberá um resumo do coverage indicando se todos os testes executaram com sucesso e qual a porcentagem 
  de cobertura de código dos testes da aplicação
  

``` 
  =============================== Coverage summary ===============================
Statements   : 93.76% ( 962/1026 )
Branches     : 86.57% ( 116/134 )
Functions    : 96% ( 24/25 )
Lines        : 93.76% ( 962/1026 )
================================================================================

Test Suites: 14 passed, 14 total
Tests:       67 passed, 67 total
Snapshots:   0 total
Time:        34.703 s

```


Na pasta tmp do projeto, há um arquivo chamado <b> Insomnia-node-library </b>
  Faça o download do programa: <b>https://insomnia.rest/download/</b> e importe esse arquivo.  

## 📦 Desenvolvimento
Há exemplos de como testar todos os endpoints
  da aplicação conforme pedido nos requisitoss
  
### Arquitetura do projeto

  #### Requisitos da aplicação e regras de negócio
   ### Funcionalidades para Livros:
   
    isbn: string;
    title: string;
    category: string;
    edition: string; extra
    author: string; extra
    publishing: string; extra
    editionYear: number;
    numberPages: number; extra
  
    Listar todos livros disponíveis COMPLETO
   ##### <i> Foi adicionado paginação através das propriedades: ex <b> firstPage=1&resultsPerPage=2&limitResults=100 </b> </i>
    Retornar dados de um livro COMPLETO
   ##### <i> É verificado se o livro existe, caso contrário, receberá erro 404 -- Book not found </b> </i>
    Salvar COMPLETO 
   ##### <i> É verificado se o livro já não está cadastrado, caso contrário, receberá erro 400 -- The book already registered </b> </i>
    Editar COMPLETO
   ##### <i> É verificado se o livro existe, caso contrário, receberá erro 404 -- Book not found </b> </i>
   ##### <i> É verificado se o livro já não está cadastrado, caso contrário, receberá erro 400 -- The book already registered </b> </i>
    Excluir COMPLETO
   ##### <i> É verificado se o livro existe, caso contrário, receberá erro 404 -- Book not found </b> </i>
   ##### <i> É verificado se o livro foi removido, caso contrário, receberá erro 400 -- The book has not been removed </b> </i>
    Salvar livro na lista de favoritos de um usuário COMPLETO
   ##### <i> Essa ação está no endpoint de usuários/profile, porque é o usuário que possui os seus livros favoritos </b> </i>
   ##### <i> É verificado se o usuário existe, caso contrário, receberá erro 400 -- User not found </b> </i>
   
   ### Funcionalidades para Usuários:
   
     name: string;
     email: string;
     password: string;
     phone: string;
     age: number;
     oldPassword: string; -- usado quando precisa editar ou remover um usuário. Se não vai alterar o password,só deixar a mesma senha de antes
  ### Usuário padrão, criado nas migrations,pode ser excluido
  ```
   {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123123',
          phone: '85988776643',
          age: 29,
   },
  ```
  
    Listar os usuários da biblioteca COMPLETO
   ##### <i> Foi adicionado paginação através das propriedades: ex <b> firstPage=1&resultsPerPage=2&limitResults=100 </b> </i>
    Retornar dados de um usuário COMPLETO
   ##### <i> Os livros favoritos do usuário estão em uma propriedade "favoriteBooks" no profile </b> </i>
    Salvar COMPLETO
   ##### <i> É verificado se o email não existe, caso contrário, retorna 400 -- Email address already used.  </b> </i>
   ##### <i> A senha é criptografada e é o único dado sensível de usuário  </b> </i>
    Editar COMPLETO
   ##### <i> É verificado se o email não existe, caso contrário, retorna 400 -- E-mail already in use.  </b> </i>
   ##### <i> É verificado se o usuário existe, caso contrário, receberá erro 400 -- User not found </b> </i>
   ##### <i> É verificado se a senha de confirmação foi enviada e se confere, caso contrário, o 400 -- You need to inform old password to set a new password. </b> </i>
   
    Autenticar usuário COMPLETO
  ##### <i> É verificado se o usuário e senha conferem caso contrário, receberá o erro 401 -- Incorrect email/password combination</b>
  
  OBS: Não foi colocado nenhuma ação de revogação do token, que tem data de expiração de 1 dia.Dessa forma, se um usuário for removido,seu token continuará
  válido até que se complete as 24 horas de seu login, permitindo que ele faça qualquer ação exceto, as que verificam seu usuário em tempo real, como excluir e editar o profile,visualizar o profile, salvar livros na lista de favoritos... todas as outras, continuaram acessíveis até a expiração do token.
   
  #### Esclarecimento sobre os endpoints
  No que se refere a usuários, há 3 tipos de endpoints:
  users, profile e sessions:
  
    ##users
      criam usuários e listam usuários
    ##sessions
      criam o token de autenticação
    ##profile
      se referem a um usuário em si: Atualizar,mostrar e remover usuário e favoritar os livros.
    Os livros favoritos são listados no /profile endpoint,na propriedade "favoriteBooks",conforme já foi citado.
    A estratégia também permite "retirar dos favoritos", bastando apenas, não informar a cada chamada do endpoint de
    favoritar os livros, o livro que se deseja excluir dos favoritos
  
  
   
         
  #### Estrutura das pastas
        Com o objetivo de facilitar mudanças, aplicar a SOLID (https://en.wikipedia.org/wiki/SOLID), isolando as regras de negócio o máximo possível, facilitando
        mudanças de frameworks Orms, tais como typescript, testes da aplicação, pois as <i> bussiness rules </i> estão isoladas, foi implementada a seguinte
        arquitetura:
          a. repositories.
            Há dois tipos de repositório, a especificação, são os que começam com um I na frente do nome do repositório e sempre estão,dentro do módulo,
          um nível abaixo,junto das pastas services,dtos,infra,etc. Eles são especificações dos repositórios reais. Facilitam a criação de novos repositórios,
          como os fakes, usados para teste ou se quisessemos adicionar outra versão usando outro ORM ou ainda se quiséssemos mudar a implementação sem afetar
          muito os services.
          
          b.services.
            Pode ter dois tipos. As que estão no pacote shared, contém funções e regras
            usadas pelos serviços do módulo que normalmente, são compartilhadas e reutilizadas por outras partes da aplicação,dentro do mesmo módulo. Mas 
            a regra geral, é deixar qualque código que contenha lógica de negócio la,pois posteriormente,o código pode ser testado (nos arquivos .spec) de forma
            individual,sem estar necessariamente associado ao serviço mais externo do módulo,evitando testar mais de uma vez a mesma coisa, a menos que as regras           sejam muito simples, no caso desse projeto, ficarão dentro de cada service geral mesmo.
          
              
          c.controllers
             Usando a dependência tsyringe para recuperar um serviço dentro do controlador correspondente. Sua função é receber os dados da requisição e 
             chamar todos os serviços necessários para a execução do endpoint. Em tese, um controller mapeia um ou mais endpoints filhos de um mesmo pai. 
             Em suma, o controller pode realizar várias ações,chamando vários serviços dentro de um mesmo endpoint,se
             necessário. A fim de manter a integridade da operação como um todo (atomicidade), pode ser necessário usar transctions (a dependência 
             typeorm-transactional-cls-hooked nos ajuda com isso).O controller também pode modificar o tipo da resposta, a fim de retornar algo específico,se necessário, tal como o
             controller de usuário, que remove a propriedade password, para que não seja serializada na requisição
          
          d.dto
             Especificam o tipo de dado esperado para realizar uma operação no banco de dados, conforme esperado pelo serviço. As vezes, os dados são mesclados                com os dados da requisição, por conta disso, os services costumam ter uma interface chamada IRequest, que também ajuda na organização do código,                  isolamento das propriedades necessárias na requisiçao ( uma espécie de contrato, dentro dos princípios da SOLID). Outra prática comum é, ao invés de
             colocar um único parametro do tipo correspondente no escopo do método, o que se faz é desestruturar
             o objeto inteiro nas suas propriedades, facilitando a leitura das propriedades que estão sendo modificadas e ajudando a evitar erros, pela falta
             de uma propriedade que é obrigatória, ou uma obrigatória que se tornou opcional, etc.
         e.fakes
            Os fakes repositories e o fakeDatabase e FakeObjs, tem o objetivo de auxiliar os testes para que forneçam a experiẽncia mais próxima possivel 
            da realidade, da estrutura de dados da aplicação mas sem que seja necessário criar banco de dados de testes ou poluir o banco de dados de produção.
         g.testes
            há dois tipos de testes, os de unidade, que ficam dentro dos services e os de integração, que ficam dentro de controllers. Via de regra, toda funcionalidade será testada nos serviços exceto para os casos em que o controlador modifica a resposta vinda diretamente do serviço, como no caso do controlador de ordens (e também o de produtos), na parte de listagem, eles paginam no controlador e não no serviço. Isso é testado como sendo parte do teste de integração. No geral, os testes de integração também testam se os endpoints retornar sucesso ou falha ou se contém alguma propriedade fundamental. Nesse projeto, os testes de integração são "testes dos controllers", não testando integração de forma profunda em si.
         
        
      
## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Nodejs](https://nodejs.org/en/) - Executor de código javascript, base do projeto
* [Typescript](https://www.typescriptlang.org/) - Adiciona tipos ao javascript
* [Docker](https://www.docker.com/) - Container
* [Vs code](https://code.visualstudio.com/) - Editor de código
* [Postgresql](https://www.postgresql.org/) - Banco de dados relacional
* [Typeorm](https://typeorm.io/#/) - Orm para uso com postgres
* [Insomnia](https://insomnia.rest/) - Ferramenta para execução das requisições rest

## 📌 Versão
  Versão 1.0 não oficial


