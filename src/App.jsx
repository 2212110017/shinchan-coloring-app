// src/App.jsx

import React, { useState } from 'react';
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge'; 

import characters from './data/characters';
import { useCollectionStore } from './hooks/useCollectionStore';

const APP_BACKGROUND_IMAGE_URL = 'assets/shinchan_bg.png';

// ----------------------------------------------
// 🎯 SuccessModal コンポーネントの修正版
// ----------------------------------------------
const SuccessModal = ({ character, onAddToCollection, onDiscardAndReturn }) => {
    
    // スタイル定義 (省略)

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // 黒背景を濃くする
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    };

    const modalContentStyle = {
        backgroundColor: '#fffbe0', // カードと同じクリーム色
        padding: '40px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '550px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        border: '5px solid #FFC107', // ヒーローレアリティの金色
        transform: 'scale(1.05)',
        animation: 'bounce-in 0.5s ease-out',
        position: 'relative',
        
    };
    
    const titleStyle = {
        color: '#E0002A', // 赤
        fontSize: '2.5rem',
        fontWeight: '900',
        marginBottom: '20px',
        textShadow: '3px 3px 0 #fff',
        fontFamily: '"Mochiy Pop One", sans-serif',
        lineHeight: 1.2,
    };
    
    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        gap: '20px',
    };
    
    const confirmButtonStyle = {
        padding: '12px 30px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#4CAF50', // 緑
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '4px 4px 0 #38761d',
        transition: 'background-color 0.2s, box-shadow 0.2s',
    };
    
    const discardButtonStyle = {
        ...confirmButtonStyle,
        backgroundColor: '#ccc',
        color: '#333',
        boxShadow: '4px 4px 0 #999',
    };
    // スタイル定義ここまで

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                
                {/* 勝利のタイトル */}
                <h1 style={titleStyle}>
                    おめでとう！
                </h1>
                
                {/* ゲットしたカード名 */}
                <p style={{ fontSize: '1.5rem', color: '#333', marginBottom: '30px', fontWeight: 'bold' }}>
                    「{character.name}」のカードをゲットしました！
                </p>

                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '15px' }}>
                    コレクションに追加しますか？
                </p>

                <div style={buttonContainerStyle}>
                    <button 
                        // 🎯 修正: App.jsx側でIDが確定しているので、ここでは引数なしで実行する
                        onClick={onAddToCollection} 
                        style={confirmButtonStyle}
                    >
                        コレクションに追加する
                    </button>
                    <button 
                        onClick={onDiscardAndReturn}
                        style={discardButtonStyle}
                    >
                        今回は見送る
                    </button>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------
// App コンポーネント本体
// ----------------------------------------------
const coloringAppStyle = {
  // 背景設定
  backgroundImage: `url(${APP_BACKGROUND_IMAGE_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  
  minHeight: '100vh',
  width: '100%',
};

const collectionAppStyle = {
  ...coloringAppStyle, 
  
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',     
  
  maxWidth: '1280px', 
  margin: '0 auto',
};


function App() {
  const { unlockCard } = useCollectionStore(); 
  const [currentChallengeId, setCurrentChallengeId] = useState(null); 
  
  // 🏅 State の定義
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [justUnlockedId, setJustUnlockedId] = useState(null); // 一時的にIDを保持

  const challengeCharacter = characters.find(c => c.id === currentChallengeId);
  const unlockedCharacter = characters.find(c => c.id === justUnlockedId);
  
  const returnToCollection = () => {
    setCurrentChallengeId(null);
    setShowSuccessModal(false); // モーダルも閉じる
    setJustUnlockedId(null);
  };

  // 🎯 ゲーム完了時: モーダルを表示する
  const handleGameComplete = () => {
    if (currentChallengeId) {
      setJustUnlockedId(currentChallengeId); // IDを一時保存
      setShowSuccessModal(true); // モーダルを表示
    }
    setCurrentChallengeId(null); // チャレンジ画面を閉じる
  };
  
  // 🏅 モーダルからの「コレクションに追加」処理
  const handleAddToCollection = (id) => {
    if (id) {
      // ✅ ここで unlockCard を実行
      unlockCard(id); 
    }
    returnToCollection(); // コレクション画面に戻る
  };


  
  return (
    <div style={currentChallengeId ? coloringAppStyle : collectionAppStyle}>
      
      {/* 1. 塗り絵画面の表示 */}
      {currentChallengeId && challengeCharacter && (
        <ColoringChallenge 
            characterId={currentChallengeId}
            onComplete={handleGameComplete} // モーダル表示へ
            onCancel={returnToCollection} 
        />
      )}
      
      {/* 2. コレクション画面の表示 */}
      {!currentChallengeId && (
        <CollectionScreen 
          onStartChallenge={setCurrentChallengeId} 
        />
      )}
      
      {/* 3. 成功モーダルの表示 */}
      {showSuccessModal && unlockedCharacter && (
        <SuccessModal 
          character={unlockedCharacter}
          // 🚨 最重要修正: IDを確定させて、モーダルに渡す
          onAddToCollection={() => handleAddToCollection(unlockedCharacter.id)}
          onDiscardAndReturn={returnToCollection} 
        />
      )}
    </div>
  );
}

// 🚨 この行が main.jsx からの import で必要です
export default App;