// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge'; 

import characters from './data/characters';
// useCollectionStore の import は削除
// import { useCollectionStore } from './hooks/useCollectionStore'; 

const APP_BACKGROUND_IMAGE_URL = 'assets/shinchan_bg.png';

// ----------------------------------------------
// 🏅 ランク定義 (変更なし)
// ----------------------------------------------
const RANK_TIERS = [
    { clears: 30, stars: 4, color: '#FF1493', name: 'レジェンド' }, 
    { clears: 25, stars: 4, color: '#00B894', name: 'マスター' }, 
    { clears: 20, stars: 4, color: '#FFC107', name: 'ベテラン' }, 
    { clears: 15, stars: 3, color: '#FFC107', name: '上級者' },
    { clears: 10, stars: 2, color: '#FFC107', name: '中級者' },
    { clears: 5, stars: 1, color: '#FFC107', name: '初級者' },
];

// クリア回数に基づいて現在のランクと次のランクへの情報を計算する関数 (変更なし)
const getRankInfo = (clearCount) => {
    const sortedTiers = [...RANK_TIERS].sort((a, b) => b.clears - a.clears);
    
    let currentTier = sortedTiers.find(tier => clearCount >= tier.clears) || { clears: 0, stars: 0, color: '#ccc', name: '未到達' };
    
    const nextTierIndex = sortedTiers.findIndex(tier => tier.clears === currentTier.clears) - 1;
    const nextTier = sortedTiers[nextTierIndex] || null;

    const isMaxRank = !nextTier && currentTier.clears > 0;
    const clearsToNext = nextTier ? nextTier.clears - clearCount : 0;
    
    if (clearCount < 5) {
        currentTier = { clears: 0, stars: 0, color: '#ccc', name: '未到達' };
        return { 
            current: currentTier, 
            next: RANK_TIERS.find(t => t.clears === 5), 
            clearsToNext: 5 - clearCount,
            isMaxRank: false
        };
    }

    return { 
        current: currentTier, 
        next: nextTier, 
        clearsToNext,
        isMaxRank 
    };
};

// ----------------------------------------------
// 🎯 SuccessModal コンポーネント (変更なし)
// ----------------------------------------------
const SuccessModal = ({ character, onComplete, clearCount, rankInfo, onAddToCollection, onDiscardAndReturn }) => {
    
    // スタイル定義 (省略)
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    };

    const modalContentStyle = {
        backgroundColor: '#fffbe0', 
        padding: '40px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '550px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        border: '5px solid #FFC107', 
        transform: 'scale(1.05)',
        animation: 'bounce-in 0.5s ease-out',
        position: 'relative',
        
    };
    
    const titleStyle = {
        color: '#E0002A', 
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
        backgroundColor: '#4CAF50', 
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
    
    const RepeatedClearContent = () => {
        const { current, clearsToNext, isMaxRank } = rankInfo;
        const starEmoji = '★'.repeat(current.stars);
        
        return (
            <>
                <h1 style={{ ...titleStyle, color: '#333', fontSize: '2rem' }}>
                    クリアおめでとう！（{clearCount} 回目）
                </h1>

                <p style={{ fontSize: '1.8rem', color: '#E0002A', fontWeight: 'bold', margin: '15px 0' }}>
                     ⚽️ {character.name} ⚽️
                </p>

                <div style={{ margin: '20px 0', padding: '10px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                        現在のランク：{current.name}
                    </p>
                    <span style={{ 
                        fontSize: '2.5rem', 
                        color: current.color, 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)' 
                    }}>
                        {starEmoji}
                    </span>
                    {current.stars < 4 && current.clears > 0 && <p style={{ fontSize: '0.9rem', color: '#888' }}>（{current.clears}回から{current.stars}つ星）</p>}
                </div>

                {isMaxRank ? (
                    <p style={{ fontSize: '1.1rem', color: current.color, fontWeight: 'bold' }}>
                        🎉 MAXランク達成です！素晴らしい！ 🎉
                    </p>
                ) : (
                    <p style={{ fontSize: '1.3rem', color: '#E0002A', fontWeight: 'bold' }}>
                        {current.clears === 0 
                            ? `最初のランクまであと   ${clearsToNext} 回 のクリアです！`
                            : `次のランクまであと   ${clearsToNext} 回  のクリアです！`}
                    </p>
                )}

                <div style={buttonContainerStyle}>
                    <button 
                        onClick={onComplete} 
                        style={{ ...confirmButtonStyle, backgroundColor: '#4a90e2', boxShadow: '4px 4px 0 #3b73b2' }}
                    >
                        コレクション画面に戻る
                    </button>
                </div>
            </>
        );
    };


    const NewCardContent = () => (
        <>
            <h1 style={titleStyle}>
                おめでとう！
            </h1>
            
            <p style={{ fontSize: '1.5rem', color: '#333', marginBottom: '30px', fontWeight: 'bold' }}>
                「{character.name}」のカードをゲットしました！
            </p>

            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '15px' }}>
                コレクションに追加しますか？
            </p>

            <div style={buttonContainerStyle}>
                <button 
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
        </>
    );
    
    const isNewCard = clearCount === 1;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                {isNewCard ? <NewCardContent /> : <RepeatedClearContent />}
            </div>
        </div>
    );
};

// ----------------------------------------------
// App コンポーネント本体
// ----------------------------------------------
const coloringAppStyle = {
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


// localStorageからのデータロードとDateオブジェクト変換を行うヘルパー関数
const loadCollectionFromStorage = () => {
    const stored = localStorage.getItem('shinchan_collection');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            Object.keys(parsed).forEach(key => {
                // unlockedAtが文字列であればDateオブジェクトに変換
                if (parsed[key].unlockedAt && typeof parsed[key].unlockedAt === 'string') {
                    // Date.parseが失敗する可能性があるため、try-catchやチェックを強化すべきだが、今回はシンプルに実装
                    const date = new Date(parsed[key].unlockedAt);
                    // 🚨 Dateオブジェクトとして有効かチェック
                    parsed[key].unlockedAt = isNaN(date.getTime()) ? null : date;
                }
                if (typeof parsed[key].clears !== 'number') {
                     parsed[key].clears = 0;
                }
            });
            return parsed;
        } catch (e) {
            // エラーログを出力して、データ破損時は空のオブジェクトを返す
            console.error("Failed to parse collection data from localStorage:", e);
            return {};
        }
    }
    return {};
};


function App() {
  
  // コレクションデータ管理をAppコンポーネント内に移動
  const [collectionMap, setCollectionMap] = useState(() => loadCollectionFromStorage());
  
  // collectionMapの変更を監視し、localStorageに保存するエフェクト
  useEffect(() => {
    // DateオブジェクトはJSON.stringifyでISO 8601形式の文字列に変換される
    localStorage.setItem('shinchan_collection', JSON.stringify(collectionMap));
  }, [collectionMap]);
  
  
  // --- コレクション操作のヘルパー関数 ---
  
  const isCardUnlocked = useCallback((id) => {
      return collectionMap[id] && collectionMap[id].clears > 0;
  }, [collectionMap]);
  
  const getClearCount = useCallback((id) => {
      return collectionMap[id]?.clears || 0;
  }, [collectionMap]);

  // コレクションの更新ロジック (クリア回数の増加と初回日時の記録)
  const unlockCard = useCallback((id) => {
      setCollectionMap(prev => {
          const isFirstUnlock = !prev[id] || (prev[id]?.clears || 0) === 0;
          const newCount = (prev[id]?.clears || 0) + 1;
          
          return {
              ...prev,
              [id]: {
                  clears: newCount,
                  // 初めてゲットした場合のみ現在の日時を記録。それ以外は既存の日時を維持。
                  unlockedAt: isFirstUnlock ? new Date() : (prev[id]?.unlockedAt || null),
              }
          };
      });
  }, [setCollectionMap]);
  
  
  // --- UI State ---
  const [currentChallengeId, setCurrentChallengeId] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [justUnlockedId, setJustUnlockedId] = useState(null); 
  const [currentClearCount, setCurrentClearCount] = useState(0); 

  const challengeCharacter = characters.find(c => c.id === currentChallengeId);
  const unlockedCharacter = characters.find(c => c.id === justUnlockedId);
  
  const returnToCollection = () => {
    setCurrentChallengeId(null);
    setShowSuccessModal(false); 
    setJustUnlockedId(null);
    setCurrentClearCount(0); 
  };
  
  // チャレンジ完了時にモーダルを表示する処理 (保存処理なし)
  const handleChallengeCompleteAndShowModal = (completedId) => {
      const currentCount = getClearCount(completedId);
      const newCount = currentCount + 1; // 今回のクリアで増えるであろう回数
      
      setCurrentClearCount(newCount); 
      setJustUnlockedId(completedId);
      setShowSuccessModal(true);
      
      setCurrentChallengeId(null); 
  };
  
  const rankInfo = getRankInfo(currentClearCount);


  // 🏅 モーダルからの「コレクションに追加」処理 (新規獲得時)
  const handleAddToCollection = () => {
    if (justUnlockedId) {
        unlockCard(justUnlockedId); // 初ゲットとして記録
    }
    returnToCollection(); 
  };
  
  // 🏅 モーダルからの「今回は見送る」処理 (新規獲得時)
  const handleDiscardAndReturn = () => {
    returnToCollection(); // 保存せず戻る
  };

  
  // 🏅 周回クリア時（2回目以降）に「戻る」ボタンを押したときの処理
  const handleRepeatClearAndReturn = () => {
    if (justUnlockedId) {
        unlockCard(justUnlockedId); // クリア回数を増やす
    }
    returnToCollection();
  };


  
  return (
    <div style={currentChallengeId ? coloringAppStyle : collectionAppStyle}>
      
      {/* 1. 塗り絵画面の表示 */}
      {currentChallengeId && challengeCharacter && (
        <ColoringChallenge 
            characterId={currentChallengeId}
            onComplete={() => handleChallengeCompleteAndShowModal(currentChallengeId)} 
            onCancel={returnToCollection} 
        />
      )}
      
      {/* 2. コレクション画面の表示 */}
      {!currentChallengeId && (
        <CollectionScreen 
          onStartChallenge={setCurrentChallengeId} 
          isCardUnlocked={isCardUnlocked} 
          unlockedCards={collectionMap}
        />
      )}
      
      {/* 3. 成功モーダルの表示 */}
      {showSuccessModal && unlockedCharacter && (
        <SuccessModal 
          character={unlockedCharacter}
          clearCount={currentClearCount} 
          rankInfo={rankInfo} 
          
          onAddToCollection={handleAddToCollection} 
          onDiscardAndReturn={handleDiscardAndReturn} 
          
          onComplete={handleRepeatClearAndReturn} 
        />
      )}
    </div>
  );
}

export default App;