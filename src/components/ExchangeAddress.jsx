
import React, { useState, useRef } from 'react';

const CurrencySelect = ({ id, defaultValue, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  // Currency data
  const currencies = {
    popular: [
      { value: "BTC", label: "Bitcoin", network: "BTC", img: "btc", showNetwork: 0, coin: "BTC", inactive: 0, color: "#f7931a" },
      { value: "ETH", label: "Ethereum", network: "ETH", img: "eth", showNetwork: 0, coin: "ETH", inactive: 0, color: "#627eea" },
      { value: "USDT", label: "Tether (ERC20)", network: "ETH", img: "usdt", showNetwork: 1, coin: "USDT", inactive: 0, color: "#26a17b" },
      { value: "LTC", label: "Litecoin", network: "LTC", img: "ltc", showNetwork: 0, coin: "LTC", inactive: 0, color: "#b5b5b5" },
      { value: "XMR", label: "Monero", network: "XMR", img: "xmr", showNetwork: 0, coin: "XMR", inactive: 0, color: "#ff6600" }
    ],
    all: [
      { value: "ZRX", label: "0x (ERC20)", network: "ETH", img: "zrx", showNetwork: 1, coin: "ZRX", inactive: 0, color: "#302c2c" },
      { value: "AAVEETH", label: "Aave (ERC20)", network: "ETH", img: "aaveeth", showNetwork: 1, coin: "AAVE", inactive: 0, color: "#b6509e" },
      { value: "AVAX", label: "Avalanche (C-Chain)", network: "C-CHAIN", img: "avax", showNetwork: 1, coin: "AVAX", inactive: 1, color: "#e84142" },
      { value: "BNB", label: "BNB Beacon Chain (BEP2)", network: "BNB", img: "bnb", showNetwork: 0, coin: "BNB", inactive: 0, color: "#f3ba2f" }
    ]
  };

  // Find and set the initial currency based on defaultValue
  useEffect(() => {
    const allCurrencies = [...currencies.popular, ...currencies.all];
    const defaultCurrency = allCurrencies.find(c => c.value === defaultValue);
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultValue]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Handle clicking on label to show dropdown
  useEffect(() => {
    const labelElement = document.getElementById(`select_label_${id.split('_').pop()}`);
    if (labelElement) {
      const handleLabelClick = () => {
        setIsOpen(true);
      };
      
      labelElement.addEventListener('click', handleLabelClick);
      return () => {
        labelElement.removeEventListener('click', handleLabelClick);
      };
    }
  }, [id]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');  // Clear search when opening
    }
  };

  // Select a currency from the dropdown
  const handleSelectCurrency = (currency) => {
    if (currency.inactive === 1) return;
    
    setSelectedCurrency(currency);
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

  // Filter currencies based on search term
  const filteredCurrencies = {
    popular: currencies.popular.filter(currency => 
      currency.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      currency.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.coin.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    all: currencies.all.filter(currency => 
      currency.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      currency.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.coin.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  return (
    <div className="exchange-address-wrap">
      <div className="exchange-wallet active center">
        <div className="wrap-header">
          <header>Destination</header>
        </div>
        <div className="field">
          <textarea 
            className="nonextra" 
            required 
            id="receive_wallet" 
            autoComplete="off"
            value={formState.destinationAddress}
            onChange={handleAddressChange}
            ref={addressRef}
          />
          <span 
            id="receive_wallet_error" 
            className={`hint error ${addressError ? '' : 'hidden'}`}
          >
            Invalid address
          </span>
          <div className="funcbuttons">
            <button 
              type="button" 
              className="ico paste hoverhl" 
              id="wallet_paste" 
              title="Paste"
              onClick={handlePaste}
            />
            <button 
              type="button" 
              className="ico scanqr hoverhl" 
              id="wallet_scanqr" 
              title="Scan QR code" 
            />
            <button 
              type="button" 
              className="ico close hoverhl" 
              id="wallet_clear"
              onClick={handleClearAddress}
            />
          </div>
          <div className="addresss-list-wrap">
            <div 
              className="addresss-list" 
              id="wallet_addressbook" 
              data-emptylist="Favorite address is empty" 
            />
          </div>
        </div>
      </div>
      
      {/* Dropdown list */}
      {isOpen && (
        <div className="ui-select-list" style={{ position: 'absolute', zIndex: 1000, width: '100%', background: '#1e1e2f', borderRadius: '4px', marginTop: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          {/* Search box - Styled to match screenshot */}
          <div style={{ padding: '8px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #2c304e' }}>
            <div style={{ marginRight: '8px', color: '#626890' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Type a currency or ticker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{ 
                background: 'transparent', 
                border: 'none', 
                outline: 'none', 
                color: 'white', 
                width: '100%',
                fontSize: '14px',
                padding: '8px 0'
              }}
            />
          </div>
          
          {/* Currency categories */}
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {/* Popular currencies */}
            <div style={{ padding: '8px 12px', color: '#6b7a99', fontSize: '12px', fontWeight: '500' }}>
              Popular currencies
            </div>
            
            {filteredCurrencies.popular.map((currency) => (
              <div 
                key={currency.value}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 12px', 
                  cursor: currency.inactive ? 'default' : 'pointer',
                  opacity: currency.inactive ? 0.5 : 1,
                  background: selectedCurrency?.value === currency.value ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderLeft: selectedCurrency?.value === currency.value ? `2px solid ${currency.color || '#3498db'}` : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
                onClick={() => !currency.inactive && handleSelectCurrency(currency)}
              >
                <div style={{ marginRight: '12px' }}>
                  <div className={`coin-ico svgcoin ${currency.img}`} style={{ width: '24px', height: '24px' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: currency.color || 'white', fontWeight: '500' }}>
                    {currency.label}
                    {currency.showNetwork === 1 && (
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 4px', 
                        background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '2px', 
                        marginLeft: '6px'
                      }}>
                        {currency.network}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ color: '#888', fontWeight: '600', fontSize: '13px' }}>
                  {currency.coin}
                  {currency.showNetwork === 1 && (
                    <span style={{ 
                      fontSize: '9px', 
                      padding: '1px 3px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '2px',
                      marginLeft: '3px',
                      verticalAlign: 'middle'
                    }}>
                      {currency.network}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {/* All currencies */}
            <div style={{ padding: '8px 12px', color: '#6b7a99', fontSize: '12px', fontWeight: '500', borderTop: '1px solid #2c304e', marginTop: '4px' }}>
              All currencies
            </div>
            
            {filteredCurrencies.all.map((currency) => (
              <div 
                key={currency.value}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 12px', 
                  cursor: currency.inactive ? 'default' : 'pointer',
                  opacity: currency.inactive ? 0.5 : 1,
                  background: selectedCurrency?.value === currency.value ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderLeft: selectedCurrency?.value === currency.value ? `2px solid ${currency.color || '#3498db'}` : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
                onClick={() => !currency.inactive && handleSelectCurrency(currency)}
              >
                <div style={{ marginRight: '12px' }}>
                  <div className={`coin-ico svgcoin ${currency.img}`} style={{ width: '24px', height: '24px' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: currency.color || 'white', fontWeight: '500' }}>
                    {currency.label}
                    {currency.showNetwork === 1 && (
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 4px', 
                        background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '2px', 
                        marginLeft: '6px'
                      }}>
                        {currency.network}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ color: '#888', fontWeight: '600', fontSize: '13px' }}>
                  {currency.coin}
                  {currency.showNetwork === 1 && (
                    <span style={{ 
                      fontSize: '9px', 
                      padding: '1px 3px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '2px',
                      marginLeft: '3px',
                      verticalAlign: 'middle'
                    }}>
                      {currency.network}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {/* No results message */}
            {filteredCurrencies.popular.length === 0 && filteredCurrencies.all.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#6b7a99' }}>
                No currencies found
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden select element (for form compatibility) */}
      <select id={id} className="hidden" defaultValue={defaultValue}>
        <option label="separate">Popular currencies</option>
        {currencies.popular.map(currency => (
          <option 
            key={currency.value}
            value={currency.value} 
            data-img={currency.img} 
            data-network={currency.network}
            data-shownetwork={currency.showNetwork}
            data-coin={currency.coin}
            data-inactive={currency.inactive}
          >
            {currency.label}
          </option>
        ))}
        <option label="separate">All currencies</option>
        {currencies.all.map(currency => (
          <option 
            key={currency.value}
            value={currency.value} 
            data-img={currency.img} 
            data-network={currency.network}
            data-shownetwork={currency.showNetwork}
            data-coin={currency.coin}
            data-inactive={currency.inactive}
          >
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExchangeAddress;
