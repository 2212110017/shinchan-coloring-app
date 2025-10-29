// src/App.jsx (以前修正したシンプルなバージョン)

import React, { useState } from 'react';
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge'; 

import characters from './data/characters';
import { useCollectionStore } from './hooks/useCollectionStore';

const APP_BACKGROUND_IMAGE_URL = '/assets/shinchan_bg.png';

// 塗り絵チャレンジ画面用の基本スタイル (幅100%で背景を覆う)
const coloringAppStyle = {
  // 背景設定
  backgroundImage: `url(${APP_BACKGROUND_IMAGE_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  
  minHeight: '100vh',
  width: '100%',
  // 💡 中央揃えやレイアウトはColoringChallenge.jsxのインラインスタイルに任せる
};

// 🎯 修正: コレクション画面用のスタイル (Flexboxで中央寄せ)
const collectionAppStyle = {
  ...coloringAppStyle, // 基本スタイルを継承
  
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // 垂直中央寄せ
  alignItems: 'center',     // 水平中央寄せ
  
  // 縦長になるのを防ぐため、カードリスト全体に最大幅を設定
  maxWidth: '1280px', 
  margin: '0 auto',
};


function App() {
  const { unlockCard } = useCollectionStore(); 
  const [currentChallengeId, setCurrentChallengeId] = useState(null); 
  
  const challengeCharacter = characters.find(c => c.id === currentChallengeId);
  
  const returnToCollection = () => {
    setCurrentChallengeId(null);
  };

  const handleGameComplete = () => {
    if (currentChallengeId) {
      unlockCard(currentChallengeId); 
      alert(`🎉「${challengeCharacter.name}」のカードをゲットしました！コレクションに追加！`);
    }
    returnToCollection();
  };

  
  if (currentChallengeId && challengeCharacter) {
    
    // 塗り絵画面: coloringAppStyleを適用 (背景のみ)
    return (
      <div style={coloringAppStyle}>
        
        <ColoringChallenge 
            characterId={currentChallengeId}
            onComplete={handleGameComplete} 
            onCancel={returnToCollection} 
        />
      </div>
    );
  }

  // 🎯 コレクション画面: collectionAppStyleを適用 (Flexboxで中央寄せ)
  return (
    <div style={collectionAppStyle}>
        <CollectionScreen 
          onStartChallenge={setCurrentChallengeId} 
        />
    </div>
  );
}

export default App;