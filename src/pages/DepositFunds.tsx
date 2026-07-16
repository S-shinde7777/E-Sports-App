import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const DepositFunds: React.FC = () => {
  const navigate = useNavigate();
  const { depositMoney } = useApp();
  const [amount, setAmount] = useState('100');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const presets = ['50', '100', '250', '500'];

  const handleDeposit = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }
    setIsProcessing(true);

    try {
      await depositMoney(value);
      setSuccess(true);
      setTimeout(() => {
        navigate('/wallet');
      }, 1500);
    } catch (e) {
      alert('Deposit failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in pb-10">
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/wallet')} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">Add Funds</span>
      </div>

      {success ? (
        <div className="glass-card rounded-2xl p-8 text-center flex flex-col items-center gap-4 py-16">
          <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center animate-bounce">
            <span className="material-symbols-outlined text-primary text-3xl font-black">check</span>
          </div>
          <div className="space-y-1">
            <h3 className="font-headline-sm text-lg text-white">Payment Successful</h3>
            <p className="text-on-surface-variant/60 text-xs">₹{amount} added to your Nexus wallet balance.</p>
          </div>
          <p className="text-[10px] text-on-surface-variant/30 font-label-caps uppercase animate-pulse">Redirecting to wallet...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Amount input box */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <label className="text-[10px] font-label-caps text-on-surface-variant/50 uppercase tracking-widest block text-center">
              Enter Deposit Amount (₹)
            </label>
            <div className="relative flex items-center justify-center">
              <span className="text-3xl font-black text-primary mr-1 italic font-display-lg">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-48 bg-transparent text-center text-3xl font-black text-white focus:outline-none placeholder-white/20 select-all border-b border-white/5 pb-2"
                placeholder="0"
                required
              />
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {presets.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-2 text-center text-xs font-semibold rounded-xl border transition-all ${
                    amount === val
                      ? 'bg-primary-container text-on-primary-fixed border-primary shadow-[0_0_8px_rgba(255,107,0,0.2)]'
                      : 'bg-white/5 border-white/5 text-on-surface-variant/80 hover:bg-white/10'
                  }`}
                >
                  +₹{val}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Gateways Option */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-xs font-bold text-white/50 uppercase tracking-wider">
              Select Payment Method
            </h4>
            <div className="glass-card rounded-2xl p-4 divide-y divide-white/5 border border-white/5">
              <div className="flex justify-between items-center py-3 cursor-pointer select-none">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">qr_code_2</span>
                  <div className="text-xs">
                    <p className="font-semibold text-white">Instant UPI (Paytm / PhonePe)</p>
                    <p className="text-[10px] text-on-surface-variant/40">Zero transaction charge</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-sm font-black">radio_button_checked</span>
              </div>
              <div className="flex justify-between items-center py-3 cursor-not-allowed opacity-50 select-none">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant/70 text-xl">credit_card</span>
                  <div className="text-xs">
                    <p className="font-semibold text-white/80">Credit / Debit Card</p>
                    <p className="text-[10px] text-on-surface-variant/40">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 text-sm">radio_button_unchecked</span>
              </div>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={handleDeposit}
            disabled={isProcessing}
            className="w-full h-12 bg-primary-container text-on-primary-fixed rounded-xl font-bold text-sm tracking-wide neon-glow-primary active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            {isProcessing ? (
              'Authenticating UPI transaction...'
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Pay Now • ₹{amount}
              </>
            )}
          </button>
          
          <p className="text-[9px] text-center text-on-surface-variant/30 leading-relaxed px-4">
            This is a mock sandbox environment. Confirming payments will instantly update your balance in localStorage for testing purposes.
          </p>
        </div>
      )}
    </div>
  );
};
