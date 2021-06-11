<h1 align="center">
    <img alt="DOE" src="public/assets/coator.png">
</h1>

<h2 align="center"> Um sistema de cadastro de doadores de casacos </h2>

<h3 align="center"> Aplicação web criada com base na 3ª MaratonaDev da Rocketseat, evento online ocorrido gratuitamente durante os dias 17 e 18 de Fevereiro de 2020 </h3>

<h3 align="center"> Instrutor: <a href="https://github.com/maykbrito">Mayk Brito</a> </h3>

<p align="center"> <img src="https://github.com/christyanbrayan/doe/blob/master/rocketseat.png?raw=true" alt="Rocketseat" width="212"> </p>

## Tecnologias
### Front-end
- **HTML5**
- **CSS3**
- **JS**
### Back-end
- **JS**
- **Servidor Node.js**
  - Com as dependências **Express, Nodemon e Nunjucks**
- **Banco de Dados Postgres**

## Dependências

Instaladas através do npm, o **express** (para o servidor web), o **nodemon** (para escutar os arquivos e diretórios, sem precisar reiniciar o nodejs a cada alteração) e o **nunjucks** (para organizar e manipular os conteúdos HTML de forma dinâmica, através de templates engines).

### Banco de dados Postgres
Ligação através do cliente PostgreSQL para node.

Foi criado um banco chamado "**coator**", com uma tabela "**donors**" e com as linhas **id**, **name**, **email** e **blood**.
