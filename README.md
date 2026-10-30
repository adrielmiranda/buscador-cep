# 📍 Buscador CEP

Uma aplicação web moderna, limpa e responsiva para consulta de endereços através de CEP, desenvolvida com **HTML5**, **CSS3 (com Design System e variáveis)** e **JavaScript Vanilla (Assíncrono)**, consumindo os dados da API pública do ViaCEP.

---

## 🚀 Demonstração e Funcionalidades

* **Consulta em Tempo Real:** Validação estrita de 8 dígitos e sanitização de caracteres com Expressões Regulares (Regex).
* **Feedback Dinâmico (Toast):** Alertas visuais personalizados para avisos de formato incorreto ou falhas de busca.
* **Integração com Google Maps:** Geração automática de link com coordenadas formatadas (`encodeURIComponent`) para abrir a localização exata em uma nova aba.
* **Cópia Rápida (Clipboard API):** Copie o endereço formatado para a área de transferência com um único clique e feedback visual interativo (ícone de sucesso).
* **Design Responsivo:** Adaptado perfeitamente para diferentes tamanhos de tela (smartphones, tablets e desktops) utilizando `@media queries` refinadas.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

Este projeto foi construído do zero, focando em boas práticas de mercado e sem o uso de frameworks:

* **HTML5:** Marcação semântica e acessível.
* **CSS3:** 
  * Arquitetura limpa com variáveis globais (`:root`).
  * Padronização de medidas utilizando `rem` (com base em `62.5%`).
  * Gradientes customizados e sombras modernas.
  * Responsividade completa (*Mobile First*).
* **JavaScript (ES6+):**
  * Consumo de API REST com `fetch` e `async/await`.
  * Tratamento robusto de erros com blocos `try...catch...finally`.
  * Manipulação moderna da DOM e API Clipboard.
  * Criação programática de componentes reutilizáveis (sistema de Toast).
* **APIs Externas:**
  * [ViaCEP](https://viacep.com.br/) (Consulta de dados de endereço).
  * [Google Maps Search](https://www.google.com/maps) (Redirecionamento geolocalizado).

---

## 📂 Estrutura do Projeto

```text
buscador-cep/
├── css/
│   ├── style.css       # Estilos principais da aplicação e responsividade
│   └── variables.css   # Design System (Cores, sombras, bordas e variáveis :root)
├── index.html          # Estrutura HTML semântica
├── index.js            # Lógica da aplicação, requisições e manipulação de eventos
└── README.md           # Documentação do projeto