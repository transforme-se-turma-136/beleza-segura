# Guia de Contribuição

Obrigada por contribuir com o BelezaSegura. Este repositório é um espaço de aprendizagem e colaboração da Turma 136 do Transforme-se.

## Antes de começar

1. Consulte as Issues abertas;
2. Confirme que a tarefa ainda não está atribuída;
3. Comente na Issue informando que trabalhará nela;
4. Aguarde a atribuição quando a atividade depender de alinhamento da turma.

## Preparando o projeto

```bash
git clone URL_DO_REPOSITORIO
cd beleza-segura
git checkout develop
git pull origin develop
git checkout -b feature/NUMERO-descricao
```

## Durante o desenvolvimento

- Não envie senhas, tokens, chaves de API ou dados pessoais;
- Não faça commit de arquivos `.env`;
- Mantenha cada Pull Request focado em uma única tarefa;
- Atualize a documentação quando alterar um requisito ou fluxo;
- Faça testes antes de solicitar revisão;
- Utilize nomes claros em arquivos, funções e componentes.

## Enviando uma contribuição

```bash
git add .
git commit -m "feat: descreve a alteração"
git push -u origin feature/NUMERO-descricao
```

Depois, abra um Pull Request para a branch `develop` e preencha o modelo apresentado pelo GitHub.

## Revisão

Uma contribuição deve ser analisada por pelo menos uma pessoa que não tenha realizado a alteração. Mudanças importantes de arquitetura, segurança, escopo ou identidade visual devem ser discutidas com a frente responsável antes da aprovação.

## Tipos de commit

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de erro |
| `docs` | Documentação |
| `design` | Alterações visuais e protótipos |
| `test` | Testes |
| `refactor` | Melhoria interna sem nova funcionalidade |
| `chore` | Configuração, organização e manutenção |
