document.addEventListener('DOMContentLoaded', function() {
  var investmentAmountInput = document.getElementById('investmentAmount');
  var investmentRangeInput = document.getElementById('investmentRange');
  var interestContainer = document.getElementById('interestContainer');
  var totalInvestmentOutput = document.getElementById('totalInvestment');
  var currencySelect = document.getElementById('currencySelect');
  var currencyIcon = document.getElementById('currencyIcon');
// Get the range input and the tooltip element
const rangeInput = document.getElementById("investmentRange");
const rangeTooltip = document.getElementById("rangeTooltip");

// Display initial tooltip value
rangeTooltip.textContent = rangeInput.value;

// Update tooltip value on range input change
rangeInput.addEventListener("input", function() {
  rangeTooltip.textContent = this.value;
});

  // Pre-fill the input with default value
  investmentAmountInput.value = "10,000";

  function calculate() {
    var amount = parseFloat(investmentAmountInput.value.replace(/,/g, ''));
    var rate = 1.35; // 1.35% interest per month
    var months = parseInt(investmentRangeInput.value); // Get the selected range value

    var interestHTML = '';
    var totalProfit = amount; // Initialize total profit variable

    for (var i = 1; i <= months; i++) {
      var interest = totalProfit * (rate / 100);
      totalProfit += interest;

      if (i === parseInt(investmentRangeInput.value)) {
        interestHTML += `${interest.toFixed(3)} ${currencySelect.value}</p>`;
      }
    }

    // Update the result display elements
    interestContainer.innerHTML = interestHTML;
    totalInvestmentOutput.textContent = (totalProfit - amount).toFixed(3) + ` ${currencySelect.value}`;
  }

  function formatCurrencyInput() {
    var value = investmentAmountInput.value.replaceAll(',', '');
    // Restrict the input to 6 digits
    value = value.slice(0, 6);
    var formattedValue = Number(value).toLocaleString('en-US');
    investmentAmountInput.value = formattedValue;
  }

  // Calculate when the button is clicked
  document.getElementById('calculateButton').addEventListener('click', calculate);

  // Calculate when the input or range value changes
  investmentAmountInput.addEventListener('input', calculate);
  investmentRangeInput.addEventListener('input', calculate);

  investmentAmountInput.addEventListener('input', function() {
    setTimeout(formatCurrencyInput, 10);
  });
  

  function updateCurrencySymbol() {
    var selectedCurrency = currencySelect.value;
    var currencySymbol = '';

    switch (selectedCurrency) {
      case 'btc':
        currencySymbol = '₿';
        break;
      case 'usdt':
        currencySymbol = '$';
        break;
      case 'eth':
        currencySymbol = 'Ξ';
        break;
      case 'busd':
        currencySymbol = 'BUSD';
        break;
      case 'sol':
        currencySymbol = 'SOL';
        break;
      case 'ada':
        currencySymbol = 'ADA';
        break;
      case 'link':
        currencySymbol = 'LINK';
        break;
      case 'bnb':
        currencySymbol = 'BNB';
        break;
      case 'near':
        currencySymbol = 'NEAR';
        break;
      case 'matic':
        currencySymbol = 'MATIC';
        break;
      case 'xrp':
        currencySymbol = 'XRP';
        break;
      case 'dot':
        currencySymbol = 'DOT';
        break;
      default:
        currencySymbol = '';
        break;
    }

    investmentAmountInput.setAttribute('data-currency-symbol', currencySymbol);
    updateCurrencyInput();
  }

  function updateCurrencyInput() {
    var currencySymbol = investmentAmountInput.getAttribute('data-currency-symbol');
    investmentAmountInput.setAttribute('placeholder', 'Enter amount in ' + currencySymbol);
  }

  currencySelect.addEventListener('change', function() {
    updateCurrencySymbol();
    currencyIcon.style.display = "none"; // Hide currency icon
  });

  investmentRangeInput.addEventListener('input', function() {
    if (investmentAmountInput.value === "") {
      interestContainer.innerHTML = "";
      totalInvestmentOutput.textContent = "0";
    } else {
      calculate();
    }
  });

  // Initial update
  updateCurrencySymbol();
});
