# Desafio Less Click

Olá! Sou Lucas Laricchia e esse é meu **Desafio Less Click**. Para facilitar a inicialização do projeto, separei nesse `README.md` em duas seções que mostram como executar o projeto. A primeira mostra como iniciar o ambiente usando contêiner Docker e outra usando a inicialização padrão do Laravel.


# Iniciando com Docker


Para iniciar com docker basta seguir o seguintes passos:

    docker-compose up -d

Em seguida instale as dependencias :

    docker exec laravel-app composer install


Será iniciado dois bancos de dados no MySQL, sendo eles, `desafio_less_click`para o banco de principal e  `test_desafio_less_click`para o banco de testes.
Para expor a aplicação, é usado um apache2, que expõe a aplicação na porta 8000.

## Testes no Docker

Para executar os testes para as APIs de **Eventos** e **Ingressos**, execute o seguinte comando:

    docker exec laravel-app php artisan test

# Inicialização padrão

Primeiramente, execute este comando para instalar as dependencias:
```
composer install
```

Para iniciação padrão do Laravel através do comando `php artisan serve` é preciso primeiramente definir as configurações do banco de dados no .env.

Agora execute este comando para realizar as migrations:

```
php artisan migrate
```
E depois popule o banco com a seed através deste comando:

```
php artisan db:seed
```

Serão criadas as bases de dados e populadas as tabelas de *usuários*, *categoria*   e *setor*.
Por fim inicie o servidor usando:

    php artisan serve
    
## Testes

Uma vez configurado o arquivo .env, para executar os testes para as APIs de **Eventos** e **Ingressos**, execute o seguinte comando:

    php artisan test

# Autenticação
### Para logar na aplicação:

Requisição:   

    curl -d '{"email":"tiago@gmail.com", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/auth/login

Resposta:
> 

    {
	   "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYwNDI4NjYyMCwiZXhwIjoxNjA0MjkwMjIwLCJuYmYiOjE2MDQyODY2MjAsImp0aSI6ImpWQ2Z6bk1lbFZucHBIUVQiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.EhHYuadV2JroItF8o6pk0O-W7vnhc3tNwo_thhdzj28",
	   "token_type":"bearer",
       "expires_in":0
    }

### Para realizar operações nas outras API use:

Para recuperar todos os eventos:

Requisição:

    curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYwNDM1NjAzMywibmJmIjoxNjA0MzU2MDMzLCJqdGkiOiJFWHhWTGxUcmNoZ2xrU1FOIiwic3ViIjozLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.KhLCseujsfRiBsN-YuPz8EBiklrKXI6el60o1jCbC7s" -H "Content-Type: application/json" -H "Accept: application/json" http://localhost:8000/api/eventos

Resposta:
>

    {
       "current_page":1,
       "data":[
          ... eventos
       ],
       "first_page_url":"http:\/\/localhost:8000\/api\/eventos?page=1",
       ...
       "total":3
    }
    

# Rotas da APIs
Para definição da API foram criadas as seguintes rotas:

## User API
| Verbo | Endereço | Ação|
|--|--|--|
| POST| /api/auth/login| Autentica na aplicação|
| POST| /api/auth/logout | Desloga da aplicação|
| POST| /api/auth/refresh| Atualiza um token expirado |
| POST| /api/auth/me | Apresenta informações do usuário logado|


## Eventos API
| Verbo | Endereço | Ação|
|--|--|--|
| GET | /api/eventos | Lista todos os eventos *(10 por página)*|
| GET | /api/eventos/{evento} | Lista um evento|
| POST| /api/eventos | Adiciona um novo evento |
| PATCH| /api/eventos/{evento} | Atualiza um evento|
| DELETE| /api/eventos/{evento} | Apaga um evento|

## Ingressos API
| Verbo | Endereço | Ação|
|--|--|--|
| GET | /api/eventos/{evento}/ingressos| Lista todos os ingressos de um evento *(10 por página)*||
| POST| /api/eventos/{evento}/ingressos| Adiciona um ingresso a um evento|
| GET | /api/ingressos| Lista todos os ingressos|
| GET | /api/ingressos/{ingresso} | Lista um ingresso|
| PATCH| /api/ingressos/{ingresso} | Atualiza um ingresso|
| DELETE| /api/ingressos/{ingresso} | Apaga um ingresso|

