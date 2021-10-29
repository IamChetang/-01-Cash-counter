'use strict';

const billAmount = document.getElementById('bill-amount');
const amountPaid = document.getElementById('amount-paid');
const btnCalculate = document.getElementById('btn-calculate');
const errorMessage = document.getElementById('error-message');
const showChange = document.getElementById('success');
const successMessage = document.getElementById('success-message');
const showDenomination = document.getElementById('denomination');

const denominator = [2000, 500, 200, 100, 20, 10, 5, 1];
let denominatorCount = [];

// Functions
const showErrorMessage = function (message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
};

const showSuccess = function (message) {
  showChange.style.display = 'block';
  successMessage.textContent = message;
};

const calculateChange = function (change) {
  for (let i = 0; i < denominator.length; i++) {
    denominatorCount.push(Math.trunc(change / denominator[i]));
    change = change % denominator[i];
  }
};

const updateDom = function () {
  let ul = document.createElement('ul');
  ul.classList = 'denomination';
  showChange.appendChild(ul);
  denominator.forEach(function (denomination, index) {
    let li = document.createElement('li');
    li.classList = 'list-item';
    ul.appendChild(li);
    li.innerHTML += `<p class = "value">₹${denomination}</p><p class = "count">${denominatorCount[index]}</p>`;
  });
};

function cashRegister() {
  let billValue = +billAmount.value;
  let paidValue = +amountPaid.value;
  let change = paidValue - billValue;
  if (billValue > 0 && paidValue > 0) {
    showSuccess(`Your balance is ₹${change}`);
    calculateChange(change);
    updateDom();
  } else {
    showErrorMessage('Enter valid Bill and Amount');
  }
}
// Event Listeners
btnCalculate.addEventListener('click', cashRegister);
