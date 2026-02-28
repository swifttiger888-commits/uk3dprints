import React, { useState, useEffect } from 'react';

const CACHE_KEY = 'exchangeRates';
const LOCALE_KEY = 'userCurrency';

// Basic fallback using timezone if the IP lookup fails or is blocked by adblockers
const getCurrencyFallback = () => {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes('Europe/London')) return 'GBP';
        if (tz.includes('Europe/')) return 'EUR';
        if (tz.includes('Australia/')) return 'AUD';
        if (tz.includes('America/Toronto') || tz.includes('America/Vancouver') || tz.includes('America/Montreal')) return 'CAD';
        if (tz.includes('Asia/Tokyo')) return 'JPY';
        if (tz.includes('Pacific/Auckland')) return 'NZD';
    } catch (e) { }
    return 'USD';
};

export default function LocalPrice({ basePriceString }) {
    const [price, setPrice] = useState(basePriceString);

    useEffect(() => {
        let isMounted = true;

        const convertPrice = async () => {
            try {
                // Parse the base USD price (e.g. "$22.00" -> 22.00)
                const baseValue = parseFloat(basePriceString.replace(/[^0-9.]/g, ''));
                if (isNaN(baseValue)) return;

                // 1. Determine local currency
                let userCurrency = sessionStorage.getItem(LOCALE_KEY);
                if (!userCurrency) {
                    try {
                        // Use ipapi to get the user's currency code based on IP
                        const res = await fetch('https://ipapi.co/currency/');
                        if (res.ok) {
                            userCurrency = await res.text();
                        } else {
                            userCurrency = getCurrencyFallback();
                        }
                    } catch (e) {
                        // Fallback if adblocker blocks the API
                        userCurrency = getCurrencyFallback();
                    }

                    // Basic validation just in case the API returned an error page string
                    if (!userCurrency || userCurrency.length > 3) {
                        userCurrency = 'USD';
                    }

                    sessionStorage.setItem(LOCALE_KEY, userCurrency.trim().toUpperCase());
                }

                userCurrency = userCurrency.trim().toUpperCase();

                // If they are in the US, simply format as USD and exit
                if (userCurrency === 'USD') {
                    if (isMounted) {
                        setPrice(new Intl.NumberFormat(navigator.language || 'en-US', { style: 'currency', currency: 'USD' }).format(baseValue));
                    }
                    return;
                }

                // 2. Fetch or load cached exchange rates
                let rates = JSON.parse(sessionStorage.getItem(CACHE_KEY));
                const now = Date.now();

                // Cache rates for 1 hour to prevent API spam
                if (!rates || (now - rates.timestamp) > 3600000) {
                    const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
                    if (rateRes.ok) {
                        const rateData = await rateRes.json();
                        rates = { values: rateData.rates, timestamp: now };
                        sessionStorage.setItem(CACHE_KEY, JSON.stringify(rates));
                    }
                }

                // 3. Convert and format string to user's local locale
                if (rates && rates.values) {
                    const conversionRate = rates.values[userCurrency];
                    if (conversionRate) {
                        const convertedValue = baseValue * conversionRate;
                        if (isMounted) {
                            setPrice(new Intl.NumberFormat(navigator.language || 'en-US', { style: 'currency', currency: userCurrency }).format(convertedValue));
                        }
                    }
                }

            } catch (error) {
                console.error("Currency conversion failed line", error);
            }
        };

        convertPrice();

        return () => {
            isMounted = false;
        };
    }, [basePriceString]);

    return <span>{price}</span>;
}
