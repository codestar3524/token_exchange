import React from "react";

const FloatModal = ({ active, closeModal }) => {
    return (
        <>
            <div className={`popup foreground ${active ? 'active' : ''} pr-4`} onClick={closeModal}>
                <div className="popup-bg" />
                <div className="popup-wrap">
                    <div className="popup-content popup-full-mobile">
                        <div className="popup-close" onClick={closeModal}/>
                        <h3>What is the difference between fixed and a float rates?</h3>
                        <div className="exchange-different-faq">
                            <h3 className="mb-1">
                                <b>Fixed rate</b>
                            </h3>
                            <p className="mb-1">
                                Opting for a fixed rate, you get the price you see at the point of
                                initiating a transaction.
                            </p>
                            <ul className="list">
                                <li>Pay just 1% + network fee.</li>
                                <li>Rates freeze for 10 minutes.</li>
                                <li>
                                    If the market rate changes by more than 1.2%{" "}
                                    <span>
                                        before the appearance of your transaction on the blockchain
                                        network
                                    </span>
                                    , you will be asked to make a refund or continue exchanging at the
                                    market rate.
                                </li>
                            </ul>
                            <p>
                                <em>
                                    Attention! Your transaction must be received within 10 minutes and
                                    the amount must exactly match the amount of the order. Otherwise,
                                    you will be prompted to make a refund or continue the exchange at
                                    the market rate.
                                </em>
                            </p>
                            <h3 className="mb-1 mt-6">
                                <b>Float rate</b>
                            </h3>
                            <p>
                                The exchange rate is finally set when your transaction receives the
                                necessary number of blockchain network confirmations. If the market
                                goes up, you will get more cryptocurrency, if down - less. All fair.
                            </p>
                            <ul className="list">
                                <li>Pay just 0.5% + network fee.</li>
                                <li>
                                    The exchange will be made at the market rate, which is finally set
                                    within 10 minutes after your transaction receives the required
                                    number of confirmations in the blockchain network.
                                </li>
                            </ul>
                            <p className="faq-exchange-example">
                                <strong>Example</strong>: you are exchanging 1 BTC for 28.37362388
                                ETH. With a <strong>fixed</strong> rate, you will receive exactly
                                28.37362388 ETH. With a <strong>float</strong>&nbsp;exchange rate, the
                                amount of ETH can change both up and down. It depends on changes in
                                the market rate.
                            </p>
                        </div>
                        <div className="popup-ctrl">
                            <button className="btn submit popup-close-btn bghl" onClick={closeModal}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FloatModal;