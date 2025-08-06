import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  // Sample exchange rates (in a real app, you'd fetch these from an API)
  const rates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.4, CAD: 1.47, AUD: 1.59 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150.7, CAD: 1.71, AUD: 1.85 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0066, CAD: 0.011, AUD: 0.012 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.0, AUD: 1.08 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.5, CAD: 0.93 }
  };

  useEffect(() => {
    setExchangeRates(rates);
  }, []);

  useEffect(() => {
    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } else if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  return (
    <div className="App">
      <div className="converter-container">
        <h1>Currency Converter</h1>
        
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        <div className="currency-selectors">
          <div className="currency-selector">
            <label>From:</label>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <button className="swap-btn" onClick={swapCurrencies}>
            ⇄
          </button>

          <div className="currency-selector">
            <label>To:</label>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="result">
          <h2>Result:</h2>
          <div className="converted-amount">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
          {fromCurrency !== toCurrency && (
            <div className="rate-info">
              1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency] || 0} {toCurrency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 