import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { walletService } from '../services/walletService';
import type { Transaction } from '../types';

export const WalletDashboard: React.FC = () => {
  const { user } = useApp();
  const [txs, setTxs] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTxs = async () => {
      const list = await walletService.getTransactions();
      setTxs(list);
    };
    fetchTxs();
  }, [user?.walletBalance]);

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="font-display-lg text-xl font-black text-white uppercase">Nexus Wallet</h2>
        <p className="text-on-surface-variant/60 text-xs">Manage your funds and payouts securely</p>
      </div>

      {/* Balance Card */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
        {/* Background glow */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div>
          <span className="material-symbols-outlined text-primary text-3xl mb-1">
            account_balance_wallet
          </span>
          <p className="text-[10px] font-label-caps text-on-surface-variant/40 uppercase tracking-widest">
            Available Balance
          </p>
          <p className="text-3xl font-black text-white italic font-display-lg drop-shadow-[0_0_10px_rgba(255,182,147,0.3)] mt-1">
            ₹{user?.walletBalance || 0}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <button 
            onClick={() => navigate('/deposit')}
            className="flex-1 bg-primary-container text-on-primary-fixed h-11 rounded-xl font-bold text-xs neon-glow-primary active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span> Add Funds
          </button>
          <button 
            className="flex-1 bg-white/5 border border-white/5 text-white h-11 rounded-xl font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1 hover:bg-white/10"
            onClick={() => alert('Withdrawal feature is ready. Enter bank details once real backend is connected.')}
          >
            <span className="material-symbols-outlined text-sm">payment</span> Withdraw
          </button>
        </div>
      </div>

      {/* Recent Transactions List */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-xs font-bold text-white/70 uppercase tracking-wider">
            Recent Transactions
          </h3>
          <span 
            className="text-secondary-container font-label-caps text-[10px] uppercase cursor-pointer hover:underline"
            onClick={() => navigate('/transactions')}
          >
            View All
          </span>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/5">
          {txs.length === 0 ? (
            <div className="p-8 text-center text-xs text-on-surface-variant/30">
              No transactions recorded yet
            </div>
          ) : (
            txs.slice(0, 3).map((tx) => {
              const isDeposit = tx.type === 'deposit';
              const isFee = tx.type === 'entry_fee';
              const sign = isDeposit ? '+' : '-';
              const amtColor = isDeposit ? 'text-primary' : 'text-white/80';
              const icon = isDeposit ? 'arrow_downward' : isFee ? 'sports_esports' : 'arrow_upward';

              return (
                <div key={tx.id} className="flex justify-between items-center p-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant/80 text-sm">
                        {icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {tx.type === 'deposit' && 'Deposited Funds'}
                        {tx.type === 'entry_fee' && 'Tournament Entry'}
                        {tx.type === 'withdrawal' && 'Withdrew Cash'}
                        {tx.type === 'prize' && 'Tournament Payout'}
                      </p>
                      <p className="text-[9px] text-on-surface-variant/40 mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${amtColor}`}>
                      {sign}₹{tx.amount}
                    </p>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[8px] font-label-caps uppercase mt-1 inline-block">
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
