# Desafio Less Click

Olá! Sou Lucas Laricchia e esse é meu **Desafio Less Click**. Para facilitar a inicialização do Front-End do projeto, este arquivo `README.md` trará algumas informações.


# Instalando o Expo-cli

Para instalar o Expo-CLI basta executar o seguinte comando:

    npm install expo-cli — global

Caso use Yarn :

    yarn add global expo-cli

## Instalando as dependencias

Para instalar as dependencias do projeto, execute o seguinte comando:

    yarn install

# Inicialização padrão
Para inicializar o projeto execute:
```
yarn start
```
Será aberto uma aba no navegador com o código QR do projeto expo, após isto, abra o app do expo
no seu celular e escaneie o código QR
    
# Conexão com o backend

Para que a comunicação funcione corretamente no ambiente localhost você deve incluir o seu endereço
base da api no arquivo src/api.js, o BASEURL deve ser o seu ip do EXPO (exibido no navegador ex: http://192.168.0.10:8000/api )