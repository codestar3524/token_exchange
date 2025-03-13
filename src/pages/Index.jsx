import React from 'react';
import ExchangeForm from '@/components/ExchangeForm';

const Index = () => {
  return (
      <div className="exchange-form-outer">
        <div className="flex items-center justify-center mb-3">
          <div className="coin-container">
            <div className="scene">
              <div className="coin">
                <div className="coin-front"></div>
                <div className="coin-back"></div>
                <div className="coin-edge" id="edge"></div>
              </div>
            </div>
          </div>
          <h2 className='mb-0 text-3xl'>Payrius Exchange</h2>
        </div>
        <ExchangeForm />
      </div>
  );
};

export default Index;