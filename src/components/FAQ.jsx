import React, { useState } from 'react';

const FAQ = ({ faqs }) => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <span className="faq-badge">Frequently Asked Questions</span>
                <h2 className="faq-title">
                    Your Questions <br />
                    <span className="elegant-serif">Answered!</span>
                </h2>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`faq-item ${openFaq === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <div className="faq-icon-circle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="#7D40FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(FAQ);
