# react-a11y-select-alt — Glossário de Domínio

> Termos e conceitos usados neste serviço e seus significados no contexto do negócio.
> Use este glossário ao ler o código, escrever tickets ou comunicar com outros times.

## Termos de Negócio

### Option
**Definição:** Representa uma opção individual e selecionável dentro de um componente `Select`. Pode ser habilitada ou desabilitada e possui um valor e um texto a ser exibido.
**No código:** Componente `<Option>`, entidade de dados `Option`.
**Não confundir com:** `OptionWrapper` (componente interno de encapsulamento).

### Select
**Definição:** O componente principal que renderiza um dropdown/seletor acessível. É responsável por gerenciar o estado (aberto/fechado), a opção selecionada, a navegação por teclado e a conformidade com as práticas de acessibilidade ARIA.
**No código:** Componente `<Select>`, entidade de dados `Select`.
**Não confundir com:** `SelectButton` (o elemento de botão que aciona o `Select`).

### OptionCollection
**Definição:** Uma classe utilitária interna que encapsula a lista de `Option`s. Ela fornece métodos para navegar pela coleção, como encontrar a próxima ou a anterior opção habilitada, ignorando automaticamente as desabilitadas.
**No código:** Classe `OptionCollection`.

### SelectButton
**Definição:** O elemento de botão (`<button>`) dentro do componente `Select` que o usuário interage para abrir ou fechar a lista de opções. Ele exibe o texto da opção selecionada ou o `placeholderText`.
**No código:** Elemento `<button>` renderizado pelo componente `Select`.

### OptionWrapper
**Definição:** Componente interno e privado que encapsula cada `Option`. Ele é responsável por adicionar funcionalidades de acessibilidade (como roles ARIA), manipulação de eventos de interação (clique, foco) e aplicação de estilos.
**No código:** Componente `OptionWrapper`.

### placeholderText
**Definição:** Um texto exibido no `SelectButton` quando nenhuma `Option` foi selecionada ainda. Serve como um rótulo inicial para o controle.
**No código:** Propriedade `placeholderText` do componente `Select`.

### indicator
**Definição:** Um caractere Unicode (geralmente uma seta para baixo) exibido no `SelectButton` para indicar visualmente que se trata de um controle expansível (dropdown).
**No código:** Propriedade `indicator` do componente `Select`.

---

## Termos Técnicos do Domínio

### Acessibilidade (a11y)
**Definição:** A prática de projetar e construir o componente para ser utilizável por todas as pessoas, incluindo aquelas com deficiências que utilizam tecnologias assistivas como leitores de tela ou navegação apenas por teclado.
**Contexto de uso:** É o propósito central da biblioteca, implementado através do uso correto de atributos ARIA, gerenciamento de foco, contraste de cores e navegação completa via teclado.

### Componente Controlado (Controlled Component)
**Definição:** Um padrão do React onde o estado do componente (neste caso, o valor selecionado do `Select`) é "controlado" por props passadas por um componente pai (`value` e `onChange`), em vez de gerenciar seu próprio estado interno.
**Contexto de uso:** O componente `Select` pode operar neste modo, permitindo que a aplicação que o consome tenha controle total sobre seu estado.

### BEM (Block Element Modifier)
**Definição:** Uma convenção de nomenclatura para classes CSS que visa criar componentes de UI reutilizáveis, independentes e com escopo bem definido, evitando conflitos de estilo.
**Contexto de uso:** É a metodologia de CSS definida nas regras de negócio para a estilização dos componentes.

---

## Acrônimos e Abreviações

| Sigla | Significado | Contexto |
|---|---|---|
| a11y | Accessibility | Abreviação comum para acessibilidade (A + 11 letras + Y). Usado no nome do projeto e como seu conceito central. |
| ARIA | Accessible Rich Internet Applications | Especificação do W3C que define um conjunto de atributos para tornar o conteúdo da web mais acessível. A aderência às práticas ARIA é obrigatória. |
| BEM | Block Element Modifier | Convenção de nomenclatura de CSS usada no projeto para estilização dos componentes. |
| CSS | Cascading Style Sheets | Tecnologia usada para a estilização visual dos componentes. |
| DOM | Document Object Model | A biblioteca interage com o DOM para gerar IDs únicos e manipular eventos de teclado e mouse. |
| HOC | Higher-Order Component | Padrão de arquitetura do React. O componente `Select` utiliza `getDerivedStateFromProps`, um conceito relacionado a HOCs e ciclo de vida. |
| UMD | Universal Module Definition | Formato de build de JavaScript que permite que o módulo seja usado em diferentes ambientes (AMD, CommonJS, global). O componente suporta este formato. |

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Enriqueça com termos do negócio que não aparecem no código.