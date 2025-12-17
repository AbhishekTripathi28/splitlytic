"use client";

import { useState, useCallback } from "react";
import { useCurrencyConverter } from "./use-currency-converter";

export function useCurrencyReducer(defaultCurrency = "USD") {
  const convertCurrency = useCurrencyConverter();
  const [isConverting, setIsConverting] = useState(false);

  const convertToDefaultCurrency = useCallback(
    async (currencyData) => {
      try {
        setIsConverting(true);

        // currencyData format: { "USD": 100, "EUR": 50, ... }
        // Returns: { converted: { "USD": 100, "EUR": 58.5 }, total: 158.5 }

        if (!currencyData || Object.keys(currencyData).length === 0) {
          return { converted: {}, total: 0 };
        }

        const convertedData = {};
        let totalAmount = 0;

        for (const [currency, amount] of Object.entries(currencyData)) {
          if (currency === defaultCurrency) {
            convertedData[currency] = amount;
            totalAmount += amount;
          } else {
            // Convert to default currency
            const convertedAmount = await convertCurrency(
              amount,
              currency,
              defaultCurrency
            );
            convertedData[currency] = convertedAmount;
            totalAmount += convertedAmount;
          }
        }

        return {
          converted: convertedData,
          total: Math.round(totalAmount * 100) / 100, // Round to 2 decimals
        };
      } catch (error) {
        console.error("Error converting currencies:", error);
        return { converted: currencyData, total: 0 };
      } finally {
        setIsConverting(false);
      }
    },
    [convertCurrency, defaultCurrency]
  );

  return { convertToDefaultCurrency, isConverting };
}