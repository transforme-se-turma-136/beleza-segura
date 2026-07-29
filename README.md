# BelezaSegura — Turma 136 | Transforme-se

Plataforma digital responsiva para reunir promoções de produtos de beleza provenientes de lojas previamente analisadas e oferecer uma verificação básica de links antes da compra.

> Projeto coletivo da **Turma 136 do Transforme-se**, originado pela equipe **Next Level**.

## Sobre o projeto

O BelezaSegura busca tornar a procura por promoções de beleza mais organizada e segura. A plataforma apresenta ofertas de lojas verificadas, direciona as usuárias para os endereços oficiais e permite analisar links antes de acessá-los ou fornecer dados pessoais.

## Funcionalidades do MVP

- Página inicial com promoções em destaque;
- Listagem e detalhes das promoções;
- Cadastro e apresentação de lojas verificadas;
- Redirecionamento para o endereço oficial da loja;
- Verificador básico de links;
- Classificação do resultado como:
  - loja conhecida;
  - link não reconhecido;
  - possível risco;
- Painel administrativo para gerenciamento do conteúdo;
- Interface responsiva para computadores e dispositivos móveis.

## Fora do escopo inicial

- Compras ou pagamentos dentro da plataforma;
- Processamento de pedidos, entregas, trocas e devoluções;
- Garantia absoluta de segurança de um link;
- Monitoramento de todas as lojas existentes na internet;
- Expansão inicial para segmentos diferentes de beleza e cuidados pessoais.

## Objetivos de Desenvolvimento Sustentável

- ODS 8 — Trabalho Decente e Crescimento Econômico;
- ODS 9 — Indústria, Inovação e Infraestrutura;
- ODS 12 — Consumo e Produção Responsáveis.

## Participação da turma

A evolução do BelezaSegura será realizada de forma colaborativa pela Turma 136. As atividades podem ser organizadas entre as seguintes frentes:

- Gestão e documentação;
- Produto e requisitos;
- Pesquisa e conteúdo;
- Design UI/UX;
- Frontend;
- Backend;
- Banco de dados;
- Testes e qualidade;
- Apresentação e comunicação.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) antes de iniciar uma atividade.

## Fluxo de contribuição

1. Escolha ou crie uma **Issue**;
2. Crie uma branch a partir de `develop`;
3. Faça alterações pequenas e relacionadas à tarefa;
4. Envie os commits para a sua branch;
5. Abra um **Pull Request** para `develop`;
6. Aguarde a revisão de pelo menos uma pessoa;
7. Após os testes e a aprovação, a alteração poderá ser integrada.

### Padrão de branches

```text
feature/numero-da-issue-descricao
fix/numero-da-issue-descricao
docs/numero-da-issue-descricao
design/numero-da-issue-descricao
test/numero-da-issue-descricao
```

Exemplo:

```text
feature/12-tela-de-promocoes
```

### Padrão de commits

```text
feat: adiciona listagem de promoções
fix: corrige validação do campo de link
docs: atualiza requisitos do verificador
design: adiciona protótipo da página inicial
test: cria testes do redirecionamento
chore: organiza estrutura do repositório
```

## Estrutura inicial

```text
.
├── .github/        # Templates de Issues e Pull Requests
├── backend/        # API e regras de negócio
├── database/       # Modelagem, scripts e dados de exemplo
├── design/         # Wireframes, protótipos e identidade visual
├── docs/           # Documentação acadêmica e técnica
├── frontend/       # Interface da plataforma
├── tests/          # Casos e evidências de teste
├── CONTRIBUTING.md
├── GOVERNANCE.md
└── README.md
```

## Documentação

Os documentos iniciais do projeto estão disponíveis na pasta [`docs`](docs/):

- Documentação de ideação e prototipação;
- Termo de Abertura do Projeto;
- Apresentação do BelezaSegura.

## Origem do projeto

A proposta inicial foi desenvolvida pela equipe Next Level:

- Ana Claryce Alves Costa — Design UI/UX;
- Diogo Melo da Silva Soares — Gestão de Projeto;
- Elias Ramos da Rocha — Desenvolvimento;
- Joana Beatriz Lau da Silva — Gestão Técnica.

A partir desta etapa, o projeto passa a ser construído coletivamente pela **Turma 136 do Transforme-se**.

## Licença

A licença do projeto deverá ser escolhida e aprovada pela turma e pela instituição antes da publicação ou reutilização externa do código.
