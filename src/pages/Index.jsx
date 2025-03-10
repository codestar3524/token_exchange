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
          <MainBackground />
          <div className="wrIndexer">
            <div className="exchange-form-outer">
              <h1>Payrius Exchange</h1>
              <ExchangeForm />
            </div>
            <template id="difference_tmpl" />
            <template id="popup_warning_fee" />
            <template id="popup_forbidden_usa" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;