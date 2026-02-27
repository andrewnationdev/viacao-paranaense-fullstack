# VIAÇÃO PARANAENSE FULLSTACK

Projeto fullstack com Nuxt para uma empresa fictícia de transporte intermunicipal e interestadual.

## INTRODUÇÃO

Este é o meu primeiro projeto fullstack com o framework NuxtJS/VueJS. Sempre uso ReactJS, normalmente com NextJS, nos meus projetos, sobretudo nos maiores, porém desta vez quis fazer este com NuxtJS, tanto para aprender e ver como funciona na prática, quanto para tirar conclusões pessoais de como ele se difere do NextJS e em quais contextos performaria melhor. Criei o projeto pensando no fluxo de compra de passagens intermunicipais e interestaduais de empresas de transporte reais. A partir de um breve estudo e análise desses fluxos, surgiu este projeto.

## USO E INSTALAÇÃO
Após descompactar o projeto, execute o seguinte comando no terminal para instalar as dependências e executá-lo em `localhost`: `pnpm install && npm run dev`

## TECNOLOGIAS EMPREGADAS

- Empregou-se o Nuxt para o front-end e back-end dada a sua estrutura simples e concisa, além da facilidade de uso e implementação dos seus recursos (fetching, criação de APIs, stores e composables, etc).

- Para os ícones, empregou-se a biblioteca `lucide-vue-next`, pela sua facilidade de implementação, grande número de ícones em seu repositório e disponibilidade.

- O TailwindCSS é o que usei para a estilização de toda a interface, dispensando o uso de CSS customizado e garantindo uma interface mais limpa, organizada e responsiva usando e reaproveitando ferramentas e classes já existentes usadas por inúmeros sites.

- Para a geração de códigos hash, empregou-se a biblioteca `crypto`. A geração de PDF das passagens a serem impressas é possível por meio do `html2pdf.js`, o qual gera arquivos PDF a partir de components HTML. O `maska` foi empregado no campo de CPF para lidar com a máscara enquanto o usuário digita, ao passo que `qrcode-vue` foi usado para gerar códigos QR das passagens.

## FUNCIONALIDADES IMPLEMENTADAS

- Compra e busca de passagens por origem, destino e data de viagem.
- Escolha de poltronas dentre as disponíveis para aquela viagem.
- Geração e impressão de passagens em PDF com QR-Code.

## API

Todos os endpoints da API são acessíveis através da URL `/api/endpoint`, sendo que alguns requerem parâmetros específicos.

### GET_ROUTES

Este endpoint retorna todas as rotas disponíveis e é a partir daqui que o sistema monta as combinações de origem e destino. Ele também fornece as rotas de viagem para o endpoint `get_viagens`. O retorno da API é um array do tipo `IRoutes[]`, assim:

```ts
interface IRoutes {
    id: number;
    id_origin: number;
    id_destination: number;
    duration: TDateTime;
    price: number;
    service: TServices;
    departures: IDepartures[],
}
```

Todas as tipagens localizam-se em `types/schema.ts`.

### GET_ASSENTOS_DISPONIVEIS

Parâmetros:

`const { id_origin, id_destination, date, departure } = query`

Retorno:

```ts
interface ISeatsEndpoint {
    status: IStatus;
    data: {
        available_seats: ISeat[];
        message: string | undefined;
    }
}
```

cada assento tem esse tipo:

```ts
interface ISeat {
    id: number;
    label: string;
    isOccupied: boolean;
}
```

### GET_CIDADES

Obtém os códigos das cidades. retorna um array

Retorno:

```ts
export interface ICity {
    id: number;
    code: string;
    name: string;
}

```

### GET_ITINERARIO

Obtém o itinerário/nome da linha para a passagem em formato legível para o usuário.

`const { id_origin, id_destination } = getQuery(event);`

Retorno:

```ts
export interface IItinerario {
    itinerary: string;
    originCode: string;
    destinationCode: string;
}
```

### GET_VIAGENS

Filtra e retorna as viagens para o usuário

Recebe `date`

Retorno array:

```ts
interface IRoutes {
    id: number;
    id_origin: number;
    id_destination: number;
    duration: TDateTime;
    price: number;
    service: TServices;
    departures: IDepartures[],
}
```

### HANDLE_TICKET

Retorna o bilhete do(s) passageiro(s)

`const { id_origin, price, service, id_destination, date, passengers } = body`

Tipo:

```ts
export interface ITicket {
    id_service: number;
    id_ticket: number;
    id_origin: number;
    id_destination: number;
    departure_time: TDateTime;
    type: string;
    bus_type: TServices;
    seat_number: number;
    departure_date: TDateTime;
    cpf: string;
    price: number;
    boarding_fee: number;
    toll: number;
    sha_code: string;
}
```

Retorno:

```ts
interface ITicketEndpoint {
    status: IStatus;
    data: ITicket[];
}
```