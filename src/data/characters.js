// src/data/characters.js

// 💡 塗り絵チャレンジに対応するコンポーネント名を定義。
//    App.jsx で動的にインポート・参照するために使います。

const characters = [
  // --- 1. 野原しんのすけ ---
  {
    id: 'sinchan', // 内部で使用する一意の識別子（ファイル名などと一致させると管理しやすい）
    name: 'しんのすけ',
    furigana: 'しんのすけ',
    anime: 'クレヨンしんちゃん',
    rarity: 'family', // レアリティを設定しておくと、コレクションの楽しさが増します
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'ShinchanColoring', 
    
    // ゲット前のカード画像（未解禁時の「？」画像）
    lockedImageUrl: 'assets/cards/locked.png', 
    
    // ゲット後のカード画像（コレクション表示用）
    unlockedImageUrl: 'assets/cards/sinchan_card.png', 
    description: 'キレイなおねいさんと「アクション仮面」が大好き。色んな人を巻き込んでは、騒動を巻き起こすことも。ひたすらお気楽マイペースな嵐を呼ぶ５歳児！'
  },

  // --- 2. 野原ひまわり ---
  {
    id: 'himawari',
    name: 'ひまわり',
    furigana: 'ひまわり',
    anime: 'クレヨンしんちゃん',
    rarity: 'family',
    
    // 🎯 対応するゲームコンポーネント名（後ほど HimawariColoring.jsx を作成します）
    challengeComponent: 'HimawariColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/himawari_card.png', 
    description: '好奇心旺盛で、元気いっぱいの０歳児。ハイハイでどこへでも行ってしまう。きらきら光るアクセサリーや、イケメンが大好き。'
  },

  // --- 3. 野原みさえ ---
  {
    id: 'misae',
    name: '野原みさえ',
    furigana: 'のはらみさえ',
    anime: 'クレヨンしんちゃん',
    rarity: 'family',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'MisaeColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/misae_card.png', 
    description: '元気なしんのすけやひまわりの子育てに奮闘する力強いかーちゃん。成功しないダイエットと昼寝が趣味！ケチで見栄っ張りだけど、根は優しい。'
  },

  // --- 4. 野原ひろし ---
  {
    id: 'hirosi',
    name: '野原ひろし',
    furigana: 'のはらひろし',
    anime: 'クレヨンしんちゃん',
    rarity: 'family',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'HirosiColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/hirosi_card.png', 
    description: '家族思いの優しいとーちゃん。双葉商事で働くサラリーマン。妻のみさえには逆らえない。足が臭いのが特徴!?武器になるほどすごいらしい。'
  },

  // --- 5. シロ ---
  {
    id: 'siro',
    name: 'シロ',
    furigana: 'しろ',
    anime: 'クレヨンしんちゃん',
    rarity: 'family',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'SiroColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/siro_card.png', 
    description: 'しんのすけが拾ってきたオスの雑種犬で、野原家の愛犬。しんのすけとは友達のような関係。実は家族で一番しっかり者!?'
  },

  // --- 6. むさえ ---
  {
    id: 'musae',
    name: 'むさえ',
    furigana: 'むさえ',
    anime: 'クレヨンしんちゃん',
    rarity: 'family',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'MusaeColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/musae_card.png', 
    description: 'みさえの妹。バラクーダ写真スタジオで働くカメラマン。面倒くさがり屋で子どもっぽい性格。'
  },

  // --- 7. 風間くん ---
  {
    id: 'kazama',
    name: '風間くん',
    furigana: 'かざまくん',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'KazamaColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/kazama_card.png', 
    description: '５歳児とは思えないほどの知識を持つ、エリート志向の自信家。マイペースなしんのすけにいつもイライラさせられているが、実はかなり仲がいい。'
  },

  // --- 8. ネネちゃん ---
  {
    id: 'nene',
    name: 'ネネちゃん',
    furigana: 'ねねちゃん',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'NeneColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/nene_card.png', 
    description: 'ウワサ話が大好きなおませな女の子。昼ドラのような凝った設定のリアルおままごとが趣味。'
  },

  // --- 9. マサオくん ---
  {
    id: 'masao',
    name: 'マサオくん',
    furigana: 'まさおくん',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'MasaoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/masao_card.png', 
    description: '気が弱く、泣き虫でいじられキャラの男の子。将来はマンガ家になるのが夢。'
  },

    // --- 10. ボーちゃん --- 
    {
    id: 'bo',
    name: 'ボーちゃん',
    furigana: 'ぼーちゃん',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'BoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/bo_card.png', 
    description: 'いつも鼻水をたらしてボーっとしている男の子だが、いざとなると一番頼りになる。珍しい石をコレクションしている。'
  },

  // --- 11. 園長先生 --- 
    {
    id: 'kumityou',
    name: '園長先生',
    furigana: 'えんちょうせんせい',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'KumityouColoring', 
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/kumityou_card.png', 
    description: 'ふたば幼稚園の園長先生。見た目はコワモテだけど真面目でとっても優しい。組長じゃないよ、園長だよ。'
  },

  // --- 12. よしなが先生 --- 
    {
    id: 'yosinaga',
    name: 'よしなが先生',
    furigana: 'よしながせんせい',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'YosinagaColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/yosinaga_card.png', 
    description: '明るく優しいひまわり組の担任の先生。まつざか先生とはよくケンカするけど本当は仲良し。実は演歌が好き。'
  },

  // --- 13. まつざか先生 --- 
    {
    id: 'matuzaka',
    name: 'まつざか先生',
    furigana: 'まつざかせんせい',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'MatuzakaColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/matuzaka_card.png', 
    description: 'イケイケでプライドが高いばら組の担任の先生。お酒とブランド品が大好き。名前は「梅」'
  },

  // --- 14. 上尾先生 --- 
    {
    id: 'ageo',
    name: '上尾先生',
    furigana: 'あげおせんせい',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'AgeoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/ageo_card.png', 
    description: '内気なさくら組の担任の先生。眼鏡を外すと大胆になり、本音を大声で言う。ツチノコや宇宙人に興味がある。'
  },

  // --- 15. あいちゃん --- 
    {
    id: 'ai',
    name: 'あいちゃん',
    furigana: 'あいちゃん',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'AiColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/ai_card.png', 
    description: 'お金持ちの女の子。ボディーガードの黒磯がいつもついている。自分になびかないしんのすけを好きになる。'
  },

  // --- 16. 黒磯 --- 
    {
    id: 'kuroiso',
    name: '黒磯',
    furigana: 'くろいそ',
    anime: 'クレヨンしんちゃん',
    rarity: 'kindergarten',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'KuroisoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/kuroiso_card.png', 
    description: '酢乙女あいのボディーガード。あいに危険が迫ったときは身を挺して守るプロ中のプロである。'
  },

  // --- 17. ななこ --- 
    {
    id: 'nanako',
    name: 'ななこ',
    furigana: 'ななこ',
    anime: 'クレヨンしんちゃん',
    rarity: 'neighborhood',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'NanakoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/nanako_card.png', 
    description: 'しんのすけが大好きな女子大生のお姉さん。ご近所のアパート「メゾン・ド・黒トカゲ」に住んでいる。父はベストセラー作家の大原四十郎。'
  },

  // --- 18. 隣のおばさん --- 
    {
    id: 'obasan',
    name: '隣のおばさん',
    furigana: 'となりのおばさん',
    anime: 'クレヨンしんちゃん',
    rarity: 'neighborhood',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'ObasanColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/obasan_card.png', 
    description: '野原家の隣に住んでいる北本さん。ウワサ話が好きでみさえやひろしのことをよくネタにしている。実は英語が話せる。甥っ子はアメリカ人のロベルト。'
  },

  // --- 19. ミッチー&ヨシりん --- 
    {
    id: 'yosimiti',
    name: 'ミッチー&ヨシりん',
    furigana: 'みっちーあんどよしりん',
    anime: 'クレヨンしんちゃん',
    rarity: 'neighborhood',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'YosimitiColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/yosimiti_card.png', 
    description: '野原家のご近所に住むラブラブな新婚さん。ハートのTシャツはペアルック。'
  },

  // --- 20. 四郎 --- 
    {
    id: 'yonrou',
    name: '四郎',
    furigana: 'よんろう',
    anime: 'クレヨンしんちゃん',
    rarity: 'neighborhood',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'YonrouColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/yonrou_card.png', 
    description: 'またずれ荘の住人。名前の通り四浪しかけたが、現在は東京カスカビアン産業大学に通う大学生。'
  },

  // --- 21. 埼玉紅さそり隊 --- 
    {
    id: 'benisasori',
    name: '埼玉紅さそり隊',
    furigana: 'さいたまべにさそりたい',
    anime: 'クレヨンしんちゃん',
    rarity: 'neighborhood',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'BenisasoriColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/benisasori_card.png', 
    description: '高校三年生のスケ番グループ。メンバーはしんのすけに師匠と尊敬されているリーダーのふかづめ竜子、魚の目お銀、ふきでものマリー。登場シーンでは必ずポーズをとる。売られたケンカは絶対に買う。'
  },

  // --- 22. アクション仮面 --- 
    {
    id: 'akusyon',
    name: 'アクション仮面',
    furigana: 'あくしょんかめん',
    anime: 'クレヨンしんちゃん',
    rarity: 'hero',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'AkusyonColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/akusyon_card.png', 
    description: 'テレビ番組のヒーロー。勝利のときは手を挙げ、「ワッハハハハハ！」と高らかに笑う。しんのすけの憧れの存在。'
  },

  // --- 23. 桜ミミ子 --- 
    {
    id: 'mimiko',
    name: '桜ミミ子',
    furigana: 'さくらみみこ',
    anime: 'クレヨンしんちゃん',
    rarity: 'hero',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'MimikoColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/mimiko_card.png', 
    description: 'アクション仮面のパートナー。セーラー服姿とお団子ヘアが特徴。'
  },

  // --- 23. ぶりぶりざえもん --- 
    {
    id: 'buriburi',
    name: 'ぶりぶりざえもん',
    furigana: 'ぶりぶりざえもん',
    anime: 'クレヨンしんちゃん',
    rarity: 'hero',
    
    // 🎯 対応するゲームコンポーネント名
    challengeComponent: 'BuriburiColoring', 
    
    lockedImageUrl: 'assets/cards/locked.png', 
    unlockedImageUrl: 'assets/cards/buriburi_card.png', 
    description: '救いのマラカスを振ると現れるブタのヒーロー。ピンチのときは味方を平気で裏切り、弱そうな相手には強気にでる。紫タイツにちとせあめを装備している。「お助け料１億万円！ローンも可！」'
  },














  
];

export default characters;