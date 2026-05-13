# react-a11y-select-alt — Catálogo de Eventos e Comunicação

## Tipo de Comunicação
> A comunicação deste componente de UI é baseada em callbacks (props do React) para notificar a aplicação consumidora sobre mudanças de estado, e no consumo de eventos do DOM (Document Object Model) do navegador para capturar interações do usuário, como cliques e pressionamento de teclas. Não utiliza padrões de comunicação de backend como message brokers, WebSockets ou gRPC.

## Eventos Publicados (Domain Events)
> Este serviço não publica domain events. Suas "publicações" são feitas através de callbacks de props do React.

### `onChange`
- **Quando:** Disparado quando o usuário seleciona uma nova opção no componente `Select`, seja por clique ou por navegação via teclado (ENTER/SPACE).
- **Payload principal:** O valor (`value`) da opção que foi selecionada.
- **Consumidores conhecidos:** A aplicação que está utilizando o componente `react-a11y-select-alt`.

## Eventos Consumidos (Domain Events)
> Este serviço não consome domain events. Ele consome eventos nativos do DOM do navegador.

### `mousedown`
- **Origem:** `document`
- **O que faz:** Detecta um clique fora da área do componente `Select` para acionar a lógica de fechamento do menu dropdown, garantindo que o foco seja restaurado corretamente.

### `keydown`
- **Origem:** `browser`
- **O que faz:** Captura o pressionamento de teclas para implementar a navegação acessível e a interação com o seletor. As ações incluem:
  - `DOWN` / `UP`: Navega entre as opções habilitadas.
  - `ENTER` / `SPACE`: Seleciona a opção destacada ou abre/fecha o menu.
  - `ESC`: Fecha o menu de opções.

## Diagrama de Fluxo

```
[Usuário (Navegador)] --keydown/mousedown--> [react-a11y-select-alt] --onChange(valor)--> [Aplicação Consumidora]
```

---
> ⚠️ Rascunho gerado automaticamente pelo Lumina. Valide os nomes com o código antes de mergear.