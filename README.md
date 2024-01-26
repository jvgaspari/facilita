# Projeto Fullstack

## Backend
Para rodar esse projeto, entre na pasta backend e digite o comando:
```bash
cd backend
npm install
```
Apos isso, substitua os valores no arquivo .env com os valores do banco postgres que sera usado para armazenar os dados.

### .env
```.env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```
Para popular o banco e criar as tabelas no banco de dados, digite o comando:
```bash
npm run seed
```

Após essa etapa, digitar o comando:
```bash
npm run dev
```
Dessa forma, verificar se o servidor backend foi inicializado.

## Frontend
Após inicializar o backend, Abra outro terminal na pasta raiz do projeto e digite:
```bash
cd frontend
npm install
```
Depois de instalar os pacotes do node_modules, verifique o arquivo .env se a porta do servidor backend é a que está no .env do projeto frontend.
### .env
```.env
VITE_BASE_URL=http://localhost:3000
```
Finalmente digite o comando:
```bash
npm run dev
```
Click para ir na rota do servidor frontend
Feito isso, basta utilizar o webapp pelo frontend
