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
              {/* <h1>Payrius Exchange</h1> */}
              <ExchangeForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;