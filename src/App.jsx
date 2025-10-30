// src/App.jsx の全コード

import { useState } from 'react';
import { useCollectionStore } from './hooks/useCollectionStore'; 
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge';

// キャラクターデータと初期 ID のインポート
import characters from './data/characters';


// --- SuccessModal コンポーネント定義（App.jsx内で完結） ---
const SuccessModal = ({ character, onAddToCollection, onCancel }) => {
    
    // スタイル定義をコンポーネント内に配置し、参照エラーを完全に回避
    const modalOverlayStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    };
    const modalContentStyle = {
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', 
        width: '90%', maxWidth: '400px', textAlign: 'center', 
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    };
    const modalButtonStyle = {
        padding: '10px 20px', border: 'none', borderRadius: '5px', 
        color: 'white', fontSize: '1rem', cursor: 'pointer', margin: '0 10px',
    };
    const modalButtonContainerStyle = { display: 'flex', justifyContent: 'center', marginTop: '20px' };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>🎉 カードをゲットしました！ 🎉</h2>
                <p style={{ marginBottom: '20px' }}>
                    **{character.name}** の塗り絵をコンプリート！
                </p>
                
                <img 
                    src={character.unlockedImageUrl} 
                    alt={character.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />

                <div style={modalButtonContainerStyle}>
                    <button 
                        onClick={onAddToCollection}
                        style={{ ...modalButtonStyle, backgroundColor: '#4CAF50' }}
                    >
                        コレクションに追加する
                    </button>
                    <button 
                        onClick={onCancel}
                        style={{ ...modalButtonStyle, backgroundColor: '#888' }}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- SuccessModal コンポーネント定義 終了 ---


const App = () => {
    // 画面切り替えのための状態
    const [currentChallengeId, setCurrentChallengeId] = useState(null);

    // 勝利モーダルの表示と、どのカードがゲットされたかの状態
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [lastUnlockedCardId, setLastUnlockedCardId] = useState(null);

    // コレクションストアからカード解除関数を取得 (Appコンポーネントが直接コレクションを更新するため)
    const unlockCard = useCollectionStore(state => state.unlockCard);

    // チャレンジ開始
    const handleStartChallenge = (characterId) => {
        setCurrentChallengeId(characterId);
    };

    // チャレンジ完了（勝利）
    const handleChallengeWin = (characterId) => {
        setLastUnlockedCardId(characterId);
        setShowSuccessModal(true);
        setCurrentChallengeId(null); 
    };

    // コレクションに追加する処理 (勝利モーダルから呼ばれる)
    const handleAddToCollection = (characterId) => {
        // コレクションの状態を更新（CollectionScreenがこの変更を検知する）
        unlockCard(characterId); 
        
        setShowSuccessModal(false);
        setLastUnlockedCardId(null);
    };

    // コレクション画面に戻る（閉じるボタン用）
    const handleReturnToCollection = () => {
        setShowSuccessModal(false);
        setLastUnlockedCardId(null);
    };

    return (
        <>
            {/* 塗り絵チャレンジ画面の表示 */}
            {currentChallengeId ? (
                <ColoringChallenge 
                    characterId={currentChallengeId}
                    onWin={handleChallengeWin}
                    onCancel={() => setCurrentChallengeId(null)}
                />
            ) : (
                // コレクション画面の表示
                <CollectionScreen 
                    onStartChallenge={handleStartChallenge}
                />
            )}

            {/* 勝利モーダルの表示 */}
            {showSuccessModal && lastUnlockedCardId && (
                <SuccessModal
                    character={characters.find(c => c.id === lastUnlockedCardId)}
                    onAddToCollection={() => handleAddToCollection(lastUnlockedCardId)}
                    onCancel={handleReturnToCollection} 
                />
            )}
        </>
    );
};

export default App;