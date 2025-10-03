# 🕹️ Orbe de Gira - Jogo Baseado em Giroscópio

> Status do Projeto: Concluído ✅
---

### Tabela de Conteúdos
* [Descrição do Projeto](#descrição-do-projeto)
* [Demonstração da Aplicação](#demonstração-da-aplicação)
* [Funcionalidades](#🚀-funcionalidades)
* [Tecnologias Utilizadas](#🛠️-tecnologias-utilizadas)
* [Pré-requisitos](#✅-pré-requisitos)
* [Como Rodar o Projeto Localmente](#⚙️-como-rodar-o-projeto-localmente)
* [Funcionalidade Adicional](#⭐-funcionalidade-adicional)
* [Autor](#👨‍💻-autor)

---

### Descrição do Projeto
<p align="center">
Este projeto é uma prova de conceito para um jogo casual multiplataforma (iOS/Android) que utiliza o <b>Giroscópio</b> do dispositivo móvel como principal mecanismo de controle. O objetivo do jogo é simples: mover um "player" (esfera coral) inclinando o celular e coletar um "orbe" (esfera azul) que aparece em posições aleatórias na tela. 
</p>
<p align="center">
O projeto foca na implementação de leitura suave e responsiva do sensor, lógica de colisão circular e gestão do estado do jogo, com um sistema de pontuação máxima e a opção de jogar novamente. É uma excelente demonstração de como interagir com o hardware do celular usando a biblioteca <code>expo-sensors</code>.
</p>

---


### Demonstração da Aplicação
<p align="center">
  <img src="imagens/foto1.png" alt="Tela inicial do jogo" width="250"/>
  <img src="imagens/foto2.png" alt="Jogando e coletando orbe" width="250"/>
  <img src="imagens/foto3.png" alt="Tela de vitória" width="250"/>
</p>


---

### 🚀 Funcionalidades

- **Controle por Giroscópio:** O player se move em tempo real (60 FPS) de acordo com a inclinação do celular, usando a rotação em torno dos eixos X e Y.
- **Colisão Circular:** Lógica precisa de detecção de colisão entre duas esferas (player e orbe) usando a distância entre seus centros.
- **Sistema de Vitória:** Atingir a pontuação máxima de **20 pontos** dispara uma tela de parabéns.
- **Reinício de Jogo:** Um botão "Jogar Novamente" permite reiniciar o jogo (placar, posição do player e estado) de forma rápida.
- **Limpeza do Sensor (`Cleanup`):** Utilização do `useEffect` para garantir que o sensor seja desativado automaticamente ao sair da tela, economizando bateria e evitando *memory leaks*.

---

### 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**: Utilizado para o ambiente de desenvolvimento e para acesso facilitado ao hardware.
- **`expo-sensors`**: Biblioteca essencial para a leitura de dados do giroscópio.
- **[TypeScript](https://www.typescriptlang.org/)**

---

### ✅ Pré-requisitos

Para rodar este projeto, você precisará de:
1.  **Node.js** instalado.
2.  **Expo CLI** instalado globalmente (`npm install -g expo-cli`).
3.  Um **dispositivo móvel físico (iOS ou Android)**, pois o simulador não possui dados de giroscópio para testar a funcionalidade principal.

---

### ⚙️ Como Rodar o Projeto Localmente

Siga estas instruções no seu terminal:

```bash
# 1. Clone o repositório
$ git clone [link-do-seu-repositorio]

# 2. Navegue até o diretório do projeto
$ cd orbe-de-gira # Mude para o nome do diretório do seu projeto

# 3. Instale as dependências do Node.js e Expo
$ npm install

# 4. Inicie o servidor de desenvolvimento
$ npm start

### 👨‍💻 Autor(a)

Desenvolvido por **[Manoela Bavia Camargo Pereira]**.

Sob a orientação do **Prof. Rafael Ribas**.