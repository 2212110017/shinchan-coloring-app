// src/data/animeData.js

// 🎯 SVGファイルの生テキストをインポート（キャラクター全員分）
import SinchanSvgText from "../assets/sinchan.svg?raw"; 
import HimawariSvgText from "../assets/himawari.svg?raw"; 
import MisaeSvgText from "../assets/misae.svg?raw"; 
import HirosiSvgText from "../assets/hirosi.svg?raw"; 
import SiroSvgText from "../assets/siro.svg?raw";
import MusaeSvgText from "../assets/musae.svg?raw";  
import KazamaSvgText from "../assets/kazama.svg?raw"; 
import NeneSvgText from "../assets/nene.svg?raw";
import MasaoSvgText from "../assets/masao.svg?raw";  
import BoSvgText from "../assets/bo.svg?raw"; 
import KumityouSvgText from "../assets/kumityou.svg?raw"; 
import YosinagaSvgText from "../assets/yosinaga.svg?raw"; 
import MatuzakaSvgText from "../assets/matuzaka.svg?raw"; 
import AgeoSvgText from "../assets/ageo.svg?raw"; 
import AiSvgText from "../assets/ai.svg?raw"; 
import KuroisoSvgText from "../assets/kuroiso.svg?raw"; 

// 塗り絵に使用する色パレット（汎用的に利用するためここで定義）
export const COLOR_PALETTE = {
  skin: "#fbd4ab", 
  black: "#000000",
  red: "#ff0000",
  yellow: "#ffff00",
  white: "#ffffff",
  blue: "#007ac5",
  pink: "#f4afc2",
  light_blue: "#9ad5f3",
  brown: "#994f28",
  orenge: "#eaa000",
  green: "#009758",
  purple: "#8675b4",
  gray: "#bcc4c7",
  light_green: "#a5ce5e",
  beige: "#fcd385",
  dark_blue: "#024178",
  burn_skin: "#f99d8e",
  dark_red: "#b86766",
  dark_pink: "#ea6b8c",
  dark_brown: "#462827",
  emelald_green: "#50cab4",
  light_red: "#b81504",
  dark_green: "#016b67",
  light_purple: "#e7d4e7",
  cream: "#fffade"
};

// ----------------------------------------------------
// キャラクターごとのデータ定義
// ----------------------------------------------------

// 1. 野原しんのすけのパーツと正解色
const SINCHAN_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path8", defaultColor: "#ffffff" }, 
        { id: "path11", defaultColor: "#000000" }, 
        { id: "path9", defaultColor: "#ffffff" }, 
        { id: "path16", defaultColor: "#000000" }, 
        { id: "path14", defaultColor: "#000000" }, 
        { id: "path15", defaultColor: "#000000" }, 
        { id: "path13", defaultColor: "#000000" }, 
        { id: "path19", defaultColor: "#b86766" }, 
        { id: "path12", defaultColor: "#fbd4ab" }, 
        { id: "path20", defaultColor: "#fbd4ab" }, 
        { id: "path21", defaultColor: "#fbd4ab" }, 
        { id: "path22", defaultColor: "#ff0000" }, 
        { id: "path29", defaultColor: "#ffff00" }, 
        { id: "path23", defaultColor: "#fbd4ab" }, 
        { id: "path25", defaultColor: "#ffffff" }, 
        { id: "path27", defaultColor: "#ffff00" }, 
        { id: "path24", defaultColor: "#fbd4ab" }, 
        { id: "path26", defaultColor: "#ffffff" }, 
        { id: "path28", defaultColor: "#ffff00" }, 
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: SinchanSvgText,
    // 🔍 SVGの viewBox (シンチャンのものに合わせる)
    viewBox: "0 0 164.77371 194.42892",
};

// 2. ひまわり
const HIMAWARI_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#eaa000" }, 
        { id: "path7", defaultColor: "#000000" }, 
        { id: "path8", defaultColor: "#ffffff" }, 
        { id: "path10", defaultColor: "#000000" }, 
        { id: "path11", defaultColor: "#ffffff" }, 
        { id: "path13", defaultColor: "#b86766" }, 
        { id: "path14", defaultColor: "#ffffff" }, 
        { id: "path16", defaultColor: "#ffffff" }, 
        { id: "path17", defaultColor: "#ffff00" }, 
        { id: "path22", defaultColor: "#fbd4ab" }, 
        { id: "path23", defaultColor: "#ffff00" }, 
        { id: "path24", defaultColor: "#fbd4ab" }, 
        { id: "path27", defaultColor: "#ffff00" }, 
        { id: "path28", defaultColor: "#ffff00" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: HimawariSvgText,
    // 🔍 SVGの viewBox (ひまわりのものに合わせる)
    viewBox: "0 0 162.52272 155.58469",
};

// 3. みさえ
const MISAE_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path2", defaultColor: "#fbd4ab"}, 
        { id: "path4", defaultColor: "#994f28" }, 
        { id: "path11", defaultColor: "#000000" }, 
        { id: "path12", defaultColor: "#ffffff" }, 
        { id: "path13", defaultColor: "#000000" }, 
        { id: "path14", defaultColor: "#ffffff" }, 
        { id: "path16", defaultColor: "#b86766" }, 
        { id: "path17", defaultColor: "#fbd4ab" }, 
        { id: "path18", defaultColor: "#f4afc2" }, 
        { id: "path19", defaultColor: "#fbd4ab" }, 
        { id: "path21", defaultColor: "#fbd4ab" }, 
        { id: "path22", defaultColor: "#9ad5f3" }, 
        { id: "path36", defaultColor: "#fbd4ab" }, 
        { id: "path35", defaultColor: "#ffffff"}, 
        { id: "path37", defaultColor: "#ffffff"}, 
        { id: "path39", defaultColor: "#fbd4ab"}, 
        { id: "path40", defaultColor: "#ffffff"}, 
        { id: "path41", defaultColor: "#ffffff"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: MisaeSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 209.41568 267.81631",
};

// 4. ひろし
const HIROSI_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#462827"}, 
        { id: "path3", defaultColor: "#462827" }, 
        { id: "path4", defaultColor: "#462827" }, 
        { id: "path12", defaultColor: "#b86766" }, 
        { id: "path13", defaultColor: "#fbd4ab"}, 
        { id: "path14", defaultColor: "#007ac5" }, 
        { id: "path15", defaultColor: "#fbd4ab" }, 
        { id: "path17", defaultColor: "#fbd4ab" }, 
        { id: "path18", defaultColor: "#fcd385" }, 
        { id: "path19", defaultColor: "#fcd385" }, 
        { id: "path20", defaultColor: "#994f28" }, 
        { id: "path21", defaultColor: "#994f28" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: HirosiSvgText,
    // 🔍 SVGの viewBox (ひろしのものに合わせる)
    viewBox: "0 0 210 297",
};

// 5. シロ
const SIRO_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#000000"}, 
        { id: "path2", defaultColor: "#ffffff"}, 
        { id: "path3", defaultColor: "#ffffff" }, 
        { id: "path4", defaultColor: "#ffffff" }, 
        { id: "path7", defaultColor: "#000000" }, 
        { id: "path8", defaultColor: "#000000" }, 
        { id: "path10", defaultColor: "#ffffff" }, 
        { id: "path25", defaultColor: "#ffffff" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: SiroSvgText,
    // 🔍 SVGの viewBox (ひろしのものに合わせる)
    viewBox: "0 0 183.06102 140.31186",
};

// 6. むさえ
const MUSAE_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#994f28"}, 
        { id: "path12", defaultColor: "#000000"  }, 
        { id: "path13", defaultColor: "#000000"  }, 
        { id: "path14", defaultColor: "#ffffff" }, 
        { id: "path15", defaultColor: "#ffffff" }, 
        { id: "path23", defaultColor: "#fbd4ab" }, 
        { id: "path24", defaultColor: "#fbd4ab" }, 
        { id: "path25", defaultColor: "#fbd4ab" }, 
        { id: "path26", defaultColor: "#9ad5f3" }, 
        { id: "path27", defaultColor: "#fffade" }, 
        { id: "path28", defaultColor: "#fbd4ab" },
        { id: "path29", defaultColor: "#007ac5" },  
        { id: "path30", defaultColor: "#fbd4ab" }, 
        { id: "path31", defaultColor: "#007ac5" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: MusaeSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 7. かざまくん
const KAZAMA_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#024178"}, 
        { id: "path8", defaultColor: "#000000"  }, 
        { id: "path10", defaultColor: "#000000"  }, 
        { id: "path12", defaultColor: "#b86766" }, 
        { id: "path34", defaultColor: "#fbd4ab" }, 
        { id: "path35", defaultColor: "#fbd4ab" }, 
        { id: "path13", defaultColor: "#fbd4ab" }, 
        { id: "path26", defaultColor: "#9ad5f3" }, 
        { id: "path27", defaultColor: "#007ac5" },
        { id: "path28", defaultColor: "#fbd4ab" },  
        { id: "path29", defaultColor: "#fbd4ab" }, 
        { id: "path30", defaultColor: "#ffffff" }, 
        { id: "path31", defaultColor: "#ffffff" }, 
        { id: "path32", defaultColor: "#9ad5f3" },
        { id: "path33", defaultColor: "#9ad5f3" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: KazamaSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 8. ねねちゃん
const NENE_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#b81504" }, 
        { id: "path3", defaultColor: "#b81504"}, 
        { id: "path4", defaultColor: "#50cab4"  }, 
        { id: "path18", defaultColor: "#000000" }, 
        { id: "path19", defaultColor: "#000000" }, 
        { id: "path20", defaultColor: "#ffffff" }, 
        { id: "path21", defaultColor: "#ffffff" }, 
        { id: "path22", defaultColor: "#b86766" }, 
        { id: "path23", defaultColor: "#f4afc2" },
        { id: "path24", defaultColor: "#ffffff" },  
        { id: "path25", defaultColor: "#fbd4ab" }, 
        { id: "path26", defaultColor: "#fbd4ab" }, 
        { id: "path28", defaultColor: "#ea6b8c" }, 
        { id: "path35", defaultColor: "#fbd4ab" }, 
        { id: "path36", defaultColor: "#fbd4ab" },
        { id: "path37", defaultColor: "#ffffff" }, 
        { id: "path38", defaultColor: "#ffffff" }, 
        { id: "path39", defaultColor: "#b81504" }, 
        { id: "path40", defaultColor: "#b81504"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: NeneSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 9. まさおくん
const MASAO_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#fbd4ab" }, 
        { id: "path3", defaultColor: "#9ad5f3"}, 
        { id: "path12", defaultColor: "#b86766" }, 
        { id: "path13", defaultColor: "#009758" }, 
        { id: "path14", defaultColor: "#fbd4ab" }, 
        { id: "path15", defaultColor: "#fbd4ab" }, 
        { id: "path16", defaultColor: "#007ac5" }, 
        { id: "path17", defaultColor: "#fbd4ab" }, 
        { id: "path18", defaultColor: "#fbd4ab" }, 
        { id: "path19", defaultColor: "#ffffff" }, 
        { id: "path20", defaultColor: "#ffffff" }, 
        { id: "path21", defaultColor: "#ffff00" }, 
        { id: "path22", defaultColor: "#ffff00" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: MasaoSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 10. ぼーちゃん
const BO_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#462827" }, 
        { id: "path7", defaultColor: "#ffffff"}, 
        { id: "path8", defaultColor: "#b86766" }, 
        { id: "path15", defaultColor: "#ffff00" }, 
        { id: "path16", defaultColor: "#ea6b8c" }, 
        { id: "path19", defaultColor: "#ffff00" },
        { id: "path20", defaultColor: "#fbd4ab" }, 
        { id: "path21", defaultColor: "#fbd4ab" }, 
        { id: "path22", defaultColor: "#fbd4ab" }, 
        { id: "path23", defaultColor: "#fbd4ab" }, 
        { id: "path24", defaultColor: "#50cab4" }, 
        { id: "path25", defaultColor: "#ffffff" }, 
        { id: "path26", defaultColor: "#ffffff" }, 
        { id: "path27", defaultColor: "#9ad5f3" }, 
        { id: "path28", defaultColor: "#9ad5f3" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: BoSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 11. くみちょう
const KUMITYOU_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#f99d8e"}, 
        { id: "path2", defaultColor: "#000000" }, 
        { id: "path3", defaultColor: "#b86766"}, 
        { id: "path4", defaultColor: "#b86766"}, 
        { id: "path19", defaultColor: "#f99d8e"}, 
        { id: "path20", defaultColor: "#024178" }, 
        { id: "path21", defaultColor: "#fcd385" }, 
        { id: "path22", defaultColor: "#fcd385" },
        { id: "path25", defaultColor: "#f99d8e"}, 
        { id: "path26", defaultColor: "#fcd385" },
        { id: "path27", defaultColor: "#462827" }, 
        { id: "path28", defaultColor: "#462827" }
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: KumityouSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 12. よしながせんせい
const YOSINAGA_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#994f28" }, 
        { id: "path3", defaultColor: "#50cab4"}, 
        { id: "path34", defaultColor: "#000000"  }, 
        { id: "path6", defaultColor: "#000000" }, 
        { id: "path8", defaultColor: "#ffffff"}, 
        { id: "path9", defaultColor: "#ffffff" }, 
        { id: "path18", defaultColor: "#fbd4ab" }, 
        { id: "path21", defaultColor: "#ffff00" }, 
        { id: "path22", defaultColor: "#9ad5f3" },
        { id: "path23", defaultColor: "#50cab4" },  
        { id: "path27", defaultColor: "#fbd4ab" }, 
        { id: "path28", defaultColor: "#fbd4ab" }, 
        { id: "path29", defaultColor: "#fbd4ab" }, 
        { id: "path30", defaultColor: "#fbd4ab" },
        { id: "path31", defaultColor: "#9ad5f3" }, 
        { id: "path33", defaultColor: "#9ad5f3"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: YosinagaSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 13. まつざかせんせい
const MATUZAKA_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#016b67" }, 
        { id: "path10", defaultColor: "#000000"}, 
        { id: "path14", defaultColor: "#b86766"  }, 
        { id: "path15", defaultColor: "#fbd4ab" }, 
        { id: "path16", defaultColor: "#e7d4e7"},
        { id: "path18", defaultColor: "#fbd4ab" }, 
        { id: "path19", defaultColor: "#fbd4ab" }, 
        { id: "path24", defaultColor: "#eaa000" }, 
        { id: "path20", defaultColor: "#fbd4ab" }, 
        { id: "path21", defaultColor: "#bcc4c7" }, 
        { id: "path22", defaultColor: "#ffffff" },
        { id: "path29", defaultColor: "#b81504" },  
        { id: "path26", defaultColor: "#bcc4c7" }, 
        { id: "path30", defaultColor: "#fbd4ab" },
        { id: "path31", defaultColor: "#fbd4ab" }, 
        { id: "path32", defaultColor: "#024178"},
        { id: "path33", defaultColor: "#024178"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: MatuzakaSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 14.  上尾先生
const AGEO_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path12", defaultColor: "#50cab4" }, 
        { id: "path2", defaultColor: "#994f28"}, 
        { id: "path3", defaultColor: "#ffffff"  }, 
        { id: "path9", defaultColor: "#fbd4ab" }, 
        { id: "path10", defaultColor: "#fbd4ab" }, 
        { id: "path11", defaultColor: "#fbd4ab" }, 
        { id: "path13", defaultColor: "#fffade" }, 
        { id: "path14", defaultColor: "#fbd4ab" },
        { id: "path15", defaultColor: "#fbd4ab" }, 
        { id: "path16", defaultColor: "#ffffff"},
        { id: "path17", defaultColor: "#ffffff"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: AgeoSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

// 15. 愛ちゃん
const AI_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#994f28"},
         { id: "path3", defaultColor: "#fbd4ab"}, 
        { id: "path4", defaultColor: "#fffade" }, 
        { id: "path5", defaultColor: "#ff0000"}, 
        { id: "path13", defaultColor: "#000000"  }, 
        { id: "path14", defaultColor: "#000000" }, 
        { id: "path15", defaultColor: "#ffffff"  }, 
        { id: "path16", defaultColor: "#ffffff"  }, 
        { id: "path22", defaultColor: "#ffffff"  }, 
        { id: "path26", defaultColor: "#b81504"}, 
        { id: "path27", defaultColor: "#b81504"},
        { id: "path31", defaultColor: "#fbd4ab" }, 
        { id: "path32", defaultColor: "#fbd4ab" }, 
        { id: "path33", defaultColor: "#fbd4ab" },
        { id: "path34", defaultColor: "#fbd4ab" }, 
        { id: "path35", defaultColor: "#ffffff"},
        { id: "path36", defaultColor: "#ffffff"},
        { id: "path37", defaultColor: "#007ac5"},
        { id: "path38", defaultColor: "#007ac5"},

    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: AiSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};


// 16. 黒磯くん
const KUROISO_DATA = {
    // 🎨 塗り絵のパーツと正解色を定義
    parts: [
        { id: "path1", defaultColor: "#fbd4ab"}, 
        { id: "path2", defaultColor: "#462827" },
        { id: "path5", defaultColor: "#024178"}, 
        { id: "path12", defaultColor: "#fbd4ab"}, 
        { id: "path13", defaultColor: "#fbd4ab" }, 
        { id: "path15", defaultColor: "#000000" }, 
        { id: "path16", defaultColor: "#ffffff" }, 
        { id: "path17", defaultColor: "#007ac5" }, 
        { id: "path20", defaultColor: "#bcc4c7" },
        { id: "path21", defaultColor: "#000000" }, 
        { id: "path22", defaultColor: "#462827"},
        { id: "path23", defaultColor: "#462827"}
    ],
    // 🖼️ SVGファイルの生テキスト
    svgText: KuroisoSvgText,
    // 🔍 SVGの viewBox (みさえのものに合わせる)
    viewBox: "0 0 210 297",
};

/**
 * skin: "#fbd4ab", 
  black: "#000000",
  red: "#ff0000",
  yellow: "#ffff00",
  white: "#ffffff",
  blue: "#007ac5",
  pink: "#f4afc2",
  light_blue: "#9ad5f3",
  brown: "#994f28",
  orenge: "#eaa000",
  green: "#009758",
  purple: "#8675b4",
  gray: "#bcc4c7",
  light_green: "#a5ce5e",
  beige: "#fcd385",
  dark_blue: "#024178",
  burn_skin: "#f99d8e",
  dark_red: "#b86766",
  dark_pink: "#ea6b8c",
  dark_brown: "#462827",
  emelald_green: "#50cab4",
  light_red: "#b81504",
  dark_green: "#016b67",
  light_purple: "#e7d4e7"
  cream: "#fffade"
 */


// キャラクターIDとデータをマッピングするオブジェクト
export const CHALLENGE_DATA_MAP = {
    'sinchan': SINCHAN_DATA,
    'himawari': HIMAWARI_DATA,
    'misae': MISAE_DATA,
    'hirosi': HIROSI_DATA,
    'siro': SIRO_DATA,
    'musae': MUSAE_DATA,
    'kazama': KAZAMA_DATA,
    'nene': NENE_DATA,
    'masao': MASAO_DATA,
    'bo': BO_DATA,
    'kumityou': KUMITYOU_DATA,
    'yosinaga': YOSINAGA_DATA,
    'matuzaka': MATUZAKA_DATA,
    'ageo': AGEO_DATA,
    'ai': AI_DATA,
    'kuroiso': KUROISO_DATA,
};


// 🛠️ ユーティリティ関数: SVGテキストからパスデータを抽出する (変更なし)
export const extractPathData = (svgText) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

    const rootSvg = svgDoc.querySelector('svg');
    if (!rootSvg) {
        console.error("SVGテキスト内にルートの <svg> 要素が見つかりません。");
        return [];
    }
    
    const pathElements = rootSvg.querySelectorAll('path');

    const extractedPaths = Array.from(pathElements).map(path => ({
        id: path.id,
        d: path.getAttribute('d'),
    })).filter(path => path.d);

    return extractedPaths;
};