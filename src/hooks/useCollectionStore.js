// src/hooks/useCollectionStore.js

import { useState } from 'react';
// 🚨 useEffect は不要ですが、App.jsxで import されているため、そのままにしておきます。
// import { useState, useEffect } from 'react';

const STORAGE_KEY = 'crayonShinchanCollection';

// Local Storageからデータを同期的に取得するヘルパー関数
const getInitialCollection = () => {
  try {
    const savedCollection = localStorage.getItem(STORAGE_KEY);
    // ゲット回数を格納するオブジェクトを初期値とする (配列ではない)
    if (savedCollection) {
      // 🚨 以前の配列データが残っていた場合を考慮し、JSON.parseの結果がオブジェクトでない場合は初期化
      const data = JSON.parse(savedCollection);
      if (typeof data !== 'object' || Array.isArray(data) || data === null) {
        console.warn("Detected old or invalid collection format. Initializing new map.");
        return {}; 
      }
      return data; // オブジェクト形式でロード
    }
    return {}; // 初期値は空のオブジェクト
  } catch (error) {
    console.error("Error accessing local storage:", error);
    return {}; 
  }
};

/**
 * コレクションの状態管理と永続化を行うカスタムフック
 */
export const useCollectionStore = () => {
  // 1. unlockedCards の名前を collectionMap に変更し、オブジェクトで初期化
  const [collectionMap, setCollectionMap] = useState(getInitialCollection);

  // 2. 🎯 修正: 新しいカードをコレクションに追加/回数をインクリメントするアクション
  const unlockCard = (characterId) => {
    // setCollectionMap は、App.jsxの handleChallengeCompleteAndShowModal で呼び出されます。
    
    // 現在の回数を取得し、1回インクリメントする
    const currentCount = collectionMap[characterId] || 0;
    const newCount = currentCount + 1;
    
    const newMap = { 
        ...collectionMap,
        [characterId]: newCount
    };
    
    // StateとLocal Storageを更新
    setCollectionMap(newMap);
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    } catch (error) {
        console.error("Error saving new card to local storage:", error);
    }
    
    // 処理後のクリア回数を返すと、App.jsx側で新規ゲットの判定に役立ちます
    return newCount; 
  };
  
  // 3. 特定のカードがゲット済みか確認するヘルパー関数 (回数 > 0 で判定)
  const isCardUnlocked = (characterId) => {
    return (collectionMap[characterId] || 0) > 0;
  };

  // 4. 🎯 新規追加: 特定のカードのクリア回数を取得する関数
  const getClearCount = (characterId) => {
    return collectionMap[characterId] || 0;
  };

  return { 
    collectionMap, 
    unlockCard, 
    isCardUnlocked,
    getClearCount, // 新しい関数を追加
  };
};