// src/components/ColoringChallenge.jsx (最終修正版)

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


// 💡 画像パスの定義 (変更なし)
const SHINCHAN_BACKGROUND_IMAGE_URL = 'assets/cards/sinchan_bg.png';
const WOOD_PALETTE_IMAGE_URL = 'assets/cards/wood_texture.jpg'; 


// ----------------------------------------------
// コンポーネント本体
// ----------------------------------------------
const ColoringChallenge = ({ characterId, onComplete, onCancel }) => {
    
    const isMobile = useIsMobile(); // 画面サイズを監視

    // 1. 必要なデータと初期値を useMemo で計算 (変更なし)
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


    // 2. State の定義 (変更なし)
    const [SVG_PATHS, setSVG_PATHS] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [colors, setColors] = useState(initialColors);
    const [currentColor, setCurrentColor] = useState(COLOR_PALETTE.yellow); 

    
    // 3. マウント時（または characterId 変更時）に SVG をパース (変更なし)
    useEffect(() => {
        setIsLoading(true);
        setColors(initialColors);
        
        try {
            const paths = extractPathData(challengeData.svgText);
            setSVG_PATHS(paths);
        } catch (error) {
            console.error("SVGデータのロードまたはパースに失敗しました。", error);
        } finally {
            setIsLoading(false);
        }
    }, [characterId, challengeData.svgText, initialColors]); 

    
    // 4. パーツをクリックして色を塗る関数 (変更なし)
    const handlePartClick = (partId) => {
        if (!CHAR_PARTS.some(p => p.id === partId)) {
            console.warn(`Part ID ${partId} is not defined in CHAR_PARTS.`);
            return;
        }

        setColors((prev) => ({
            ...prev,
            [partId]: currentColor, 
        }));
    };

    // 5. 塗り絵の採点ロジック (変更なし)
    const handleComplete = () => {
        const correctColors = CHAR_PARTS.reduce((acc, part) => {
            acc[part.id] = part.defaultColor;
            return acc;
        }, {});

        let correctCount = 0;
        const totalParts = CHAR_PARTS.length;

        CHAR_PARTS.forEach(part => {
            const currentPartColor = colors[part.id];
            const correctPartColor = correctColors[part.id];

            if (currentPartColor === correctPartColor) {
                correctCount++;
            }
        });

        const score = (correctCount / totalParts) * 100;

        if (score === 100) {
            if (onComplete) { 
                onComplete(); 
            } else {
                alert(`🎉 満点です！`);
            }
        } else {
            alert(`残念！正解率 ${score.toFixed(0)}% です。もう一度挑戦してみよう！`);
        }
    };
    

const COLOR_NAMES_JAPANESE = {
    // ... (変更なし)
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
    dark_red: "あかむらさき",
    dark_pink: "こいぴんく",
    dark_brown: "こいちゃいろ",
    emelald_green: "えめらるどぐりーん",
    light_red: "こいあか"
};


    // カラーコードから色の名前を取得する関数 (変更なし)
const getColorName = (colorCode) => {
    // 1. カラーコードから英語の色名（キー）を探す
    const entries = Object.entries(COLOR_PALETTE);
    const foundEntry = entries.find(([name, code]) => code === colorCode);

    if (foundEntry) {
        const englishName = foundEntry[0]; // 例: 'red'
        
        // 2. 英語名を日本語名に変換する
        return COLOR_NAMES_JAPANESE[englishName] || englishName; // マップにない場合は英語名をそのまま返す
    }
    
    // マップにないカラーコードの場合は、そのままコードを返す
    return colorCode; 
};


    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "50px" }}>{characterInfo.name} のデータを読み込み中...</div>;
    }

    if (SVG_PATHS.length === 0) {
        return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>エラー: パスデータがSVGファイルから抽出できませんでした。</div>;
    }

    // ----------------------------------------------
    // 🎯 重要な修正: 画面幅に基づくスタイル定義
    // ----------------------------------------------

    // 塗り絵エリアとパレットを横並びにするコンテナ
    const drawingAreaContainerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // スマホなら縦、PCなら横
        justifyContent: 'center', 
        alignItems: isMobile ? 'center' : 'flex-start', // スマホなら中央、PCなら上
        maxWidth: '800px', 
        width: '90%', 
        margin: '20px auto', 
        gap: isMobile ? '40px' : '20px', 
    };

    // SVGコンテナ
    const svgContainerStyle = {
        width: isMobile ? '90%' : '400px', // スマホなら90%、PCなら400px
        maxWidth: '400px', // スマホでも最大幅は維持
        flexShrink: 0,
        order: isMobile ? 1 : 'unset', // SVGを常に上/左に
    };

    // カラーパレットグループ
    const paletteGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        // スマホなら0px、PCなら55px
        marginTop: isMobile ? '0' : '55px', 
        order: isMobile ? 2 : 'unset', // パレットを常に下/右に
    };

    // カラーパレット本体
    const colorPaletteWrapperStyle = {
        backgroundImage: `url(${WOOD_PALETTE_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignContent: 'center', 
        gap: '10px', 
        // スマホなら300px、PCなら390px
        width: isMobile ? '300px' : '390px', 
        height: isMobile ? 'auto' : '230px', 
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.4)',
        border: '3px solid #8B4513', 
        flexShrink: 0,
    };
    
    // (他のスタイル定義はそのままJSX下に残します)
    // ----------------------------------------------


    return (
        <div className="coloring-challenge-container" style={screenContainerStyle}>
            
            {/* 🎯 タイトルエリア (変更なし) */}
            <div style={titleBoxStyle}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={titleStyle}> 【{characterInfo.name}】 塗り絵ゲットチャレンジ</h2>

                <p style={currentColorTextStyle}>
                    現在選択中の色： 
                    <strong style={{ 
                        color: currentColor, 
                        fontSize: "2rem",
                        fontFamily: '"M PLUS Rounded 1c", "Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
                        textShadow: '1px 1px 2px #333, -1px -1px 2px #333' 
                    }}>
                        {getColorName(currentColor)}
                    </strong>
                </p>
            </div>
            </div>
            

            {/* 塗り絵エリアとパレットのコンテナ (インラインスタイルに戻す) */}
            <div style={drawingAreaContainerStyle}>
                
                {/* 塗り絵エリア */}
                <div style={svgContainerStyle}>
                    <svg
                        viewBox={challengeData.viewBox || "0 0 210 297"}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "100%", height: "auto", border: "3px solid black", boxShadow: '5px 5px 0 #333', backgroundColor: 'white' }}
                    >
                        {SVG_PATHS.map((path) => (
                            <path
                                key={path.id}
                                id={path.id}
                                d={path.d}
                                stroke="black"
                                strokeWidth="1.665"
                                fill={colors[path.id] || COLOR_PALETTE.white}
                                onClick={() => handlePartClick(path.id)}
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
                                onClick={() => setCurrentColor(colorCode)}
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

            <hr style={{ maxWidth: '800px', margin: '20px auto', borderTop: '1px solid #ccc' }} />

            {/* ボタンエリア (変更なし) */}
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <button
                    onClick={handleComplete}
                    style={{
                        padding: "10px 20px",
                        fontSize: "1.2rem",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "10px",
                        cursor: "pointer",
                        fontWeight: 'bold',
                        boxShadow: '3px 3px 0 #38761d',
                    }}
                >
                    これで完成！
                </button>
                
                {onCancel && (
                    <button
                        onClick={onCancel}
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


// --- スタイル定義 (isMobileに依存しないもののみ残す) ---

const screenContainerStyle = {
    textAlign: 'center',
    padding: '40px 20px', 
    minHeight: '100vh',
    backgroundImage: `url(${SHINCHAN_BACKGROUND_IMAGE_URL})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
};

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
    fontSize: '2.3rem', 
    fontWeight: 'bold', 
    letterSpacing: '5px', 
    marginBottom: '30px', 
    transform: 'skewX(-5deg)',
    fontFamily: '"Mochiy Pop One", "Comic Sans MS", cursive, sans-serif',
};

const currentColorTextStyle = { 
    marginTop: "10px", 
    fontWeight: "bold",
    fontSize: "1.7rem", 
    color: "#333",
    textShadow: '1px 1px 0 #fff', 
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