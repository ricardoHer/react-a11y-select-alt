# react-a11y-select-alt — Superfície de API

## Visão Geral
- **Tipo:** Biblioteca de Componentes React
- **Base URL:** Não se aplica
- **Autenticação:** Não se aplica
- **Formato:** Componentes React (JSX)

## API de Componentes

A API pública da biblioteca é composta pelos componentes React `<Select>` e `<Option>`.

### Componente `<Select>`
**Descrição:** Componente principal que renderiza um seletor/dropdown acessível. Ele gerencia o estado, a interação do usuário (clique, teclado) e a seleção das opções filhas.

**Props (API de entrada):**
```jsx
{
  "children": "node — Obrigatório. Elementos `<Option>` que compõem a lista.",
  "label": "string — Rótulo de acessibilidade para o seletor. Obrigatório se `labelledBy` não for fornecido.",
  "labelledBy": "string — ID de um elemento externo que rotula o seletor. Obrigatório se `label` não for fornecido.",
  "value": "any — Permite o uso como um componente controlado, definindo o valor selecionado externamente.",
  "onChange": "function(value) — Callback executado quando uma opção é selecionada. Recebe o `value` da nova opção como argumento.",
  "placeholderText": "string — Texto exibido quando nenhum valor está selecionado.",
  "indicator": "string — Caractere (geralmente Unicode) usado como ícone de seta no botão."
}
```

**Eventos Publicados:**
- **`onChange`**: Disparado quando o usuário seleciona uma nova opção.

---

### Componente `<Option>`
**Descrição:** Representa uma única opção selecionável e deve ser usado como filho direto do componente `<Select>`.

**Props (API de entrada):**
```jsx
{
  "children": "node — Obrigatório. O conteúdo a ser exibido como texto da opção.",
  "value": "any — Obrigatório. O valor único associado a esta opção, que é passado para o callback `onChange` do `<Select>`.",
  "disabled": "boolean — Se `true`, a opção não pode ser selecionada ou destacada via teclado/mouse. Padrão: `false`.",
  "cssClassName": "string — Classe CSS customizada a ser aplicada ao elemento da opção.",
  "customId": "string — ID customizado para o elemento da opção."
}
```

## Validações e Requisitos
| Componente | Requisito | Quando ocorre |
|---|---|---|
| `<Select>` | Ausência das props `label` e `labelledBy`. | O componente não estará em conformidade com as diretrizes de acessibilidade (ARIA), prejudicando a usabilidade com leitores de tela. Pelo menos uma delas deve ser fornecida. |

---

## Autenticação e Autorização
Não se aplica. Este é um componente de UI de front-end para ser consumido em uma aplicação React.

## Rate Limiting
Não se aplica.

## Versionamento
O versionamento do pacote segue o padrão [Semantic Versioning (SemVer)](https://semver.org/) e é distribuído via npm.

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Valide os contratos com o código-fonte ou a documentação oficial antes de usar.