// src/components/CollectionScreen.jsx の全コード

import React, { useState, useEffect } from 'react';
import characters from '../data/characters'; 
import { useCollectionStore } from '../hooks/useCollectionStore'; 

// ----------------------------------------------
// 画面幅を監視するカスタムフック (変更なし)
// ----------------------------------------------
const useIsMobile = (maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxWidth);
        };
        // リサイズイベントリスナーを追加
        window.addEventListener('resize', handleResize);
        // コンポーネントがアンマウントされたらリスナーを削除
        return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]);

    return isMobile;
};

// 画像パスの定義 (変更なし)
const UNLOCKED_CARD_DEFAULT_IMAGE = 'assets/cards/locked.png'; 
const LOCKED_CARD_IMAGE = 'assets/cards/locked.png'; 
const SHINCHAN_BACKGROUND_IMAGE = 'assets/cards/sinchan_bg.png';// 背景画像パス

// レアリティの表示マップとスタイル定義 (変更なし)
const RARITY_DISPLAY_MAP = {
    'family': 'かぞく',
    'kindergarten': 'ようちえん',
    'neighborhood': 'ごきんじょ',
    'hero': 'ヒーロー',
};

const RARITY_STYLES = {
    family: {
        borderColor: '#2196F3', // 青
        boxShadow: '0 0 8px rgba(33, 150, 243, 0.5)', 
    },
    kindergarten: {
        borderColor: '#15c224ff', // 緑系
        boxShadow: '0 0 18px rgba(98, 251, 101, 1)',
    },
    neighborhood: {
        borderColor: '#ff6fd4ff', // ピンク系
        boxShadow: '0 0 18px rgba(254, 101, 236, 1)', 
    },
    hero: {
        borderColor: '#FFC107', // 金/黄色
        boxShadow: '0 0 18px rgba(255, 193, 7, 1)', 
    },
};

// --- ChallengeModal コンポーネント (ポップアップ) --- (変更なし)
const ChallengeModal = ({ character, onConfirm, onCancel }) => {
    // スタイルが外部にあるため、ここでは省略
    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={{ marginBottom: '20px' }}>
                    このカードのゲットチャレンジに挑戦しますか？
                </h3>
                <p style={{ marginBottom: '30px', fontWeight: 'bold' }}>
                    キャラクター: {character.name}
                </p>
                <div style={modalButtonContainerStyle}>
                    <button 
                        onClick={() => onConfirm(character.id)}
                        style={{ ...modalButtonStyle, backgroundColor: '#d9534f', marginRight: '10px' }}
                    >
                        はい（挑戦する）
                    </button>
                    <button 
                        onClick={onCancel}
                        style={{ ...modalButtonStyle, backgroundColor: '#428bca' }}
                    >
                        いいえ（戻る）
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- カード詳細モーダルコンポーネント --- (変更なし)
const CardDetailModal = ({ character, onClose, onReChallenge }) => {
    // スタイルが外部にあるため、ここでは省略
    const displayRarity = RARITY_DISPLAY_MAP[character.rarity] || character.rarity;
    const rarityStyle = RARITY_STYLES[character.rarity] || {};
    const badgeBgColor = rarityStyle.borderColor || '#ccc';

    return (
        <div style={modalOverlayStyle}>
            <div style={{ ...modalContentStyle, ...cardDetailModalContentStyle }}>
                <div style={cardDetailHeaderStyle}>
                    <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
                        {character.name}
                    </h2>
                    <span style={{ 
                        ...cardDetailRarityBadgeStyle, 
                        backgroundColor: badgeBgColor,
                        color: badgeBgColor ? '#333' : 'white', 
                    }}>
                        {displayRarity}
                    </span>
                </div>

                <img 
                    src={character.unlockedImageUrl} 
                    alt={character.name} 
                    style={cardDetailImageStyle} 
                />

                <p style={cardDetailDescriptionStyle}>
                    {character.description || "このキャラクターについての説明はありません。"}
                </p>

                <div style={cardDetailButtonContainerStyle}>
                    <button 
                        onClick={onReChallenge}
                        style={{ ...modalButtonStyle, backgroundColor: '#4CAF50', marginRight: '30px', fontWeight: 'bold'}}
                    >
                        もう一度ゲームに挑戦する
                    </button>
                    <button 
                        onClick={onClose}
                        style={{ ...modalButtonStyle, backgroundColor: '#888', marginRight: '30px', fontWeight: 'bold' }}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- CollectionScreen コンポーネント (メイン画面) ---
// ✅ App.jsxから onAddToCollection をプロップスとして受け取る
const CollectionScreen = ({ onStartChallenge, onAddToCollection }) => {
    
    // ✅ 修正点: コレクションIDリストを取得し、その変更がトリガーとなるように明示
    //           これにより、onAddToCollectionが呼ばれた瞬間にここが再レンダリングされます。
    const collectedIds = useCollectionStore(state => state.collectedCharacterIds);
    const isCardUnlocked = (characterId) => collectedIds.includes(characterId);
    
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [detailedCharacter, setDetailedCharacter] = useState(null);
    
    // 💡 画面サイズを監視する
    const isMobile = useIsMobile(); 

    const handleConfirmChallenge = (characterId) => {
        setSelectedCharacter(null);
        onStartChallenge(characterId);
    };

    const handleCardClick = (character) => {
        if (isCardUnlocked(character.id)) {
            setDetailedCharacter(character);
        } else {
            setSelectedCharacter(character);
        }
    };
    
    const handleReChallenge = (characterId) => {
        setDetailedCharacter(null); 
        onStartChallenge(characterId); 
    };
    
    // ----------------------------------------------
    // 🎯 重要な修正: 画面幅に基づくスタイル定義 (インラインスタイル)
    // ----------------------------------------------
    
    // カード一覧グリッドの動的なスタイル
    const cardGridDynamicStyle = {
        display: 'grid',
        // 🚨 修正箇所: スマホでは4列 (必要に応じて 'repeat(5, 1fr)' に変更も可能)
        gridTemplateColumns: isMobile 
            ? 'repeat(4, 1fr)' 
            : 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: isMobile ? '8px' : '20px', // スマホでは隙間を小さくしてカードを詰める
        maxWidth: isMobile ? '98%' : '900px', // スマホでは最大幅を増やして左右の余白を減らす
        margin: '0 auto',
        padding: '10px', // スマホではパディングを減らす
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    };

    // 画面全体のコンテナの動的なスタイル
    const screenContainerDynamicStyle = {
        textAlign: 'center',
        padding: isMobile ? '30px 5px' : '100px 300px', // スマホではパディングをさらに減らす
        minHeight: '100vh',
        backgroundImage: `url(${SHINCHAN_BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };
    
    // 💡 タイトル文字の動的なスタイル
    const titleDynamicStyle = {
        textShadow: `
            4px 4px 0 #000 
        `,
        color: 'white', 
        // スマホでは '1.5rem'、PCでは '4rem' に
        fontSize: isMobile ? '1.5rem' : '4rem', 
        fontWeight: '900', 
        letterSpacing: '5px', 
        marginBottom: '30px', 
        transform: 'skewX(-5deg)',
        fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
    };
    
    
    return (
        <div style={screenContainerDynamicStyle}>
            <div style={titleBoxStyle}>
                {/* 🎯 修正: titleDynamicStyle を適用 */}
                <h1 style={titleDynamicStyle}>
                <span style={{ color: '#E0002A' }}>ク</span>
                <span style={{ color: '#43B133' }}>レ</span>
                <span style={{ color: '#23B2E8' }}>ヨ</span>
                <span style={{ color: '#FFE807' }}>ン</span>
                <span style={{ color: '#E0002A' }}>し</span>
                <span style={{ color: '#43B133' }}>ん</span>
                <span style={{ color: '#23B2E8' }}>ち</span>
                <span style={{ color: '#FFE807' }}>ゃ</span>
                <span style={{ color: '#E0002A' }}>ん</span>
                
                <br /> 
                
                <span style={{ color: '#a1a1a1' }}>コ</span>
                <span style={{ color: '#a1a1a1' }}>レ</span>
                <span style={{ color: '#a1a1a1' }}>ク</span>
                <span style={{ color: '#a1a1a1' }}>シ</span>
                <span style={{ color: '#a1a1a1' }}>ョ</span>
                <span style={{ color: '#a1a1a1' }}>ン</span>
                <span style={{ color: '#a1a1a1' }}>ル</span>
                <span style={{ color: '#a1a1a1' }}>ー</span>
                <span style={{ color: '#a1a1a1' }}>ム</span>
            </h1>
            <p style={subtitleStyle}>
                ゲットチャレンジに挑戦して、キャラクターカードを集めよう！
            </p>
            </div>
            

            {/* カード一覧グリッド */}
            <div style={cardGridDynamicStyle}>
                {characters.map(character => {
                    const isUnlocked = isCardUnlocked(character.id);
                    const imageUrl = isUnlocked ? character.unlockedImageUrl : character.lockedImageUrl;
                    const displayName = character.name; 
                    
                    const rarityStyle = RARITY_STYLES[character.rarity] || {};
                    const displayRarity = RARITY_DISPLAY_MAP[character.rarity] || character.rarity;

                    const cardStyle = {
                        ...baseCardStyle,
                        // 🚨 修正: スマホのminHeightを小さくしてカードサイズを調整
                        minHeight: isMobile ? '180px' : '220px', 
                        cursor: 'pointer', 
                        ...(isUnlocked ? rarityStyle : {}), 
                        borderColor: isUnlocked 
                            ? (rarityStyle.borderColor || '#4CAF50') 
                            : '#ccc', 
                    };
                    
                    const rarityBadgeStyle = {
                        position: 'absolute',
                        bottom: '5px',
                        left: '5px',
                        backgroundColor: rarityStyle.borderColor || '#ccc',
                        color: rarityStyle.borderColor ? '#333' : 'white', 
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: isMobile ? '0.6rem' : '0.7rem', // スマホでは文字も小さく
                        fontWeight: 'bold',
                    };
                    
                    const nameFontSize = isMobile ? '0.9rem' : '1.1rem'; // スマホで名前も小さく

                    return (
                        <div 
                            key={character.id} 
                            style={cardStyle} 
                            onClick={() => handleCardClick(character)}
                        >
                            <img 
                                src={imageUrl} 
                                alt={isUnlocked ? character.name : '未解禁'} 
                                style={imageStyle} 
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = isUnlocked ? UNLOCKED_CARD_DEFAULT_IMAGE : LOCKED_CARD_IMAGE;
                                }}
                            />
                            
                            <p style={{...nameStyle, fontSize: nameFontSize}}>
                                {displayName}
                            </p>
                            
                            {isUnlocked && <span style={unlockedBadgeStyle}>GET!</span>}

                            {isUnlocked && (
                                <span style={rarityBadgeStyle}>
                                    {displayRarity}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 未解禁カードの挑戦モーダル */}
            {selectedCharacter && (
                <ChallengeModal 
                    character={selectedCharacter}
                    onConfirm={handleConfirmChallenge}
                    onCancel={() => setSelectedCharacter(null)}
                />
            )}

            {/* ゲット済みカードの詳細モーダル */}
            {detailedCharacter && (
                <CardDetailModal
                    character={detailedCharacter}
                    onClose={() => setDetailedCharacter(null)}
                    onReChallenge={() => handleReChallenge(detailedCharacter.id)}
                />
            )}
        </div>
    );
};



export default CollectionScreen;


// --- スタイル定義 (isMobileに依存しないもののみ残す) ---

const titleBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: '1px 40px',
    borderRadius: '15px', 
    border: '4px solid #000', 
    margin: '30px auto', 
    maxWidth: 'fit-content',
};


const subtitleStyle = {
    fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
    fontWeight: 'bold', 
    fontSize: '1.2rem', 
    color: '#333', 
    marginBottom: '20px', 
    textShadow: '1px 1px 0 #fff',
};


const baseCardStyle = {
    padding: '10px',
    border: '4px dashed #333', 
    borderRadius: '15px',
    boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.1s, box-shadow 0.1s',
    backgroundColor: '#fffbe0',
    position: 'relative',
    
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between',
    // minHeight は動的スタイルに移動
    
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '7px 7px 0px rgba(0, 0, 0, 0.2)',
    }
};

const imageStyle = {
    width: '100%',
    backgroundColor: 'white', 
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '10px',
    border: '2px solid #333',
    flexGrow: 1,
    objectFit: 'contain', 
};

const nameStyle = {
    // fontSize は動的スタイルに移動
    fontWeight: 'bold',
    color: '#333',
    marginTop: 'auto', 
};

const unlockedBadgeStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
};

// モーダル関連のスタイル (変更なし)
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
};

const modalButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const modalButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

const cardDetailModalContentStyle = {
    maxWidth: '500px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const cardDetailHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '15px',
    gap: '10px', 
};

const cardDetailRarityBadgeStyle = {
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333', 
};

const cardDetailImageStyle = {
    width: '150px',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
    border: '2px solid #eee',
};

const cardDetailDescriptionStyle = {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '10px',
    textAlign: 'left', 
    width: '100%',
    maxHeight: '150px', 
    overflowY: 'auto', 
    padding: '0 10px',
};

const cardDetailButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%',
};