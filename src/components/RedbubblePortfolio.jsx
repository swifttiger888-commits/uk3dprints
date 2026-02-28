import React, { useEffect } from 'react';

export default function RedbubblePortfolio() {
    useEffect(() => {
        // Check if the external script is already loaded to avoid duplicates
        let script = document.getElementById('rb-portfolio-script');

        if (!script) {
            script = document.createElement('script');
            script.id = 'rb-portfolio-script';
            script.src = 'https://www.redbubble.com/assets/external_portfolio.js';
            script.async = true;
            document.body.appendChild(script);
        }

        const initPortfolio = () => {
            const container = document.getElementById('rb-portfolio-container');
            if (container && !document.getElementById('rb-xzfcxvzx')) {
                const initScript = document.createElement('script');
                initScript.id = 'rb-xzfcxvzx';
                initScript.innerHTML = `new RBExternalPortfolio("www.redbubble.com", "nightgrainco").renderIframe(5, 5);`;
                container.appendChild(initScript);
            }
        };

        if (script.readyState) {  // For older IE or specific browser states
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    initPortfolio();
                }
            };
        } else {  // Modern browsers
            script.onload = () => {
                initPortfolio();
            };
        }

        // Call conditionally if script was already added and loaded
        if (typeof window.RBExternalPortfolio !== 'undefined') {
            initPortfolio();
        }

    }, []);

    return (
        <section className="py-16 bg-brand-bg w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                <div
                    className="w-full max-w-5xl bg-brand-bg p-8 flex flex-col items-center relative overflow-hidden"
                    style={{
                        border: '4px solid #333333',
                        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                        boxShadow: '4px 6px 0px rgba(51, 51, 51, 0.1)'
                    }}
                >
                    <div className="flex w-full items-center justify-center mb-6">
                        <h3 className="text-2xl font-bold text-brand-text tracking-wide uppercase relative" style={{ fontFamily: "Comic Sans MS, 'Chalkboard SE', cursive, sans-serif" }}>
                            My Portfolio
                        </h3>
                    </div>

                    <div id="rb-portfolio-container" className="w-full min-h-[600px] flex justify-center items-center">
                        {/* The Redbubble inline script & iframe will render here */}
                    </div>
                </div>
            </div>
        </section>
    );
}
