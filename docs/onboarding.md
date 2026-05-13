# react-a11y-select-alt — Guia de Onboarding

## O que você precisa saber primeiro

Bem-vindo(a) ao `react-a11y-select-alt`! Este projeto é uma biblioteca de componentes UI em React para construir um `<select>` acessível (dropdown/menu). Ele nasceu como uma alternativa mais simples e focada ao `react-a11y-select` original, com o objetivo de seguir à risca as práticas de acessibilidade da WAI-ARIA.

Na prática, nosso trabalho é fornecer dois componentes principais, `<Select>` e `<Option>`, que juntos criam um dropdown robusto, navegável por teclado e compatível com leitores de tela. O componente `<Select>` gerencia todo o estado complexo — se está aberto, qual opção está destacada, e o valor selecionado — enquanto o `<Option>` é apenas um item da lista. O grande desafio aqui é lidar com toda a lógica de eventos de teclado, foco e atributos ARIA para que os desenvolvedores que usam a nossa lib não precisem se preocupar com isso.

## Como rodar localmente

Para trabalhar no componente, você vai rodar a aplicação de demonstração (`demo/`) que serve como nosso playground de desenvolvimento e testes manuais.

### Pré-requisitos
- **Node.js**: A versão 4 ou superior é necessária. Você pode instalar usando o [site oficial](https://nodejs.org/) ou um gerenciador de versões como o `nvm`.
- **npm**: Já vem instalado com o Node.js.

### Passos
```bash
# 1. Clone o repositório
git clone https://github.com/dwardu/react-a11y-select-alt.git
cd react-a11y-select-alt

# 2. Instale as dependências
npm install

# 3. Suba o ambiente de desenvolvimento (a app de demo)
npm start
```
Após o último comando, o servidor de desenvolvimento do `nwb` iniciará e você poderá acessar a página de demonstração em `http://localhost:3000`.

### Configurações necessárias
Esta é uma biblioteca de componentes frontend. Você não precisa de nenhuma variável de ambiente ou configuração especial para rodar o ambiente de desenvolvimento local.

| Variável | Valor local | Para que serve |
|---|---|---|
| N/A | N/A | Nenhuma configuração de ambiente é necessária. |

## Arquitetura em 5 minutos
Somos uma **Biblioteca de Componentes UI**. A arquitetura é centrada nos componentes React que exportamos. O `nwb` é a ferramenta que cuida de todo o nosso ferramental de build, testes e desenvolvimento.

- **Componentes Públicos (`Select`, `Option`):** São a API principal da biblioteca. O `<Select>` é o "cérebro", um componente stateful que controla toda a lógica de interação, estado (aberto/fechado, valor) e acessibilidade (atributos ARIA). O `<Option>` é um componente mais simples que representa um item na lista.
- **Componentes Internos (`OptionWrapper`):** Usamos componentes "privados" para encapsular lógica que não deve ser exposta. O `OptionWrapper`, por exemplo, adiciona handlers de eventos e atributos ARIA a cada `<Option>` filho.
- **Utilitários (`OptionCollection`):** Classes puras de JavaScript para lidar com lógica de domínio desacoplada do React. A `OptionCollection` é um bom exemplo: ela gerencia a lista de opções, permitindo buscar, navegar para o próximo/anterior e pular itens desabilitados.
- **Estilo:** Usamos CSS puro com a convenção BEM para evitar conflitos de nomes de classe quando a biblioteca é usada em outros projetos.
- **Testes:** Usamos `Enzyme` para testes unitários e de componentes. As especificações vivem junto aos componentes que testam (`.spec.js`).

## Onde está cada coisa
| O que procuro | Onde encontro |
|---|---|
| Lógica principal do seletor (estado, eventos) | `src/Select.js` |
| Componente para cada item da lista | `src/Option.js` |
| Classe que gerencia a coleção de opções | `src/OptionCollection.js` |
| Aplicação de demonstração | `demo/src/index.js` |
| Testes unitários dos componentes | Arquivos `.spec.js` dentro de `src/` |
| Estilos dos componentes | Arquivos CSS dentro de `src/` |

## Fluxos principais para entender primeiro
1. **Seleção de uma opção com o mouse** — Começa quando o usuário clica no `SelectButton`. O estado `isOpen` no `<Select>` vira `true`, renderizando a lista de `OptionWrapper`. O usuário clica em um `Option`. O handler de `onClick` do `OptionWrapper` chama a função `onChange` passada pelo `<Select>`, que atualiza o valor, fecha o menu (`isOpen: false`) e devolve o foco para o botão.
2. **Navegação e seleção via teclado** — Começa com o foco no `SelectButton`. O usuário pressiona `ArrowDown` ou `ArrowUp`. O `<Select>` intercepta o `keydown`, abre o menu e destaca a primeira/última opção habilitada usando a `OptionCollection`. As setas continuam navegando entre as opções (pulando as desabilitadas). `Enter` ou `Space` selecionam a opção destacada, e `ESC` fecha o menu sem alterar o valor. Em todos os casos de fechamento, o foco retorna ao `SelectButton`.

## Armadilhas comuns
- **O componente `Select.js` é grande:** Este é um `TODO` conhecido. O componente cresceu bastante e concentra muita responsabilidade. Ao mexer nele, tenha cuidado para não introduzir efeitos colaterais. A refatoração para quebrá-lo em componentes menores é bem-vinda.
- **Acessibilidade é obrigatória, não opcional:** O componente `Select` **exige** uma prop `label` ou `labelledBy`. Se você esquecer isso, o componente não será acessível e falhará em seu propósito principal. Sempre teste com leitores de tela em mente.
- **Testar "click-outside" é complicado:** Temos um `TODO` aberto sobre a dificuldade de testar o fechamento do menu ao clicar fora dele com o `Enzyme`. Se você precisar trabalhar nessa parte, saiba que os testes atuais podem não cobrir tudo e a solução pode não ser trivial.
- **`OptionWrapper` é estranho de propósito:** Você vai ver um `TODO` dizendo que o `OptionWrapper` é "horrível" (`hideous`). Ele é um componente interno complexo que usa `React.cloneElement` para injetar props nos filhos. Evite mexer nele a menos que seja necessário; ele é uma peça central, porém sensível.

## Quem perguntar
- **Dúvidas de negócio (funcionalidades, casos de uso):** O melhor lugar é abrir uma **Issue no GitHub**. A comunidade e os mantenedores usam as issues para discutir novas funcionalidades e o escopo do projeto.
- **Dúvidas técnicas:** **PREENCHER com os mantenedores principais**. Para dúvidas gerais, abrir uma Issue no GitHub também é uma ótima opção para que a resposta fique documentada para todos.

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Adicione os passos reais de setup antes de mergear.