// src/App.jsx の全コード

import { useState } from 'react';
import { useCollectionStore } from './hooks/useCollectionStore'; 
import CollectionScreen from './components/CollectionScreen';
import ColoringChallenge from './components/ColoringChallenge';
import SuccessModal from './components/SuccessModal';

// キャラクターデータと初期 ID のインポート
import characters from './data/characters';
const INITIAL_CHALLENGE_ID = characters[0].id; // 最初のチャレンジはしんちゃん

const App = () => {
    // 画面切り替えのための状態
    const [currentChallengeId, setCurrentChallengeId] = useState(null);

    // 勝利モーダルの表示と、どのカードがゲットされたかの状態
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [lastUnlockedCardId, setLastUnlockedCardId] = useState(null);

    // コレクションストアからカード解除関数を取得
    const unlockCard = useCollectionStore(state => state.unlockCard);

    // チャレンジ開始
    const handleStartChallenge = (characterId) => {
        setCurrentChallengeId(characterId);
    };

    // チャレンジ完了（勝利）
    const handleChallengeWin = (characterId) => {
        // 勝利したカードIDを記録
        setLastUnlockedCardId(characterId);
        // 勝利モーダルを表示
        setShowSuccessModal(true);
        // 塗り絵画面を閉じる
        setCurrentChallengeId(null); 
    };

    // コレクションに追加する処理 (勝利モーダルから呼ばれる)
    const handleAddToCollection = (characterId) => {
        // カードをコレクションに追加
        unlockCard(characterId); 
        
        // モーダルを閉じる
        setShowSuccessModal(false);
        setLastUnlockedCardId(null);
        
        // 🚨 修正点: ここで状態が更新されるが、App.jsx はコレクション画面の再描画を直接制御しない
        //           (CollectionScreen が Zustand の変更を検知する必要がある)
    };

    // コレクション画面に戻る（現在は handleAddToCollection に統合されている想定）
    const handleReturnToCollection = () => {
        setShowSuccessModal(false);
        setLastUnlockedCardId(null);
        // そのままコレクション画面（Appコンポーネントのデフォルト表示）に戻る
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
                    // ✅ 修正点: コレクションに追加するロジックをプロップスとして渡す
                    //           （CollectionScreen内で勝利モーダルを表示・制御するため）
                    onAddToCollection={handleAddToCollection}
                />
            )}

            {/* 勝利モーダルの表示 (App.jsxで引き続き制御) */}
            {showSuccessModal && lastUnlockedCardId && (
                <SuccessModal
                    character={characters.find(c => c.id === lastUnlockedCardId)}
                    onAddToCollection={() => handleAddToCollection(lastUnlockedCardId)}
                    onCancel={handleReturnToCollection} // 閉じるボタンでコレクションに戻る
                />
            )}
        </>
    );
};

export default App;