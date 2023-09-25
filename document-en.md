1. **Constants and Variables**:
    - **`api_key`**: Represents the API key.
    - **`url`**: Constructs the API URL.
    - **`tryRate`**, **`usdRate`**, **`eurRate`**: Variables representing different currency rates.
    - **`originalNumbers`**: Used to store the original values of prices on the page.
2. **When the Page is Ready**:
    - jQuery's **`$(document).ready()`** function checks when the page is fully loaded and runs the code inside of it.
3. **Click Handlers for Currency Conversion Buttons**:
    - There are three buttons for USD, EUR, and TRY. When these buttons are clicked, they trigger the **`getExchangeRates`** function to perform conversion based on the specified currency.
4. **Converting Strings to Numbers**:
    - The **`convertStringToNumberVal`** function fetches the prices from the DOM and converts these prices into numerical values.
5. **Fetching Currency Rates from API**:
    - The **`getExchangeRates`** function fetches current currency rates from the API for the specified target currency. On successful response from the API, the fetched currency rates are assigned to variables, and the **`convertCurrencyTo`** function is invoked.
6. **Currency Conversion**:
    - The **`convertCurrencyTo`** function converts prices based on the specified currency. The converted prices are then formatted and the DOM is updated. Additionally, information about the last converted currency and the converted values are stored in **`localStorage`**.
7. **Formatting Prices**:
    - The **`formatCurrency`** function formats the prices according to the specified currency.
8. **Updating the DOM**:
    - The **`updateDOMPrices`** function takes the converted prices and populates the respective elements on the page with them.
9. **Fetching Currency Rates on Start**:
    - Upon initial page load, the **`getExchangeRates`** function is called.
10. **Fetching Information from LocalStorage and Updating the DOM**:
- When the page loads, the last converted currency and the converted prices are retrieved from **`localStorage`**. If this information is present, the DOM is updated accordingly.
