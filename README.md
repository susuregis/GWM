# FitLife - Aplicativo de Treino e Alimentação

FitLife é um Progressive Web App (PWA) desenvolvido com HTML, CSS e JavaScript para acompanhamento de treinos e alimentação.

## Funcionalidades

- **Treinos**: Acompanhe seus treinos diários, crie planos de exercícios personalizados e registre seu progresso.
  - Cronômetro para cada exercício individual
  - Registro de séries, repetições e pesos utilizados
  - Sistema de histórico para acompanhamento de evolução
- **Alimentação**: Controle sua ingestão calórica diária e macronutrientes, registre suas refeições e alimentos.
- **Progresso**: Visualize gráficos de progresso de peso corporal, medidas e ingestão calórica.
- **Autenticação**: Sistema de login com email/senha e opção de login social com Google.
- **Perfil de Usuário**: Personalize suas informações e configure suas preferências.
- **Funciona Offline**: Por ser um PWA, o aplicativo funciona mesmo sem conexão com internet.
- **Instalável**: Pode ser instalado na tela inicial de dispositivos móveis e desktops.

## Sistema de Autenticação

O FitLife oferece um sistema completo de autenticação com:

- **Duas opções de login**:
  - Login tradicional com email e senha
  - Login social com Google
- **Gerenciamento de perfil**:
  - Edição de dados pessoais
  - Configuração de preferências de treino
  - Alteração de senha
  - Exclusão de conta
- **Segurança**:
  - Armazenamento seguro de dados
  - Opção "lembrar-me"
  - Proteção de rotas para usuários não autenticados

## Sistema de Treino e Cronômetro

O FitLife oferece um sistema avançado para gerenciamento de treinos:

### Cronômetro de Exercícios
- **Cronômetro individual** para cada exercício
- **Funções de controle**: Iniciar, pausar e reiniciar
- **Registro de tempo** automático para cada série realizada
- **Salvamento do histórico** de tempo para análise de desempenho

### Registro de Séries e Repetições
- **Sistema completo de registro** para cada exercício
- **Acompanhamento de séries**: Registre o número de repetições e peso em cada série
- **Histórico detalhado**: Data, hora e desempenho de cada treino
- **Análise de progresso**: Compare seu desempenho ao longo do tempo

### Templates de Treinos
- **Templates pré-definidos** para todos os níveis de experiência
- Programas para **iniciantes**, **intermediários** e **avançados**
- Diferentes estilos de treino:
  - **Full Body** (3x por semana)
  - **Divisão ABC** (3x por semana)
  - **Push/Pull/Legs** (6x por semana)
  - **Alta Intensidade** (5x por semana)

### Criação de Treinos Personalizados
- **Editor de treinos** com interface intuitiva
- **Personalize completamente** seus treinos
- Adicione exercícios com especificações de **séries**, **repetições**, e **peso**
- Inclua **instruções detalhadas** para execução correta
- Organize seus treinos por **dias da semana**

## Como Usar

1. Acesse o aplicativo através de um navegador web moderno
2. Crie uma conta ou faça login com suas credenciais ou conta Google
3. Personalize seu perfil com seus dados e preferências
4. Para instalar no seu dispositivo:
   - **Android/Chrome**: Toque no botão "Adicionar à tela inicial"
   - **iOS/Safari**: Toque no botão de compartilhamento e depois em "Adicionar à tela de início"
   - **Desktop**: Clique no ícone de instalação na barra de endereço do navegador

## Requisitos do Sistema

- Navegador moderno com suporte a PWA (Chrome, Firefox, Edge, Safari)
- Para melhor experiência, recomendamos o uso do Google Chrome

## Adicionando Imagens

Para o funcionamento correto do aplicativo, você deve adicionar as seguintes imagens:

### Ícones
Adicione ícones do aplicativo nos seguintes tamanhos na pasta `img/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Logo
Adicione o logo do aplicativo como `img/logo.png`

### Imagens de Exercícios
Adicione imagens dos exercícios na pasta `img/exercises/`:
- squat.jpg
- leg-press.jpg
- leg-extension.jpg
- (e outras imagens de exercícios conforme necessário)

## Desenvolvimento

Este projeto foi desenvolvido usando:
- HTML5
- CSS3 (com variáveis CSS e flexbox/grid)
- JavaScript (ES6+)
- Chart.js (para os gráficos)
- FontAwesome (para os ícones)

## Personalização

Você pode personalizar este aplicativo editando:
- `manifest.json`: Para alterar nome, cores e outras configurações do PWA
- `css/style.css`: Para modificar o estilo visual e tema
- `js/app.js`: Para alterar a funcionalidade e dados

## Próximos Passos

Algumas ideias para melhorar este aplicativo:
- Implementar sincronização de dados com um backend real
- Adicionar gráficos de progresso específicos para cada exercício
- Implementar notificações push para lembretes de treino
- Adicionar recursos de pesquisa de alimentos e informações nutricionais
- Permitir compartilhamento de treinos entre usuários
- Implementar funcionalidade de exportação de dados em PDF ou CSV
- Adicionar suporte a múltiplas linguagens
