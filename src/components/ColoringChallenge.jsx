// src/components/ColoringChallenge.jsx (Undo機能追加版)

import React, { useState, useEffect, useMemo } from "react";
import { 
    CHALLENGE_DATA_MAP, 
    COLOR_PALETTE, 
    extractPathData 
} from '../data/animeData'; 
import characters from '../data/characters';

// ----------------------------------------------
// 画面幅を監視するカスタムフック
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


// 💡 画像パスの定義 
const SHINCHAN_BACKGROUND_IMAGE_URL = 'assets/cards/sinchan_bg.png'; // PC用
const SHINCHAN_BACKGROUND_IMAGE_MOBILE_URL = 'assets/cards/sinchan_bg_mobile.png'; // スマホ用
const WOOD_PALETTE_IMAGE_URL = 'assets/cards/wood_texture.jpg'; 

// 💡 成功音、クリック音、失敗音のパス
const CLICK_SOUND_PATH = '/assets/sounds/click.mp3'; 
const CLICK_SOUND_PATH_KACHI = '/assets/sounds/click2.mp3'; 
const CLICK_SOUND_PATH_PI = '/assets/sounds/click4.mp3'; 
const SUCCESS_SOUND_PATH = '/assets/sounds/success.mp3';
const BAD_SOUND_PATH = '/assets/sounds/bad.mp3'; 

const playClickSound = () => {
    try {
        const audio = new Audio(CLICK_SOUND_PATH);
        audio.volume = 0.5; 
        audio.play().catch(e => console.log("Audio playback failed:", e));
    } catch (error) {
        console.error("Error loading or playing sound:", error);
    }
};

const playClickSound_kachi = () => {
    try {
        const audio = new Audio(CLICK_SOUND_PATH_KACHI);
        audio.volume = 0.5; 
        audio.play().catch(e => console.log("Audio playback failed:", e));
    } catch (error) {
        console.error("Error loading or playing sound:", error);
    }
};

const playClickSound_pi = () => {
    try {
        const audio = new Audio(CLICK_SOUND_PATH_PI);
        audio.volume = 0.5; 
        audio.play().catch(e => console.log("Audio playback failed:", e));
    } catch (error) {
        console.error("Error loading or playing sound:", error);
    }
};

const playSuccessSound = () => {
    try {
        const audio = new Audio(SUCCESS_SOUND_PATH);
        audio.volume = 0.7; 
        audio.play().catch(e => console.log("Audio playback failed:", e));
    } catch (error) {
        console.error("Error loading or playing success sound:", error);
    }
};

const playBadSound = () => {
    try {
        const audio = new Audio(BAD_SOUND_PATH);
        audio.volume = 0.7; 
        audio.play().catch(e => console.log("Audio playback failed:", e));
    } catch (error) {
        console.error("Error loading or playing bad sound:", error);
    }
};

// ----------------------------------------------
// コンポーネント本体
// ----------------------------------------------
const ColoringChallenge = ({ characterId, onComplete, onCancel }) => {
    
    const isMobile = useIsMobile(); 

    // 1. 必要なデータと初期値を useMemo で計算
    const challengeData = CHALLENGE_DATA_MAP[characterId];
    const characterInfo = characters.find(c => c.id === characterId);

    if (!challengeData || !characterInfo) {
        return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            エラー: キャラクターID "{characterId}" のチャレンジデータが見つかりません。
        </div>;
    }
    
    const CHAR_PARTS = challengeData.parts; 
    
    const initialColors = useMemo(() => {
        return CHAR_PARTS.reduce((acc, part) => {
            acc[part.id] = COLOR_PALETTE.white; 
            return acc;
        }, {});
    }, [characterId, CHAR_PARTS]);


    // 2. State の定義 
    const [SVG_PATHS, setSVG_PATHS] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [colors, setColors] = useState(initialColors);
    const [currentColor, setCurrentColor] = useState(COLOR_PALETTE.yellow); 
    const [feedbackMessage, setFeedbackMessage] = useState(''); 
    const [showSuccessEffect, setShowSuccessEffect] = useState(false); 
    const [showBadEffect, setShowBadEffect] = useState(false); 
    // 🎯 新規 State: 履歴を保存する配列
    const [history, setHistory] = useState([]);


    // 3. マウント時（または characterId 変更時）に SVG をパース
    useEffect(() => {
        setIsLoading(true);
        setColors(initialColors);
        // 🎯 履歴をリセット
        setHistory([]); 
        setFeedbackMessage(''); 
        setShowSuccessEffect(false);
        setShowBadEffect(false);
        
        try {
            const paths = extractPathData(challengeData.svgText);
            setSVG_PATHS(paths);
        } catch (error) {
            console.error("SVGデータのロードまたはパースに失敗しました。", error);
        } finally {
            setIsLoading(false);
        }
    }, [characterId, challengeData.svgText, initialColors]); 

    
    // 4. パーツをクリックして色を塗る関数 (履歴追加ロジックを含む)
    const handlePartClick = (partId) => {
        if (!CHAR_PARTS.some(p => p.id === partId)) {
            console.warn(`Part ID ${partId} is not defined in CHAR_PARTS.`);
            return;
        }

        // 🎯 履歴に現在の状態を追加 (直前の状態)
        setHistory(prevHistory => [...prevHistory, colors]); 
        
        // 新しい色の状態を設定
        setColors((prev) => ({
            ...prev,
            [partId]: currentColor, 
        }));
        
        setFeedbackMessage(''); 
        setShowBadEffect(false); 
    };
    
    // 🎯 新規関数: 一つ前に戻る (Undo) 機能
    const handleUndo = () => {
        if (history.length > 0) {
            playClickSound(); // クリック音を鳴らす
            
            // 履歴の最後の要素（直前の状態）を取得
            const previousColors = history[history.length - 1];
            
            // 履歴から最後の要素を削除
            setHistory(prevHistory => prevHistory.slice(0, -1));
            
            // 色の状態を戻す
            setColors(previousColors);
            
            setFeedbackMessage('一つ前の操作に戻ったよ！');
            setShowBadEffect(false);
        } else {
            setFeedbackMessage('これ以上戻れません。');
        }
    };


    // 5. 塗り絵の採点ロジック
    const handleComplete = () => {
        
        if (showSuccessEffect || showBadEffect) return;

        const correctColors = CHAR_PARTS.reduce((acc, part) => {
            acc[part.id] = part.defaultColor;
            return acc;
        }, {});

        let wrongPartsCount = 0;
        const newColors = { ...colors }; 
        
        // 🎯 採点する前の状態を履歴に保存 (間違った色を白に戻す前の状態)
        setHistory(prevHistory => [...prevHistory, colors]);

        CHAR_PARTS.forEach(part => {
            const currentPartColor = colors[part.id];
            const correctPartColor = correctColors[part.id];

            if (currentPartColor !== correctPartColor) {
                wrongPartsCount++;
                newColors[part.id] = COLOR_PALETTE.white;
            }
        });

        if (wrongPartsCount === 0) {
            
            playSuccessSound(); 
            setFeedbackMessage('🎉 満点クリア！やったね！ 🎉'); 
            setShowSuccessEffect(true);
            
            setTimeout(() => {
                setShowSuccessEffect(false); 
                if (onComplete) { 
                    onComplete(); 
                }
            }, 1500); 
            
        } else {
            
            playBadSound();
            setColors(newColors); 
            setFeedbackMessage(`残念！あと ${wrongPartsCount} ヶ所違います。もう一度塗り直してみよう！`);
            
            setShowBadEffect(true);
            setTimeout(() => {
                setShowBadEffect(false);
            }, 500); 
        }
    };
    

const COLOR_NAMES_JAPANESE = {
    skin: "うすだいたい", 
    black: "くろいろ",
    red: "あかいろ",
    yellow: "きいろ",
    white: "しろいろ",
    blue: "あおいろ",
    pink: "ももいろ",
    light_blue: "みずいろ",
    brown: "ちゃいろ",
    orenge: "おれんじ",
    green: "みどりいろ",
    purple: "むらさきいろ",
    gray: "はいいろ",
    light_green: "きみどりいろ",
    beige: "べーじゅ",
    dark_blue: "こんいろ",
    burn_skin: "やけどしただいたい",
    dark_red: "くすんだあか",
    dark_pink: "こいぴんく",
    dark_brown: "こいちゃいろ",
    emelald_green: "えめらるどぐりーん",
    light_red: "こいあか",
    dark_green: "こいみどり",
    light_purple: "うすむらさき",
    cream: "くりーむいろ",
    red_perple: "あかむらさき",
    kind_blue: "やさしいあお"
};


    // カラーコードから色の名前を取得する関数
const getColorName = (colorCode) => {
    const entries = Object.entries(COLOR_PALETTE);
    const foundEntry = entries.find(([name, code]) => code === colorCode);

    if (foundEntry) {
        const englishName = foundEntry[0]; 
        return COLOR_NAMES_JAPANESE[englishName] || englishName; 
    }
    
    return colorCode; 
};


    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "50px" }}>{characterInfo.name} のデータを読み込み中...</div>;
    }

    if (SVG_PATHS.length === 0) {
        return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>エラー: パスデータがSVGファイルから抽出できませんでした。</div>;
    }

    // ----------------------------------------------
    // 🎯 SVGスタイル
    // ----------------------------------------------
    const svgStyle = {
        width: "100%", 
        height: "auto", 
        border: showSuccessEffect ? "6px solid #FFD700" : (showBadEffect ? "4px solid #E0002A" : "3px solid black"), 
        boxShadow: showSuccessEffect 
            ? '0 0 30px #FFD700, 5px 5px 0 #333' 
            : (showBadEffect ? '0 0 15px #E0002A, 5px 5px 0 #333' : '5px 5px 0 #333'), 
        transform: showSuccessEffect ? 'scale(1.02)' : 'scale(1)', 
        transition: 'all 0.3s ease-in-out', 
        backgroundColor: 'white', 
    };


    const screenContainerStyle = {
        textAlign: 'center',
        padding: '40px 20px', 
        minHeight: '100vh',
        backgroundColor: showBadEffect ? 'rgba(255, 192, 203, 0.5)' : 'transparent',
        backgroundImage: isMobile 
            ? `url(${SHINCHAN_BACKGROUND_IMAGE_MOBILE_URL})` 
            : `url(${SHINCHAN_BACKGROUND_IMAGE_URL})`,         
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        transition: 'background-color 0.5s', 
    };

    const drawingAreaContainerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'center', 
        alignItems: isMobile ? 'center' : 'flex-start', 
        maxWidth: '800px', 
        width: '90%', 
        margin: '20px auto', 
        gap: isMobile ? '40px' : '20px', 
    };

    const svgContainerStyle = {
        width: isMobile ? '90%' : '400px', 
        maxWidth: '400px', 
        flexShrink: 0,
        order: isMobile ? 1 : 'unset', 
    };

    const paletteGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        marginTop: isMobile ? '0' : '0px', 
        order: isMobile ? 2 : 'unset', 
    };

    const colorPaletteWrapperStyle = {
        backgroundImage: `url(${WOOD_PALETTE_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignContent: 'center', 
        gap: '10px', 
        width: isMobile ? '300px' : '390px', 
        height: isMobile ? 'auto' : '230px', 
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.4)',
        border: '3px solid #8B4513', 
        flexShrink: 0,
    };
    
    // ----------------------------------------------
    // 最終的なJSXのレンダリング
    // ----------------------------------------------

    return (
        <div className="coloring-challenge-container" style={screenContainerStyle}>
            
            {/* 🎯 タイトルエリア */}
            <div style={titleBoxStyle}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={titleStyle}> 【{characterInfo.name}】{isMobile && <br />}  塗り絵チャレンジ</h2>
                

                <p style={{
                    ...currentColorTextStyle,
                }}>
                    現在選択中の色 
                    {isMobile ? (
                        <br />
                    ) : (
                        '： '
                    )}
                    <strong style={{ 
                        color: currentColor, 
                        fontSize: "1.6rem",
                        fontFamily: '"M PLUS Rounded 1c", "Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
                        textShadow: '1px 1px 2px #333, -1px -1px 2px #333' 
                    }}>
                        {getColorName(currentColor)}
                    </strong>
                </p>
                {/* 🎯 フィードバックメッセージ表示エリア */}
                {feedbackMessage && (
                    <p style={feedbackMessageStyle}>
                        {feedbackMessage}
                    </p>
                )}
            </div>
            </div>
            

            {/* 塗り絵エリアとパレットのコンテナ */}
            <div style={drawingAreaContainerStyle}>
                
                {/* 塗り絵エリア */}
                <div style={svgContainerStyle}>
                    <svg
                        viewBox={challengeData.viewBox || "0 0 210 297"}
                        xmlns="http://www.w3.org/2000/svg"
                        style={svgStyle}
                    >
                        {SVG_PATHS.map((path) => (
                            <path
                                key={path.id}
                                id={path.id}
                                d={path.d}
                                // 🌟🌟 修正箇所：キャラクターIDとパスIDの二重チェック 🌟🌟
                    stroke={
                        characterId === 'yonrou' && path.id === 'path49'
                            ? 'white'     // yonrouのpath49なら「白」
                            : 'black'     // それ以外は「黒」
                    }
                                strokeWidth="1.665"
                                fill={colors[path.id] || COLOR_PALETTE.white}
                                onClick={() => {
                                    playClickSound_kachi(); 
                                    handlePartClick(path.id);
                                }}
                                title={CHAR_PARTS.find(p => p.id === path.id)?.label || path.id}
                            />
                        ))}
                        </svg>
                </div>

                {/* カラーパレットとタイトルをまとめるコンテナ */}
                <div style={paletteGroupStyle}>
                    
                    {/* パレットタイトル */}
                    <div style={paletteTitleStyle}>
                        カラーパレット
                    </div>

                    {/* カラーパレット本体 */}
                    <div style={colorPaletteWrapperStyle}>
                        {Object.entries(COLOR_PALETTE).map(([name, colorCode]) => (
                            <button
                                key={name}
                                onClick={() => {
                                    playClickSound_pi(); 
                                    setCurrentColor(colorCode);
                                }}
                                style={{
                                    ...colorSwatchStyle,
                                    backgroundColor: colorCode,
                                    border: colorCode === currentColor ? "3px solid #333" : "1px solid #ccc",
                                    boxShadow: colorCode === currentColor ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
                                }}
                                title={name}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <hr style={{ maxWidth: '800px', margin: '10px auto', borderTop: '1px solid #ccc' }} />

            {/* ボタンエリア */}
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {/* 🎯 Undoボタン */}
                <button
                    onClick={handleUndo}
                    disabled={showSuccessEffect || showBadEffect || history.length === 0} 
                    style={{
                        padding: "10px 20px",
                        fontSize: "1.2rem",
                        backgroundColor: "#87CEFA", // スカイブルー系の色
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "10px",
                        marginRight: "10px",
                        cursor: (showSuccessEffect || showBadEffect || history.length === 0) ? "default" : "pointer",
                        fontWeight: 'bold',
                        boxShadow: '3px 3px 0 #4682B4',
                    }}
                >
                    ↩️ ひとつ戻る
                </button>

                <button
                    onClick={handleComplete}
                    disabled={showSuccessEffect || showBadEffect} 
                    style={{
                        padding: "10px 20px",
                        fontSize: "1.2rem",
                        backgroundColor: showSuccessEffect ? "#FFD700" : (showBadEffect ? "#E0002A" : "#4CAF50"), 
                        color: showSuccessEffect ? "#333" : "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "10px",
                        cursor: (showSuccessEffect || showBadEffect) ? "default" : "pointer",
                        fontWeight: 'bold',
                        boxShadow: showSuccessEffect ? '3px 3px 0 #B8860B' : (showBadEffect ? '3px 3px 0 #A0001D' : '3px 3px 0 #38761d'),
                    }}
                >
                    {showSuccessEffect 
                        ? '✨ 満点！ ✨' 
                        : (showBadEffect ? '❌ 違ったよ！ ❌' : 'これで完成！')}
                </button>
                
                {onCancel && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onCancel(); 
                        }}
                        style={{
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            backgroundColor: "#ccc",
                            color: "#333",
                            border: "none",
                            borderRadius: "5px",
                            marginTop: "10px",
                            marginLeft: "10px",
                            cursor: "pointer",
                            fontWeight: 'bold',
                            boxShadow: '3px 3px 0 #999',
                        }}
                    >
                        コレクションに戻る
                    </button>
                )}
            </div>

        </div>
    );
};

export default ColoringChallenge;


// --- スタイル定義 (変更なし) ---
const titleBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: '1px 20px',
    borderRadius: '15px',
    border: '4px solid #000', 
    margin: '30px auto', 
    maxWidth: 'fit-content',
};


const titleStyle = {
    color: 'black', 
    fontSize: '1.6rem', 
    fontWeight: 'bold', 
    letterSpacing: '5px', 
    marginBottom: '30px', 
    transform: 'skewX(-5deg)',
    fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
};

const currentColorTextStyle = { 
    marginTop: "10px", 
    fontWeight: "bold",
    fontSize: "1.3rem", 
    color: "#333",
    textShadow: '1px 1px 0 #fff', 
};

const feedbackMessageStyle = {
    fontFamily: '"Mochiy Pop One", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#E0002A', 
    marginTop: '15px',
    padding: '5px 10px',
    border: '2px solid #E0002A',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
};


const paletteTitleStyle = {
    fontFamily: '"M PLUS Rounded 1c", "Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
    fontWeight: '900', 
    fontSize: '1.7rem', 
    color: '#333', 
    textShadow: `
        -2px -2px 0 #ffffff, 
        2px -2px 0 #ffffff, 
        -2px 2px 0 #ffffff, 
        2px 2px 0 #ffffff 
    `,
    marginBottom: '5px', 
};


const colorSwatchStyle = {
    width: '40px', 
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.1s, border 0.1s, box-shadow 0.1s',
    flexShrink: 0, 
};