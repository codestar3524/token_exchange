import React, { useState, useEffect } from 'react';
import ExchangeAmounts from './ExchangeAmounts';
// import ExchangeAddress from './ExchangeAddress';
// import ExchangeOptions from './ExchangeOptions';

const ExchangeForm = () => {
  // Initial form state
  const [formState, setFormState] = useState({
    fromCurrency: { value: "ETH", label: "Ethereum", network: "ETH", img: "eth", showNetwork: 0, coin: "ETH" },
    toCurrency: { value: "LTC", label: "Litecoin", network: "LTC", img: "ltc", showNetwork: 0, coin: "LTC" },
    fromAmount: '',
    toAmount: '',
    destinationAddress: '',
    destinationTag: '',
    exchangeType: 'float', // 'float' or 'fixed'
    exchangeRate: 20.687412, // Example fixed rate
    isValid: false
  });

  // Handler for updating form state
  const updateFormState = (updates) => {
    setFormState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Update exchange rate when currencies change
  useEffect(() => {
    if (formState.fromCurrency && formState.toCurrency) {
      const mockRates = {
        BTC: { ETH: 15.2, LTC: 165.8, XMR: 212.5 },
        ETH: { BTC: 0.065, LTC: 20.687412, XMR: 14 },
        LTC: { BTC: 0.006, ETH: 0.0476345, XMR: 1.28 },
        XMR: { BTC: 0.0047, ETH: 0.072, LTC: 0.78 }
      };

      let rate;
      const fromCoin = formState.fromCurrency.coin;
      const toCoin = formState.toCurrency.coin;

      if (fromCoin === toCoin) {
        rate = 1; // Same coin, possibly different networks
      } else if (mockRates[fromCoin] && mockRates[fromCoin][toCoin]) {
        rate = mockRates[fromCoin][toCoin];
      } else if (mockRates[toCoin] && mockRates[toCoin][fromCoin]) {
        rate = 1 / mockRates[toCoin][fromCoin];
      } else {
        rate = 1; // Fallback
      }

      updateFormState({ exchangeRate: rate });

      // Recalculate amounts if needed
      if (formState.fromAmount) {
        updateFormState({
          toAmount: (parseFloat(formState.fromAmount) * rate).toFixed(8)
        });
      }
    }
  }, [formState.fromCurrency, formState.toCurrency]);

  // Validate form
  useEffect(() => {
    const isValid =
      formState.fromAmount > 0 &&
      formState.toAmount > 0 &&
      formState.destinationAddress.length > 10 &&
      formState.fromCurrency.value !== formState.toCurrency.value;

    updateFormState({ isValid });
  }, [
    formState.fromAmount,
    formState.toAmount,
    formState.destinationAddress,
    formState.fromCurrency,
    formState.toCurrency
  ]);

  // Swap currencies and amounts
  const handleSwapCurrencies = () => {
    updateFormState({
      fromCurrency: formState.toCurrency,
      toCurrency: formState.fromCurrency,
      fromAmount: formState.toAmount,
      toAmount: formState.fromAmount
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.isValid) return;

    console.log("Exchange submitted:", formState);
    // Here you would typically send to an API
  };

  return (
    <form className="exchange-form" onSubmit={handleSubmit}>
      <ExchangeAmounts
        formState={formState}
        updateFormState={updateFormState}
        handleSwapCurrencies={handleSwapCurrencies}
      />

      <div className="exchange-address-wrap">
        <div className="exchange-wallet active center">
          <div className="wrap-header text-left">
            Destination
          </div>
          <div className="field">
            <textarea
              className="nonextra hidden"
              type="text"
              id="receive_wallet_hidden"
              autoComplete="off"
            ></textarea>
            <textarea
              className="nonextra"
              type="text"
              required
              id="receive_wallet"
              autoComplete="off"
              value={formState.destinationAddress}
              onChange={(e) => updateFormState({ destinationAddress: e.target.value })}
              placeholder={`Your ${formState.toCurrency.label} address`}
              style={{ height: '51px' }}
            ></textarea>
            <span id="receive_wallet_error" className="hint error">
              {formState.destinationAddress.length > 0 && formState.destinationAddress.length < 10 && "Invalid address"}
            </span>
            <div className="funcbuttons">
              <button
                type="button"
                className="ico paste hoverhl"
                id="wallet_paste"
                title="Paste"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    updateFormState({ destinationAddress: text });
                  } catch (err) {
                    console.error("Failed to read clipboard");
                  }
                }}
              ></button>
              <button
                type="button"
                className="ico scanqr hoverhl"
                id="wallet_scanqr"
                title="Scan QR code"
              ></button>
              <button
                type="button"
                className="ico close hoverhl"
                id="wallet_clear"
                onClick={() => updateFormState({ destinationAddress: '' })}
              ></button>
            </div>
            <div className="addresss-list-wrap">
              <div
                className="addresss-list"
                id="wallet_addressbook"
                data-emptylist="Favorite address is empty"
                style={{ paddingRight: '0px', width: 'calc(100% + 0px)' }}
              ></div>
              <div className="ui-select-scroll-wrap hidden" data-height="100">
                <div className="ui-select-scroll" style={{ top: '0px', height: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tag field shown for certain currencies */}
        <div
          className={`exchange-wallet exchange-wallet-extra center ${['XRP', 'XLM', 'BNB', 'EOS', 'ATOM', 'TON'].includes(formState.toCurrency.coin) ? '' : 'hidden'}`}
          id="wallet_extra_outer"
        >
          <div className="wrap-header">
            {formState.toCurrency?.coin === 'XRP' ? 'Destination Tag' : 'Memo'} (optional)
          </div>
          <div className="field">
            <input
              className="nonextra"
              type="text"
              value={formState.destinationTag}
              required
              id="receive_extraid"
              autoComplete="off"
              onChange={(e) => updateFormState({ destinationTag: e.target.value })}
            />
            <span id="receive_extraid_error" className="hint error hidden">Invalid</span>
            <div className="funcbuttons">
              <button
                type="button"
                className="ico paste hoverhl"
                id="extraid_paste"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    updateFormState({ destinationTag: text });
                  } catch (err) {
                    console.error("Failed to read clipboard");
                  }
                }}
              ></button>
              <button
                type="button"
                className="ico close hoverhl"
                id="extraid_clear"
                onClick={() => updateFormState({ destinationTag: '' })}
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div className="exchange-wrapflex">
        <div className="exchange-option">
        <p>Order type</p>
          <div className="exchange-option-inner">
            <label className="radioselect">
              <input
                type="radio"
                name="select_type_from"
                value="fixed"
                id="fixed_type"
                checked={formState.exchangeType === 'fixed'}
                onChange={() => updateFormState({ exchangeType: 'fixed' })}
              />
              <span>Fixed rate (1.0%)</span>
            </label>
            <label className="radioselect">
              <input
                type="radio"
                name="select_type_from"
                value="float"
                id="float_type"
                checked={formState.exchangeType === 'float'}
                onChange={() => updateFormState({ exchangeType: 'float' })}
              />
              <span>Float rate (0.5%)</span>
            </label>
          </div>
          <span id="type_difference" className="exchange-option-diff">
            <div className="exchange-option-diff-inner">
              <i>?</i>
              <font>What is the difference?</font>
            </div>
          </span>
        </div>

          <button
            id="exchange_submit"
            className={`exchange-submit ${!formState.isValid ? 'disabled' : ''}`}
            disabled={!formState.isValid}
            type="submit"
          >
            <span>Exchange now</span>
          </button>
      </div>

      <div className="exchange-terms">
        The exchange service is provided by{" "}
        <a href="https://ff.io/?ref=9zedgxed">FixedFloat</a>. Creating an
        order confirms your agreement with the{" "}
        <a href="https://ff.io/?ref=9zedgxed">FixedFloat</a> rules.
      </div>
      <div className="exchange-terms">
        By using the site and creating an exchange, you agree to the
        Payrius'{" "}
        <a href="#terms-of-service">Terms of Services</a> and{" "}
        <a href="#privacy-policy">Privacy Policy.</a>
      </div>
    </form>
  );
};

export default ExchangeForm;