# SAFEHOME - UFRGS

Trabalho da disciplina de Engenharia de Software N da UFRGS, no qual deve-se desenvolver um sistema que simule uma aplicação IoT.

## Como contribuir

Para contribuir com esse projeto, é necessário possuir um ambiente de desenvolvimento contendo NodeJs instalado e Yarn Package Manager.
O ambiente de desenvolvimento pode ser configurado da seguinte forma (utilizando Linux):

### 1.Instalar o NodeJS (utilizando o NVM):

#####Insalar o NVM
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`

Adicionar as variavéis de ambiente:

`gedit ~/.bashrc`

No final do arquivo aberto, adicionar e salvar:

```bash
 export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

No terminal:

`source ~/.bashrc`

Por fim, para verificar a instalação:

`nvm -h`
#####Agora para instalar o NodeJS, prosseguimos:
`nvm install 12.13.0`
`nvm alias default 12.13.0`

Para verificar a instalação:

`node -v`

###2.Instalar o Yarn Package Manager:
Os passos a seguir são para Debian/Ubuntu, para outros sistemas operacionais, por favor seguir os passos descritos [aqui](https://yarnpkg.com/pt-BR/docs/install "aqui").

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

`sudo apt-get update`

`sudo apt-get install --no-install-recommends yarn`

Verifique a instalação através de:

`yarn --version`

### 3.Clone esse projeto

Clone esse projeto através de `git clone`.

###4.Acesse o projeto
Abra o projeto clonado em um editor/IDE de preferência, mas é aconselhado utilizar o VSCode já que possui uma ótima integração com o TypeScript.

Através do terminal (do VSCode ou não) rode o comando:

`yarn`

Para fazer o download das dependências do projeto.

###5.Crie um banco de dados para o projeto
PostgreSQL.
###6.Arquivo .env
Crie um arquivo .env na raíz do projeto, em seguida, copie o conteúdo do arquivo .env.example e preencha os dados de seu ambiente nos respectivos campos.

###7.Gerar as tabelas
Gere as tabelas da aplicação automaticamente através do comando:

`yarn sequelize db:migrate`

### 8.Iniciar o servidor

Para iniciar o servidor Node, utilize `yarn dev`.
As rotas do projeto podem ser registradas e verificadas no arquivo `src/Routes.ts`.
