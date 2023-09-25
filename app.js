const api_key = '2fd3aed3d28864ffe612f4db';
const url = 'https://v6.exchangerate-api.com/v6/' + api_key;
let tryRate, usdRate, eurRate;
let originalNumbers;

$(document).ready(function () {
  $('#usd').on('click', function () {
    getExchangeRates('USD');
  });

  $('#eur').on('click', function () {
    getExchangeRates('EUR');
  });

  $('#tl').on('click', function () {
    getExchangeRates('TRY');
  });

  $('#usd, #eur, #tl').on('click', function () {
    $('p.price').hide();

    $('.loading-icon').show();

    getExchangeRates($(this).attr('id').toUpperCase());
  });

  function convertStringToNumberVal() {
    const pTags = $('p.price');
    const numbers = pTags
      .map(function () {
        let text = $(this).text();
        text = text.replace(/\./g, '');
        text = text.replace(/,/g, '.');
        text = text.replace(/,/, '');
        return parseFloat(text);
      })
      .get();
    return numbers;
  }

  originalNumbers = convertStringToNumberVal();

  function getExchangeRates(targetCurrency) {
    $('.loading-icon').show();
    $.ajax({
      url: url + '/latest/' + targetCurrency,
      type: 'GET',
      success: function (data) {
        let exchangeRates = data.conversion_rates;
        tryRate = exchangeRates.TRY;
        usdRate = exchangeRates.USD;
        eurRate = exchangeRates.EUR;
        convertCurrencyTo(targetCurrency);
        $('.loading-icon').hide();
        $('p.price').show();
      },
      error: function (error) {
        console.error('API Hatası:', error);
        $('.loading-icon').hide();
        $('p.price').show();
      },
    });
  }

  function convertCurrencyTo(currencyCode) {
    let converted = originalNumbers.map(function (number) {
      let convertedAmount;

      switch (currencyCode) {
        case 'USD':
          convertedAmount = (number / tryRate) * usdRate;
          break;
        case 'EUR':
          convertedAmount = (number / tryRate) * eurRate;
          break;
        case 'TRY':
          convertedAmount = number / tryRate;
          break;
        default:
          return 'Geçersiz para birimi kodu';
      }
      // Sonucu para birimi formatına çevir
      let formattedAmount = formatCurrency(convertedAmount, currencyCode);
      return formattedAmount;
    });
    updateDOMPrices(converted, currencyCode);
    localStorage.setItem('lastConvertedCurrency', currencyCode);
    localStorage.setItem('lastConvertedPrices', JSON.stringify(converted));
  }

  function formatCurrency(amount, currencyCode) {
    let formattedAmount = amount.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (currencyCode === 'TRY') {
      formattedAmount = formattedAmount + '₺';
    } else if (currencyCode === 'USD') {
      formattedAmount = '$' + formattedAmount;
    } else if (currencyCode === 'EUR') {
      formattedAmount = '£' + formattedAmount;
    } else {
      formattedAmount = currencyCode + formattedAmount;
    }

    return formattedAmount;
  }

  function updateDOMPrices(prices) {
    const pTags = $('p.price');
    pTags.each(function (index) {
      $(this).text(prices[index]);
    });
  }
  // Döviz kurlarını al
  getExchangeRates();

  const lastConvertedCurrency = localStorage.getItem('lastConvertedCurrency');
  const lastConvertedPrices = JSON.parse(
    localStorage.getItem('lastConvertedPrices')
  );

  if (lastConvertedCurrency && lastConvertedPrices) {
    updateDOMPrices(lastConvertedPrices, lastConvertedCurrency);
  }
});
