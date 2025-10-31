// src/App.jsx

import React, { useState } from 'react';
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge'; 

import characters from './data/characters';
import { useCollectionStore } from './hooks/useCollectionStore';

const APP_BACKGROUND_IMAGE_URL = 'assets/shinchan_bg.png';

// ----------------------------------------------
// 🏅 ランク定義 (クリア回数と星、色)
// ----------------------------------------------
const RANK_TIERS = [
    { clears: 30, stars: 4, color: '#FF1493', name: 'レジェンド' }, // ピンク (100回)
    { clears: 25, stars: 4, color: '#00B894', name: 'マスター' }, // 緑 (50回)
    { clears: 20, stars: 4, color: '#FFC107', name: 'ベテラン' }, // 金色 (30回)
    { clears: 15, stars: 3, color: '#FFC107', name: '上級者' },
    { clears: 10, stars: 2, color: '#FFC107', name: '中級者' },
    { clears: 5, stars: 1, color: '#FFC107', name: '初級者' },
];

// クリア回数に基づいて現在のランクと次のランクへの情報を計算する関数
const getRankInfo = (clearCount) => {
    // 降順にソートして、現在のランクを見つける
    const sortedTiers = [...RANK_TIERS].sort((a, b) => b.clears - a.clears);
    
    let currentTier = sortedTiers.find(tier => clearCount >= tier.clears) || { clears: 0, stars: 0, color: '#ccc', name: '未到達' };
    
    // 次のランクを見つける
    const nextTierIndex = sortedTiers.findIndex(tier => tier.clears === currentTier.clears) - 1;
    const nextTier = sortedTiers[nextTierIndex] || null;

    const isMaxRank = !nextTier && currentTier.clears > 0;
    const clearsToNext = nextTier ? nextTier.clears - clearCount : 0;
    
    // 最初のランク（5回）へのカウントダウン
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
// 🎯 SuccessModal コンポーネントの修正版
// ----------------------------------------------
const SuccessModal = ({ character, onComplete, clearCount, rankInfo, onAddToCollection, onDiscardAndReturn }) => {
    
    // スタイル定義 (省略)
    // 🚨 注意: Styleは元のコードに合わせています。
    
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
    
    // ------------------------------------------
    // 周回クリア時の表示 (RankInfoを受け取る)
    // ------------------------------------------
    const RepeatedClearContent = () => {
        const { current, clearsToNext, isMaxRank } = rankInfo;
        const starEmoji = '★'.repeat(current.stars);
        
        // 周回クリア時は onComplete（returnToCollection）のみ
        return (
            <>
                <h1 style={{ ...titleStyle, color: '#333', fontSize: '2rem' }}>
                    クリアおめでとう！（{clearCount} 回目）
                </h1>

                <p style={{ fontSize: '1.8rem', color: '#E0002A', fontWeight: 'bold', margin: '15px 0' }}>
                     ⚽️ {character.name} ⚽️
                </p>

                {/* ⭐️ランク表示部分 */}
                <div style={{ margin: '20px 0', padding: '10px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                        現在のランク：{current.name}
                    </p>
                    <span style={{ 
                        fontSize: '2.5rem', 
                        // ランク色を適用
                        color: current.color, 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)' 
                    }}>
                        {starEmoji}
                    </span>
                    {current.stars < 4 && current.clears > 0 && <p style={{ fontSize: '0.9rem', color: '#888' }}>（{current.clears}回から{current.stars}つ星）</p>}
                </div>

                {/* 次のランクへのモチベーション */}
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
                    {/* 周回クリア時は、常に「コレクション画面に戻る」ボタンのみ */}
                    <button 
                        onClick={onComplete} // returnToCollection を実行
                        style={{ ...confirmButtonStyle, backgroundColor: '#4a90e2', boxShadow: '4px 4px 0 #3b73b2' }}
                    >
                        コレクション画面に戻る
                    </button>
                </div>
            </>
        );
    };


    // ------------------------------------------
    // 新規獲得時の表示
    // ------------------------------------------
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
                    onClick={onAddToCollection} // returnToCollection を実行
                    style={confirmButtonStyle}
                >
                    コレクションに追加する
                </button>
                <button 
                    onClick={onDiscardAndReturn} // returnToCollection を実行
                    style={discardButtonStyle}
                >
                    今回は見送る
                </button>
            </div>
        </>
    );
    // ------------------------------------------

    // 🎯 新規獲得は、現在のクリア回数が「1回」の場合（今回のクリアで初めてゲット）
    const isNewCard = clearCount === 1;

    return (
        <div style={modalOverlayStyle}>
            {/* モーダルの内容を isNewCard で切り替える */}
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
  // 🏅 修正: getClearCount を取得
  const { unlockCard, isCardUnlocked, collectionMap, getClearCount } = useCollectionStore(); 
    
  const [currentChallengeId, setCurrentChallengeId] = useState(null); 
  
  // 🏅 State の定義
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [justUnlockedId, setJustUnlockedId] = useState(null); // 一時的にIDを保持
  const [currentClearCount, setCurrentClearCount] = useState(0); // 🚨 今回のクリア後の回数を保持

  const challengeCharacter = characters.find(c => c.id === currentChallengeId);
  const unlockedCharacter = characters.find(c => c.id === justUnlockedId);
  
  const returnToCollection = () => {
    setCurrentChallengeId(null);
    setShowSuccessModal(false); // モーダルも閉じる
    setJustUnlockedId(null);
    setCurrentClearCount(0); // 回数をリセット
  };

  
  // 🏅 チャレンジ完了時に回数をインクリメントし、モーダルを表示する新しいロジック
  const handleChallengeCompleteAndShowModal = (completedId) => {
      // 1. まず回数をインクリメントし、即座にLocal Storageに保存
      // 🚨 useCollectionStore の unlockCard は、新しいクリア回数を返します
      const newCount = unlockCard(completedId); 
      
      // 2. モーダルを表示するための状態を更新
      setCurrentClearCount(newCount); // 🚨 新しい回数をStateに保存
      setJustUnlockedId(completedId);
      setShowSuccessModal(true);
      
      setCurrentChallengeId(null); // チャレンジ画面を閉じる
  };
  
  // 🎯 SuccessModal に渡すデータの準備
  const rankInfo = getRankInfo(currentClearCount);


  // 🏅 モーダルからの「コレクションに追加」処理 (今回は単に戻るだけ)
  const handleAddToCollection = () => {
    // NewCardの判定はモーダル内部で行うが、unlockCardは既に handleChallengeCompleteAndShowModal で完了している
    returnToCollection(); 
  };
  
  // 🏅 モーダルからの「今回は見送る」処理 (今回は単に戻るだけ)
  const handleDiscardAndReturn = () => {
    // NewCardの判定はモーダル内部で行うが、unlockCardは既に handleChallengeCompleteAndShowModal で完了している
    returnToCollection();
  };

  
  return (
    <div style={currentChallengeId ? coloringAppStyle : collectionAppStyle}>
      
      {/* 1. 塗り絵画面の表示 */}
      {currentChallengeId && challengeCharacter && (
        <ColoringChallenge 
            characterId={currentChallengeId}
            // 🚨 修正: onComplete で新しい処理を呼ぶ
            onComplete={() => handleChallengeCompleteAndShowModal(currentChallengeId)} 
            onCancel={returnToCollection} 
        />
      )}
      
      {/* 2. コレクション画面の表示 */}
      {!currentChallengeId && (
        <CollectionScreen 
          onStartChallenge={setCurrentChallengeId} 
          isCardUnlocked={isCardUnlocked} 
          // 修正: collectionMap を渡す (回数マップ)
          unlockedCards={collectionMap}
        />
      )}
      
      {/* 3. 成功モーダルの表示 */}
      {showSuccessModal && unlockedCharacter && (
        <SuccessModal 
          character={unlockedCharacter}
          clearCount={currentClearCount} // 🚨 今回のクリア後の回数を渡す
          rankInfo={rankInfo} // 🚨 ランク情報を渡す
          
          // 新規獲得時の「追加」ボタンを押された場合
          onAddToCollection={handleAddToCollection} 
          onDiscardAndReturn={handleDiscardAndReturn} 
          onComplete={returnToCollection} // 周回クリア時の「戻る」ボタン用
        />
      )}
    </div>
  );
}

// 🚨 この行が main.jsx からの import で必要です
export default App;