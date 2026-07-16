import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { walletService } from '../services/walletService';
import type { Transaction } from '../types';

export const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTxs = async () => {
      const list = await walletService.getTransactions();
      setTxs(list);
    };
    fetchTxs();
  }, []);

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in pb-10">
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/wallet')} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">Transaction History</span>
      </div>

      {/* Transactions list */}
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/5">
        {txs.length === 0 ? (
          <div className="p-12 text-center text-xs text-on-surface-variant/30 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-3xl">receipt_long</span>
            <span>No transactions recorded yet</span>
          </div>
        ) : (
          txs.map((tx) => {
            const isDeposit = tx.type === 'deposit';
            const isFee = tx.type === 'entry_fee';
            const sign = isDeposit ? '+' : '-';
            const amtColor = isDeposit ? 'text-primary' : 'text-white/80';
            const icon = isDeposit ? 'arrow_downward' : isFee ? 'sports_esports' : 'arrow_upward';

            return (
              <div key={tx.id} className="flex justify-between items-center p-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#201F20] border border-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant/80 text-sm">
                      {icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {tx.type === 'deposit' && 'Deposited Funds'}
                      {tx.type === 'entry_fee' && 'Tournament Entry Fee'}
                      {tx.type === 'withdrawal' && 'Cash Out Withdrawal'}
                      {tx.type === 'prize' && 'Tournament Prize Won'}
                    </p>
                    <p className="text-[9px] text-on-surface-variant/40 mt-0.5">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-sm italic font-display-lg ${amtColor}`}>
                    {sign}₹{tx.amount}
                  </p>
                  <span className="px-2.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[8px] font-label-caps uppercase mt-1 inline-block">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
