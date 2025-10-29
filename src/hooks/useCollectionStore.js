// src/hooks/useCollectionStore.js

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'crayonShinchanCollection';

// Local Storageからデータを同期的に取得するヘルパー関数 (変更なし)
const getInitialCollection = () => {
  try {
    const savedCollection = localStorage.getItem(STORAGE_KEY);
    if (savedCollection) {
      return JSON.parse(savedCollection);
    }
    return [];
  } catch (error) {
    console.error("Error accessing local storage:", error);
    return []; 
  }
};

/**
 * コレクションの状態管理と永続化を行うカスタムフック
 */
export const useCollectionStore = () => {
  // 1. useState の初期化関数として getInitialCollection を使用 (変更なし)
  const [unlockedCards, setUnlockedCards] = useState(getInitialCollection);

  // 2. unlockedCardsが更新されるたびにLocal Storageに保存する (この useEffect は削除して、unlockCardに統合します)
  // 🚨 以前の useEffect は削除してください！ (このコードでは既に削除されています)

  // 4. 🎯 修正: 新しいカードをコレクションに追加するアクション
  const unlockCard = (characterId) => {
    setUnlockedCards(prevCards => {
      // 既にコレクションにあるか確認
      if (!prevCards.includes(characterId)) {
        const newCards = [...prevCards, characterId];
        
        // 🎯 最重要修正点: State 変更後に Local Storage にも即座に保存する
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
        } catch (error) {
            console.error("Error saving new card to local storage:", error);
        }
        
        return newCards; // 新しい配列を State に設定
      }
      // 既に持っていた場合はStateを更新しない
      return prevCards;
    });
  };
  
  // 5. 特定のカードがゲット済みか確認するヘルパー関数 (変更なし)
  const isCardUnlocked = (characterId) => {
    return unlockedCards.includes(characterId);
  };

  

  return { 
    unlockedCards, 
    unlockCard, 
    isCardUnlocked 
  };
};