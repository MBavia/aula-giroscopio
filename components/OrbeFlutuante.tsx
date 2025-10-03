import React, { useState, useEffect, useCallback } from 'react';
// Importamos 'TouchableOpacity' para criar o botão
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const { width, height } = Dimensions.get('window');
const PLAYER_SIZE = 50;
const ORB_SIZE = 30;

const MAX_SCORE = 20;

// A função que gera a posição do orbe.
const generateRandomPosition = () => {
  const position = {
    x: Math.random() * (width - ORB_SIZE),
    y: Math.random() * (height - ORB_SIZE),
  };
  return position;
};

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [playerPosition, setPlayerPosition] = useState({ x: width / 2, y: height / 2 });
  const [orbPosition, setOrbPosition] = useState(generateRandomPosition());
  
  const [score, setScore] = useState(0); 
  const [isGameComplete, setIsGameComplete] = useState(false); 

  // NOVO: Função para reiniciar o jogo
  const resetGame = useCallback(() => {
    setScore(0);
    setIsGameComplete(false);
    setPlayerPosition({ x: width / 2, y: height / 2 }); // Reposiciona o player
    setOrbPosition(generateRandomPosition()); // Gera um novo orbe inicial
  }, []); // Sem dependências para ser recriada apenas uma vez

  useEffect(() => {
    Gyroscope.setUpdateInterval(16);

    const subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // O movimento deve continuar mesmo com o jogo completo, mas o player pode parar de se mover
    // se você quiser que ele fique parado na tela de vitória.
    // Manter o movimento é geralmente melhor para a experiência de usuário.
    let newX = playerPosition.x - data.y * 10; 
    let newY = playerPosition.y - data.x * 10;

    if (newX < 0) newX = 0;
    if (newX > width - PLAYER_SIZE) newX = width - PLAYER_SIZE;
    if (newY < 0) newY = 0;
    if (newY > height - PLAYER_SIZE) newY = height - PLAYER_SIZE;

    setPlayerPosition({ x: newX, y: newY });
  }, [data]);

  useEffect(() => {
    // Sai se o jogo estiver completo
    if (isGameComplete) return; 
      
    // Lógica para detectar colisão
    const playerCenterX = playerPosition.x + PLAYER_SIZE / 2;
    const playerCenterY = playerPosition.y + PLAYER_SIZE / 2;
    const orbCenterX = orbPosition.x + ORB_SIZE / 2;
    const orbCenterY = orbPosition.y + ORB_SIZE / 2;

    const dx = playerCenterX - orbCenterX;
    const dy = playerCenterY - orbCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (PLAYER_SIZE / 2) + (ORB_SIZE / 2)) {
      
      // Atualiza o placar
      setScore(prevScore => {
        const newScore = prevScore + 1;
        
        // Verifica se o novo placar é o máximo
        if (newScore >= MAX_SCORE) {
          setIsGameComplete(true);
          // Move o orbe para fora da tela na coleta final
          setOrbPosition({x: -100, y: -100}); 
          return MAX_SCORE; 
        }
        
        // Se ainda não é o máximo, gera um novo orbe.
        setOrbPosition(generateRandomPosition());
        return newScore;
      });
    }
  }, [playerPosition, isGameComplete, score]); 

  return (
    <View style={styles.container}>
      
      {/* Exibe o placar. */}
      <Text style={styles.scoreText}>Pontuação: {score}</Text>
      
      {isGameComplete ? (
          // Tela de Parabéns e Reinício
          <View style={styles.congratulationsBox}>
              <Text style={styles.congratulationsText}>🏆 PONTUAÇÃO MÁXIMA!</Text>
              <Text style={styles.congratulationsSubText}>Parabéns, você coletou todos os {MAX_SCORE} orbes!</Text>
              
              {/* NOVO: Botão de Reinício */}
              <TouchableOpacity
                style={styles.restartButton}
                onPress={resetGame}
              >
                <Text style={styles.restartButtonText}>JOGAR NOVAMENTE</Text>
              </TouchableOpacity>
          </View>
      ) : (
          // Instrução Padrão
          <Text style={styles.instructions}>Colete o orbe azul!</Text>
      )}
      
      {/* O orbe só é renderizado se o jogo NÃO estiver completo */}
      {!isGameComplete && (
        <View
          style={[
            styles.orb,
            {
              left: orbPosition.x,
              top: orbPosition.y,
            },
          ]}
        />
      )}
      
      <View
        style={[
          styles.player,
          {
            left: playerPosition.x,
            top: playerPosition.y,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scoreText: {
    position: 'absolute',
    top: 30, 
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1c40f', 
    zIndex: 10,
  },
  instructions: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  congratulationsBox: {
    position: 'absolute',
    top: height / 2 - 120, // Ajustado para incluir o botão
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#3498db', 
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  congratulationsSubText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20, // Espaço antes do botão
  },
  // NOVOS ESTILOS para o botão de reinício
  restartButton: {
    backgroundColor: 'coral', // Cor de destaque para o botão
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    borderRadius: PLAYER_SIZE / 2,
    backgroundColor: 'coral',
    borderWidth: 2,
    borderColor: '#fff',
  },
  orb: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#fff',
  },
});