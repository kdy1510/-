import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Pause, Play } from 'lucide-react';

// 임시 카드 데이터 (실제 게임 데이터로 교체해야 함)
const CARD_DATA_LEVEL_1 = [
  { id: 1, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 2, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 3, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 4, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 5, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
  { id: 6, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
];
const CARD_DATA_LEVEL_2 = [
  { id: 7, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 8, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 9, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 10, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 11, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
  { id: 12, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
  { id: 13, word: "오렌지", english: "Orange", image: "https://images.unsplash.com/photo-1584273536849-13591a99415c" },
  { id: 14, word: "오렌지", english: "Orange", image: "https://images.unsplash.com/photo-1584273536849-13591a99415c" },
];
const CARD_DATA_LEVEL_3 = [
  { id: 15, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 16, word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 17, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 18, word: "바나나", english: "Banana", image: "https://images.unsplash.com/photo-1587132885341-15aeb591446d" },
  { id: 19, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
  { id: 20, word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393" },
  { id: 21, word: "오렌지", english: "Orange", image: "https://images.unsplash.com/photo-1584273536849-13591a99415c" },
  { id: 22, word: "오렌지", english: "Orange", image: "https://images.unsplash.com/photo-1584273536849-13591a99415c" },
  { id: 23, word: "딸기", english: "Strawberry", image: "https://images.unsplash.com/photo-1600828981944-7439a6584a8e" },
  { id: 24, word: "딸기", english: "Strawberry", image: "https://images.unsplash.com/photo-1600828981944-7439a6584a8e" },
];

const LEVEL_CARD_DATA = [
  CARD_DATA_LEVEL_1,
  CARD_DATA_LEVEL_2,
  CARD_DATA_LEVEL_3,
];

const FlashcardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1); // 레벨 상태 추가
  const [cards, setCards] = useState(LEVEL_CARD_DATA[0]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLimit(1)); // 시간 제한 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [key, setKey] = useState(0);


  // 레벨에 따른 카드 수 및 시간 제한 설정
  useEffect(() => {
    setCards(LEVEL_CARD_DATA[level - 1] || LEVEL_CARD_DATA[LEVEL_CARD_DATA.length - 1]); // 최대 레벨 유지
    setTimeLeft(calculateTimeLimit(level));
    setMatchedCards([]);
    setFlippedCards([]);
    setIsCorrect(null);
    setKey(prevKey => prevKey + 1);
  }, [level]);

  useEffect(() => {
    if (!isPaused) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else {
        setIsCorrect(false);
        setTimeout(() => {
          handleLevelClear(false); // Time out 실패 처리
        }, 1000);
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isPaused]);


  const handleCardClick = (cardId: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(cardId) && !matchedCards.includes(cardId) && !isPaused) {
      setFlippedCards([...flippedCards, cardId]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.image === secondCard.image && firstCard.id !== secondCard.id) {
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
        setFlippedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          setIsCorrect(true);
          setTimeout(() => {
            handleLevelClear(true); // 성공 시 레벨 클리어 처리
          }, 1000);
        }
      } else {
        setIsCorrect(false);
        setTimeout(() => {
          setFlippedCards([]);
          setIsCorrect(null);
        }, 1000); // 1초 후에 카드 다시 뒤집기
      }
    }
  }, [flippedCards, cards, matchedCards]);

  const isFlipped = (cardId: number) => flippedCards.includes(cardId) || matchedCards.includes(cardId);
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleLevelClear = (success: boolean) => {
    setIsPaused(true); // 레벨 클리어/실패 시 일시정지
    if (success) {
      alert(`Level ${level} Clear!`);
      if (level < LEVEL_CARD_DATA.length) {
        setLevel(level + 1); // 레벨 업
      } else {
        alert("Congratulations! You've completed all levels!");
        navigate('/menu'); // 최종 레벨 클리어 후 메뉴 이동
      }
    } else {
      alert(`Level ${level} Failed!`);
      setLevel(1); // 실패 시 레벨 1로 초기화
      navigate('/menu'); // 실패 후 메뉴 이동
    }
    setIsPaused(false); // 초기화 후 재시작 가능하도록 일시정지 해제
  };

  // 레벨에 따른 시간 제한 계산 함수
  function calculateTimeLimit(currentLevel: number) {
    const baseTimeLimit = 30; // 기본 시간 (초)
    const difficultyFactor = 2; // 레벨 당 감소 시간 계수
    const minTimeLimit = 10;  // 최소 시간 (초)
    let timeLimit = baseTimeLimit - (currentLevel - 1) * difficultyFactor;
    return Math.max(minTimeLimit, timeLimit); // 최소 시간 제한 적용
  }

  const progressVariants = {
    initial: { width: '100%' },
    animate: {
      width: '0%',
      transition: {
        duration: timeLeft,
        ease: 'linear',
        animationPlayState: isPaused ? 'paused' : 'running'
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-screen bg-flashcard-background p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate('/menu')} className="game-button">
          <ArrowLeft className="mr-2 inline-block h-5 w-5" /> Menu
        </button>
        <br />
        <hr className="w-24 border-t border-gray-300"/>
      </div>

      <div className="mt-16 w-full max-w-md px-4" > {/* mt-12 -> mt-16 for more space */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            key={key}
            className="h-full bg-accent rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: timeLeft, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="mt-8 w-full max-w-md px-4">
        <div className="game-ui-panel relative w-full max-w-md mt-8 p-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-left">Level {level}</h2>
            <div className="text-xl font-bold">Time: {timeLeft}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {cards.map(card => (
              <div key={card.id} className="aspect-w-1 aspect-h-1">
                <button
                  className={`w-full h-full rounded-lg overflow-hidden transition-transform duration-500 ${isFlipped(card.id) ? 'transform-rotate-y-180' : ''} ${matchedCards.includes(card.id) ? 'opacity-0' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                  disabled={flippedCards.length >= 2 || matchedCards.includes(card.id)  || isPaused}
                >
                  <div className={`card-front absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold backface-hidden ${isFlipped(card.id) ? 'transform-rotate-y-180' : ''}`}>
                    ?
                  </div>
                  <div className={`card-back absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center p-2 backface-hidden ${!isFlipped(card.id) ? 'transform-rotate-y-180' : ''}`}>
                    <img src={card.image} alt={card.english} className="max-w-full max-h-24 object-contain mb-2" />
                    <span className="text-lg font-semibold">{card.word}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <button className="game-button mt-8 w-full text-lg" onClick={togglePause} disabled={matchedCards.length === cards.length}>
            {isPaused ? (
              <>
                <Play className="mr-2 inline-block h-5 w-5" /> Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 inline-block h-5 w-5" /> Pause
              </>
            )}
          </button>
          {isCorrect !== null && (
            <AnimatePresence>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-6 shadow-lg z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isCorrect ? (
                  <div className="flex items-center text-green-600 text-xl">
                    <CheckCircle2 className="h-8 w-8 mr-2" /> Level Clear!
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 text-xl">
                    <XCircle className="h-8 w-8 mr-2" /> Time Out!
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FlashcardScreen;
