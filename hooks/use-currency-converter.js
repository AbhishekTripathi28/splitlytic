import { set } from 'date-fns';
import { useEffect, useState } from 'react';

export const useCurrencyConverter = (amount, fromCurrency, toCurrency) => {
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencyRate, setCurrencyRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchConversionRate = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://v6.exchangerate-api.com/v6/f2c98994c85cc9c642367c9f/pair/${fromCurrency}/${toCurrency}/${amount}`);
            const data = await response.json();

            if (data.result === 'success') {
                console.log("currency converter --->" , data)
                setCurrencyRate(data.conversion_rate);
                setConvertedAmount(data.conversion_result);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching conversion rate:', error);
            setError(error);
        } finally{
            setLoading(false);
        }
    }


 useEffect((()=>{
    fetchConversionRate();
 }),[amount, fromCurrency, toCurrency]);

 return { convertedAmount, currencyRate, loading, error };


}