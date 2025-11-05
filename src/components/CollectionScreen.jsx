// src/components/CollectionScreen.jsx 

import React, { useState, useEffect, useMemo } from 'react'; 
import characters from '../data/characters'; 
// useCollectionStore の import は不要

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

const getCurrentRank = (clearCount) => {
    if (clearCount < 3) { 
        return { stars: 0, color: '#ccc', name: '未到達' };
    }
    const sortedTiers = [...RANK_TIERS].sort((a, b) => b.clears - a.clears);
    
    return sortedTiers.find(tier => clearCount >= tier.clears) || { stars: 0, color: '#ccc', name: '未到達' };
};


// ----------------------------------------------
// 画面幅を監視するカスタムフック (変更なし)
// ----------------------------------------------
const useIsMobile = (maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]);

    return isMobile;
};

// 画像パスの定義 (変更なし)
const UNLOCKED_CARD_DEFAULT_IMAGE = 'assets/cards/locked.png'; 
const LOCKED_CARD_IMAGE = 'assets/cards/locked.png'; 
const SHINCHAN_BACKGROUND_IMAGE = 'assets/cards/sinchan_bg.png';
const SHINCHAN_BACKGROUND_IMAGE_MOBILE_URL = 'assets/cards/sinchan_bg_mobile.png';

// レアリティの表示マップとソート順 (変更なし)
const RARITY_DISPLAY_MAP = {
    'family': 'かぞく',
    'kindergarten': 'ようちえん',
    'neighborhood': 'ごきんじょ',
    'hero': 'ヒーロー',
};
const RARITY_ORDER = {
    'hero': 4,
    'kindergarten': 2,
    'neighborhood': 3,
    'family': 1,
};

const RARITY_STYLES = {
    family: {
        borderColor: '#2196F3', 
        boxShadow: '0 0 8px rgba(33, 150, 243, 0.5)', 
    },
    kindergarten: {
        borderColor: '#15c224ff', 
        boxShadow: '0 0 18px rgba(98, 251, 101, 1)',
    },
    neighborhood: {
        borderColor: '#ff6fd4ff', 
        boxShadow: '0 0 18px rgba(254, 101, 236, 1)', 
    },
    hero: {
        borderColor: '#FFC107', 
        boxShadow: '0 0 18px rgba(255, 193, 7, 1)', 
    },
};

// --- Modal コンポーネントのスタイルと定義 ---

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


const ChallengeModal = ({ character, onConfirm, onCancel }) => {
    // 🌟 修正1: characterが存在しない場合のフォールバックを追加（name表示バグ対策）
    const characterName = character ? character.name : '不明なキャラクター';
    
    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                
                {/* 🌟 修正2: h3タグの文字色を強制的に黒（#333）に指定し、タイトルが表示されないバグを解消 */}
                <h3 style={{ marginBottom: '20px', color: '#333' }}>
                    このカードのゲットチャレンジに挑戦しますか？
                </h3>
                
                {/* 🌟 修正3: character.name の代わりに、安全な characterName 変数を使用 */}
                <p style={{ marginBottom: '30px', fontWeight: 'bold', color: '#333'  }}>
                    キャラクター： {characterName}
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

const CardDetailModal = ({ character, onClose, onReChallenge }) => {
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
const CollectionScreen = ({ onStartChallenge, isCardUnlocked, unlockedCards }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [detailedCharacter, setDetailedCharacter] = useState(null); 
    
    // ゲット順をデフォルトに
    const [sortBy, setSortBy] = useState('unlockedAt'); 
    const [sortDirection, setSortDirection] = useState('desc'); 
    
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
    
    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            // 既に選択されている場合は昇順/降順を反転
            setSortDirection(prevDir => prevDir === 'asc' ? 'desc' : 'asc');
        } else {
            let defaultDir = 'asc'; 
            // クリア回数、レアリティ、ゲット順はデフォルトで「降順 (desc)」（多い/新しい順）
            if (newSortBy === 'clears' || newSortBy === 'rarity' || newSortBy === 'unlockedAt') {
                defaultDir = 'desc'; 
            }
            // 名前順はデフォルトで「昇順 (asc)」（あ〜ん順）
            setSortBy(newSortBy);
            setSortDirection(defaultDir); 
        }
    };

    // 🎯 ソートロジック (変更なし)
    const sortedCharacters = useMemo(() => {
        let sorted = [...characters];
        // currentDirection: 昇順('asc')なら 1, 降順('desc')なら -1
        const currentDirection = sortDirection === 'asc' ? 1 : -1;

        sorted.sort((a, b) => {
            const dataA = unlockedCards[a.id] || { clears: 0, unlockedAt: null };
            const dataB = unlockedCards[b.id] || { clears: 0, unlockedAt: null };
            const isUnlockedA = dataA.clears > 0;
            const isUnlockedB = dataB.clears > 0;
            
            // --- Tier 1: 解禁ステータス (未解禁は常に後方) ---
            if (isUnlockedA && !isUnlockedB) return -1;
            if (!isUnlockedA && isUnlockedB) return 1;
            
            let comparison = 0; // 昇順（Aが前なら -1、Bが前なら 1）の結果を保持

            // 未解禁カードのソート: フリガナ順で昇順固定
            if (!isUnlockedA && !isUnlockedB) {
                const furiganaA = a.furigana || "";
                const furiganaB = b.furigana || "";
                return furiganaA.localeCompare(furiganaB, 'ja');
            }

            // --- Tier 2: 解禁済みカードに対する昇順ソートの比較値生成 ---
            
            switch (sortBy) {
                case 'name':
                    // 🚨 修正: フリガナを使用して、純粋な「昇順（あ→ん）」の結果（comparison）を生成
                    const furiganaA = a.furigana || ""; 
                    const furiganaB = b.furigana || "";
                    
                    // localeCompare('ja') は AがBより「前」（昇順）なら -1 を返す
                    comparison = furiganaA.localeCompare(furiganaB, 'ja');
                    break;
                
                case 'clears':
                    // クリア回数（少ない順）の結果を生成
                    comparison = dataA.clears - dataB.clears; 
                    break;
                    
                case 'rarity':
                    // レアリティ（低い順）の結果を生成
                    const rarityA = RARITY_ORDER[a.rarity] || 0;
                    const rarityB = RARITY_ORDER[b.rarity] || 0;
                    comparison = rarityA - rarityB;
                    // デフォルト降順（高い順）のため、結果を反転させる (-1を掛ける)
                    comparison *= -1;
                    break; 

                case 'unlockedAt':
                    // ゲット時刻（古い順）の結果を生成
                    const timeA = dataA.unlockedAt instanceof Date ? dataA.unlockedAt.getTime() : 0;
                    const timeB = dataB.unlockedAt instanceof Date ? dataB.unlockedAt.getTime() : 0;
                    comparison = timeA - timeB;
                    // デフォルト降順（新しい順）のため、結果を反転させる (-1を掛ける)
                    comparison *= -1;
                    break;
                    
                default:
                    // デフォルトソート（フリガナ昇順）
                    const defaultFuriA = a.furigana || a.name;
                    const defaultFuriB = b.furigana || a.name;
                    comparison = defaultFuriA.localeCompare(defaultFuriB, 'ja');
                    break;
            }
            
            // 最終比較結果にソート方向を適用
            return comparison * currentDirection;
        });
        
        return sorted;
    }, [characters, sortBy, sortDirection, unlockedCards, isCardUnlocked]);

    // 日時を 'YYYY/MM/DD HH:MM' 形式にフォーマットするヘルパー関数 (変更なし)
    const formatDateTime = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return ''; // 厳密なDateチェック
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const h = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${y}/${m}/${d} ${h}:${min}`;
    };


    // ----------------------------------------------
    // スタイル定義
    // ----------------------------------------------
    const isSmallScreen = isMobile;

    const screenContainerDynamicStyle = {
        textAlign: 'center',
        padding: isSmallScreen ? '30px 5px' : '100px 300px', 
        minHeight: '100vh',
        backgroundImage: `url(${SHINCHAN_BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };
    
    const cardGridDynamicStyle = {
        display: 'grid',
        // PC: 4列を確保しつつ隙間をいい感じにするため minmax(200px, 1fr) を適用
        gridTemplateColumns: isSmallScreen 
            ? 'repeat(2, 1fr)' // モバイル: 2列固定
            : 'repeat(auto-fit, minmax(200px, 1fr))', 
        
        // gap は元の値（10px/20px）を維持
        gap: isSmallScreen ? '10px' : '20px', 
        
        // 🌟 修正: モバイル時100%幅、PC時900pxを維持（中央寄せはmarginで）
        maxWidth: isSmallScreen ? '100%' : '900px', 
        // 🌟 修正: モバイル時の左右マージンを0にして、外側のpaddingで余白を均等にする
        margin: isSmallScreen ? '20px 0' : '20px auto',
        
        padding: '10px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    };
    
    const titleBoxStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        padding: '1px 40px',
        borderRadius: '15px', 
        border: '4px solid #000', 
        margin: '30px auto', 
        maxWidth: 'fit-content',
    };

    const titleDynamicStyle = {
        textShadow: `
            4px 4px 0 #000 
        `,
        color: 'white', 
        fontSize: isSmallScreen ? '1.5rem' : '4rem', 
        fontWeight: '900', 
        letterSpacing: '5px', 
        transform: 'skewX(-5deg)',
        fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
    };

    const subtitleStyle = {
        fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
        fontWeight: 'bold', 
        fontSize: '1.1rem', 
        color: '#333', 
        marginBottom: '20px', 
        textShadow: '1px 1px 0 #fff',
    };
    
    const starBadgeStyle = {
        position: 'absolute',
        top: '5px', 
        left: '5px', 
        zIndex: 10, 
        fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
        fontWeight: 'bold',
        textShadow: '0 0 4px #000, 0 0 4px #000', 
    };

    const sortControlsContainerStyle = {
        maxWidth: isSmallScreen ? '98%' : '900px',
        margin: '0 auto 10px auto',
        padding: '10px',
        display: 'flex',
        justifyContent: isSmallScreen ? 'space-around' : 'flex-end',
        gap: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flexWrap: 'wrap',
    };
    
    const sortButtonStyle = {
        padding: isSmallScreen ? '5px 10px' : '8px 15px',
        backgroundColor: '#428bca', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: isSmallScreen ? '0.8rem' : '0.9rem',
        transition: 'background-color 0.2s',
    };
    
    const getActiveSortStyle = (key) => ({
        backgroundColor: key === sortBy ? '#d9534f' : sortButtonStyle.backgroundColor,
    });
    
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
        justifyContent: 'flex-start', 
        
        // 🌟 最終修正: box-sizing を border-box に変更して、幅の計算を正しく行う（重なり解消の鍵）
        boxSizing: 'border-box', 

        width: '100%',
        
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '7px 7px 0px rgba(0, 0, 0, 0.2)',
        }
    };

    // 画像コンテナのスタイル (比率固定、変更なし)
    const imageContainerStyle = {
        width: '100%',
        paddingBottom: '133%', // 500:665 の比率を固定
        position: 'relative', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        border: '2px solid #333',
        marginBottom: '10px', 
        overflow: 'hidden', 
    };
    
    // 実際の画像スタイル (コンテナ内で絶対配置、変更なし)
    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain', 
        borderRadius: '10px',
    };
    
    const nameStyle = {
        fontWeight: 'bold',
        color: '#333',
        fontSize: isSmallScreen ? '0.9rem' : '1.1rem', 
    };
    
    const clearCountBadgeStyle = {
        position: 'absolute',
        top: '5px',
        right: '5px',
        backgroundColor: '#FF8C00', // オレンジ系
        color: 'white',
        padding: '3px 8px',
        borderRadius: '10px',
        fontSize: isSmallScreen ? '0.8rem' : '0.9rem',
        fontWeight: 'bold',
        zIndex: 10,
    };
    
    const unlockedDateStyle = {
        fontSize: isSmallScreen ? '0.6rem' : '0.7rem',
        color: '#555',
        marginTop: '5px',
        textAlign: 'center',
    };

    // ----------------------------------------------
    // 最終的なJSXのレンダリング
    // ----------------------------------------------
    
    return (
        <div style={screenContainerDynamicStyle}>
            <div style={titleBoxStyle}>
                <h1 style={titleDynamicStyle}>
                <span style={{ color: '#E0002A' }}>ク</span>
                <span style={{ color: '#43B133' }}>レ</span>
                <span style={{ color: '#23B2E8' }}>ヨ</span>
                <span style={{ color: '#FFE807' }}>ン</span>
                <span style={{ color: '#E0002A' }}>し</span>
                <span style={{ color: '#43B133' }}>ん</span>
                <span style={{ color: '#23B2E8' }}>ち</span>
                <span style={{ color: '#FFE807' }}>ゃん</span>
                
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
                ゲットチャレンジに挑戦して、<br /> キャラクターカードを集めよう！
            </p>
            </div>
            
            {/* ソートUI */}
            <div style={sortControlsContainerStyle}>
                <span style={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.9rem' : '1.1rem', color: '#333', margin: 'auto 10px auto 0' }}>
                    並び替え: 
                </span>
                
                {[
                    { key: 'unlockedAt', label: 'ゲット順' },
                    { key: 'clears', label: 'クリア回数' },
                    { key: 'rarity', label: 'レアリティ' },
                    { key: 'name', label: '名前順' },
                ].map(({ key, label }) => (
                    <button 
                        key={key}
                        onClick={() => handleSortChange(key)}
                        style={{ 
                            ...sortButtonStyle, 
                            ...getActiveSortStyle(key),
                            backgroundColor: key === sortBy ? '#d9534f' : sortButtonStyle.backgroundColor,
                        }}
                    >
                        {label} 
                        {key === sortBy ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                    </button>
                ))}
            </div>

            {/* カード一覧グリッド */}
            <div style={cardGridDynamicStyle}>
                {sortedCharacters.map(character => {
                    const data = unlockedCards[character.id] || { clears: 0, unlockedAt: null }; 
                    const isUnlocked = data.clears > 0;
                    const imageUrl = isUnlocked ? character.unlockedImageUrl : character.lockedImageUrl;
                    const displayName = character.name; 
                    
                    const clearCount = data.clears;
                    const unlockedAt = data.unlockedAt; 
                    const rankInfo = getCurrentRank(clearCount);

                    const rarityStyle = RARITY_STYLES[character.rarity] || {};
                    const displayRarity = RARITY_DISPLAY_MAP[character.rarity] || character.rarity;
                    
                    // 🌟 修正: 画面サイズに応じて、カードの最大幅を動的に設定
                    // モバイル (250px) に戻し、PC (200px) で4列を維持する
                    const dynamicMaxWidth = isSmallScreen ? '250px' : '200px';

                    const cardStyle = {
                        ...baseCardStyle,
                        cursor: 'pointer', 
                        // 🌟 dynamicMaxWidth を cardStyle に適用
                        maxWidth: dynamicMaxWidth, 
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
                        fontSize: isSmallScreen ? '0.6rem' : '0.7rem', 
                        fontWeight: 'bold',
                    };
                    
                    const nameFontSize = isSmallScreen ? '0.9rem' : '1.1rem'; 
                    
                    return (
                        <div 
                            key={character.id} 
                            style={cardStyle} 
                            onClick={() => handleCardClick(character)}
                        >
                            
                            {isUnlocked && rankInfo.stars > 0 && (
                                <span 
                                    style={{ 
                                        ...starBadgeStyle, 
                                        color: rankInfo.color, 
                                    }} 
                                    title={`${clearCount}回クリア！${rankInfo.name}ランクです`}
                                >
                                    {'★'.repeat(rankInfo.stars)}
                                </span>
                            )}
                            
                            {isUnlocked && (
                                <span style={clearCountBadgeStyle}>
                                    GET! {clearCount}回
                                </span>
                            )}

                            {/* 画像コンテナ */}
                            <div style={imageContainerStyle}>
                                <img 
                                    src={imageUrl} 
                                    alt={isUnlocked ? character.name : '未解禁'} 
                                    style={imageStyle} 
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = isUnlocked ? UNLOCKED_CARD_DEFAULT_IMAGE : LOCKED_CARD_IMAGE;
                                    }}
                                />
                            </div>
                            
                            <p style={{...nameStyle, fontSize: nameFontSize}}>
                                {displayName}
                            </p>
                            
                            {/* 解禁日時表示 */}
                            {isUnlocked && unlockedAt && (
                                <p style={unlockedDateStyle}>
                                    ゲット: {formatDateTime(unlockedAt)}
                                </p>
                            )}

                            {isUnlocked && (
                                <span style={rarityBadgeStyle}>
                                    {displayRarity}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* モーダル */}
            {selectedCharacter && (
                <ChallengeModal 
                    character={selectedCharacter}
                    onConfirm={handleConfirmChallenge}
                    onCancel={() => setSelectedCharacter(null)}
                />
            )}

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