import React from 'react';
import Header from '@/components/Header';
import MainBackground from '@/components/MainBackground';

const Layout = ({ children }) => {
    return (
        <main>
            <section className="main-section withheader darkbg">
                <Header />
                <div className="wrIndexer">
                    <MainBackground />
                    <div className="wrapper">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Layout;