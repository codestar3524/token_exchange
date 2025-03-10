
import React, { useState } from 'react';

const ExchangeOptions = ({ formState, updateFormState }) => {
  const [showDifferenceModal, setShowDifferenceModal] = useState(false);

  const handleExchangeTypeChange = (type) => {
    updateFormState({ exchangeType: type });
  };

  const toggleDifference = (e) => {
    e.preventDefault();
    setShowDifferenceModal(!showDifferenceModal);
  };

  const closeModal = () => {
    setShowDifferenceModal(false);
  };

  return (
    <>
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
                onChange={() => handleExchangeTypeChange('fixed')}
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
                onChange={() => handleExchangeTypeChange('float')}
              />
              <span>Float rate (0.5%)</span>
            </label>
          </div>
          <span
            id="type_difference"
            className="exchange-option-diff"
            onClick={toggleDifference}
          >
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
    </>
  );
};

export default ExchangeOptions;
