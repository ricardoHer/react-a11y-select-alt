Com certeza! Baseado no contexto acumulado, aqui está o documento `architecture.md` para o serviço `react-a11y-select-alt`.

---

# react-a11y-select-alt — Arquitetura

## Visão Geral
A arquitetura deste projeto é de uma **Biblioteca de Componentes de UI**. O objetivo principal é fornecer um único componente React (`<Select>`) altamente especializado, focado em acessibilidade (A11Y) e conformidade com as práticas ARIA. A escolha por uma biblioteca, em vez de uma aplicação, visa a máxima reutilização e um escopo mínimo, permitindo que desenvolvedores integrem um dropdown/seletor acessível em qualquer aplicação React com simplicidade e pouca configuração.

## Stack Tecnológico
| Camada | Tecnologia | Motivo |
|---|---|---|
| Linguagem | JavaScript (ES6+) | Padrão da indústria para desenvolvimento web e ecossistema React. |
| Framework UI | React | A biblioteca é, por definição, um componente para o ecossistema React. |
| Build / Tooling | nwb, Babel | `nwb` foi escolhido para simplificar o ferramental (build, testes, dev server) de um componente React, abstraindo a complexidade de Webpack e Babel. |
| Testes | Enzyme, Expect | `Enzyme` permite a manipulação e asserção do output de componentes React de forma granular, facilitando testes de UI. `Expect` é a biblioteca de asserção. |
| Qualidade de Código | ESLint | Forçar um padrão de código consistente e evitar erros comuns, obrigatório para todas as contribuições. |
| Estilização | CSS (BEM) | A convenção BEM foi adotada para evitar colisões de classes e criar estilos modulares e previsíveis para os componentes. |
| CI/CD | Travis CI, gh-pages | `Travis CI` automatiza a execução de testes a cada push, garantindo a integridade. `gh-pages` automatiza o deploy da aplicação de demonstração. |

## Padrões Adotados
- **Controlled Component:** O componente `Select` pode ter seu estado (o valor selecionado) totalmente controlado por um componente pai através das props `value` e `onChange`. Isso oferece flexibilidade máxima de integração, permitindo que a lógica de estado da aplicação resida fora da biblioteca.
- **Higher-Order Component (HOC) / Derivação de Estado:** Utiliza-se `getDerivedStateFromProps` para sincronizar o estado interno do componente com a prop `value` quando operando no modo controlado. Este é um padrão moderno do React para derivar estado a partir de props.
- **BEM (Block, Element, Modifier):** A estrutura de CSS segue a metodologia BEM para garantir que os estilos sejam escopados, reutilizáveis e fáceis de entender, prevenindo conflitos em aplicações que consomem a biblioteca.

## Decisões de Arquitetura (ADRs)
### ADR 1: Abstração do build com `nwb`
- **Contexto:** A criação de uma biblioteca React reutilizável exige a configuração de múltiplos formatos de build (ES Modules, UMD), transpilação com Babel, um servidor de desenvolvimento para a demo e um executor de testes. Configurar isso manualmente é complexo e propenso a erros.
- **Decisão:** Utilizar `nwb` como a ferramenta de linha de comando para gerenciar todo o ciclo de vida do projeto (build, desenvolvimento e testes).
- **Consequências:**
  - **Positivas:** Reduz drasticamente a complexidade de configuração. Garante builds otimizados para consumo em diferentes ambientes. Centraliza os scripts do projeto (`npm start`, `npm test`, `npm run build`).
  - **Negativas:** Cria uma dependência em uma ferramenta de "caixa-preta", o que pode dificultar customizações avançadas do processo de build se necessário no futuro.

### ADR 2: Encapsulamento da lógica de item no `OptionWrapper`
- **Contexto:** Cada `<Option>` dentro do seletor precisa de lógica para gerenciar interações de teclado, foco, estado de "desabilitado" e atributos ARIA, que não devem ser responsabilidade do usuário da biblioteca.
- **Decisão:** Criar um componente interno e privado, `OptionWrapper`, que é usado exclusivamente pelo `Select` para envolver cada `Option` passada como `children`.
- **Consequências:**
  - **Positivas:** API pública mais limpa e simples; o desenvolvedor só precisa se preocupar com `Select` e `Option`. Centraliza a lógica de interação e acessibilidade em um único local, facilitando a manutenção.
  - **Negativas:** Aumenta a complexidade interna do componente `Select`. O próprio código reconhece este componente como um ponto de dívida técnica a ser refatorado.

### ADR 3: Foco em Acessibilidade via ARIA
- **Contexto:** Um dos principais diferenciais do projeto é ser uma alternativa acessível. Componentes de `select` customizados são notoriamente difíceis de implementar de forma acessível para leitores de tela e navegação por teclado.
- **Decisão:** Seguir estritamente as práticas recomendadas pela WAI-ARIA (e.g., padrão `menubutton`), implementando papéis (`roles`), estados (`aria-live`, `aria-disabled`) e gerenciamento de foco rigoroso.
- **Consequências:**
  - **Positivas:** O componente é utilizável por um público mais amplo, incluindo usuários com deficiências visuais ou motoras. O código se torna mais semântico e previsível.
  - **Negativas:** Aumenta a complexidade da lógica de gerenciamento de estado e de eventos do teclado (e.g., pular opções desabilitadas, restaurar o foco ao fechar).

## Dependências Externas
| Dependência | Tipo | Propósito |
|---|---|---|
| npm | SDK | Gerenciamento de dependências e publicação do pacote da biblioteca. |
| Travis CI | Serviço (CI/CD) | Execução automatizada de testes e integração contínua. |
| Coveralls / codecov.io | API (HTTP outbound) | Publicação e monitoramento da cobertura de código dos testes. |
| GitHub Pages | Serviço (Deployment) | Hospedagem da aplicação de demonstração do componente. |
| `lodash.uniqueid` | SDK | Geração de IDs únicos para elementos do DOM, essencial para associar labels aos inputs de forma acessível (`id`/`htmlFor`). |
| `enzyme` | SDK | Biblioteca de testes para inspecionar, atravessar e simular eventos em componentes React. |

## Pontos de Atenção
- **Dívida Técnica:** O componente `Select` é considerado muito grande (`way too large`) e o `OptionWrapper` é descrito como `hideous`. Ambos estão marcados com TODOs para refatoração, visando quebrar a lógica em subcomponentes menores e mais gerenciáveis.
- **Cobertura de Testes:** Existe uma lacuna conhecida nos testes: a funcionalidade de fechar o seletor ao clicar fora dele não possui um teste automatizado devido a dificuldades com o `Enzyme`.
- **Funcionalidades Futuras:** O projeto tem uma lista de funcionalidades desejadas, mas não implementadas, como suporte a `<OptGroup>`, separadores, navegação por digitação de letras e a adição de mais callbacks de ciclo de vida.
- **Tipagem Estática:** Há uma discussão em aberto sobre a adoção de Flow ou TypeScript para adicionar verificação de tipos estática, o que poderia melhorar a robustez e a manutenibilidade do código.

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Valide com o time antes de mergear.