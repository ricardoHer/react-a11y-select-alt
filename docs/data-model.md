# react-a11y-select-alt — Modelo de Dados

## Entidades Principais

### Select
- **Propósito:** Componente principal que renderiza o seletor (dropdown) acessível. Gerencia o estado de abertura, a opção destacada, a opção selecionada e as interações do usuário (mouse e teclado).
- **Campos principais:**
  - `options` (Array<Option>): Coleção de componentes `Option` filhos.
  - `value` (any): O valor da opção atualmente selecionada (usado para modo controlado).
  - `onChange` (Function): Callback disparado quando uma nova opção é selecionada.
  - `label` / `labelledBy` (string): Propriedades para acessibilidade (obrigatórias).
  - `placeholderText` (string): Texto exibido quando nenhuma opção está selecionada.
  - `isOpen` (boolean - estado interno): Controla se o menu de opções está visível.
  - `highlightedIndex` (number - estado interno): Índice da opção atualmente em foco na navegação por teclado.
- **Relacionamentos:** Contém uma coleção de entidades `Option` (1 para N). Utiliza internamente uma `OptionCollection` para gerenciar a navegação.
- **Observações:** Pode ser utilizado como um componente controlado (via props `value` e `onChange`). Possui regras estritas de acessibilidade (ARIA) e navegação por teclado.

### Option
- **Propósito:** Representa um item individual e selecionável dentro do menu do componente `Select`.
- **Campos principais:**
  - `value` (any): O valor real associado à opção, retornado no evento `onChange`.
  - `disabled` (boolean): Impede que a opção seja selecionada ou destacada.
  - `children` (ReactNode): O conteúdo a ser exibido para o usuário (e.g., texto).
  - `cssClassName` (string): Classe CSS customizada para estilização.
  - `customId` (string): ID customizado para o elemento DOM.
- **Relacionamentos:** É sempre filha de um componente `Select` (N para 1).
- **Observações:** Opções desabilitadas são ignoradas durante a navegação por teclado. É encapsulada internamente por um componente privado `OptionWrapper` para adicionar funcionalidades de interação e acessibilidade.

### OptionCollection
- **Propósito:** Classe utilitária interna para encapsular a lógica de gerenciamento e navegação sobre a coleção de `Option`s. Não é um componente nem uma entidade persistida.
- **Campos principais:**
  - `options` (Array<Option>): A lista de instâncias das opções.
- **Relacionamentos:** Instanciada pelo `Select` para gerenciar seus `Option`s filhos.
- **Observações:** Abstrai a complexidade de navegar pela lista, como encontrar a próxima/anterior opção habilitada e tratar os limites da lista (primeiro/último item).

## Diagrama de Relacionamentos

```
[Select] 1--* [Option]
[Select] 1--1 [OptionCollection]
[OptionCollection] 1--* [Option]
```
*O `Select` utiliza a `OptionCollection` como um utilitário para gerenciar sua coleção de `Option`s.*

## Fluxos de Dados Principais

### Seleção de Opção pelo Usuário
1. **Origem:** O usuário clica em um item `Option` no menu aberto ou pressiona `ENTER`/`SPACE` em uma opção destacada via teclado.
2. **Transformação:** O componente `Select` captura o evento, atualiza seu estado interno com o `value` da opção selecionada, define seu estado como fechado (`isOpen: false`) e retorna o foco para o botão principal do seletor.
3. **Destino:** O `Select` invoca o callback `onChange` passado via props, enviando o novo valor para a aplicação consumidora.

### Navegação e Fechamento via Teclado/Mouse
1. **Origem:** O usuário pressiona uma tecla de navegação (`UP`, `DOWN`, `ESC`) com o seletor em foco, ou clica fora da área do componente (`mousedown` no `document`).
2. **Transformação:**
    - `UP`/`DOWN`: O `Select` utiliza a `OptionCollection` para calcular o índice do próximo item válido (não desabilitado) a ser destacado. O estado `highlightedIndex` é atualizado.
    - `ESC` / Clique externo: O estado `isOpen` é atualizado para `false`, fechando o menu de opções.
3. **Destino:** O estado interno do componente `Select` é atualizado, provocando uma nova renderização que reflete a mudança visual (opção destacada ou menu fechado). Nenhum evento é publicado para a aplicação externa.

## Estratégia de Persistência
- **Banco principal:** Não se aplica. Como uma biblioteca de componentes de UI, o estado é gerenciado em memória pelo React (props e state) e pela aplicação que a consome.
- **Cache:** Não se aplica.
- **Event store:** Não se aplica.

## Considerações de Performance
- A lógica de navegação na `OptionCollection` é otimizada para pular opções desabilitadas de forma eficiente, sem iterar desnecessariamente sobre toda a lista a cada pressionamento de tecla.
- Para listas de opções muito longas, a renderização de todos os nós DOM de uma vez pode impactar a performance. O componente não implementa virtualização nativamente.

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Valide com o schema real do banco antes de mergear.