import { useState, useEffect } from 'react';
import { ConversionRecord } from '../types/history';

const HISTORY_KEY = 'file-converter-history';
const MAX_HISTORY_ITEMS = 100;

export function useConversionHistory() {
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load conversion history:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save conversion history:', error);
    }
  }, [history]);

  const addRecord = (record: Omit<ConversionRecord, 'id' | 'timestamp'>) => {
    const newRecord: ConversionRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newRecord, ...prev];
      // Keep only the most recent MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const deleteRecord = (id: string) => {
    setHistory((prev) => prev.filter((record) => record.id !== id));
  };

  return {
    history,
    addRecord,
    clearHistory,
    deleteRecord,
  };
}
