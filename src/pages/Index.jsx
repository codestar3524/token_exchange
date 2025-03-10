import React from 'react';
import Header from '@/components/Header';
import MainBackground from '@/components/MainBackground';
import ExchangeForm from '@/components/ExchangeForm';

const Index = () => {
  return (
    <>
      <main>
        <section id="index_main" className="main-section withheader darkbg">
          <Header />
          <div className="wrIndexer">
            <MainBackground />
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
                <h2 className='mb-0'>Payrius Exchange</h2>

              </div>
              <ExchangeForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;