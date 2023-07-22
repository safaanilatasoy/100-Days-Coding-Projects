"use strict";

var fromCur = document.querySelector(".from select");
var toCur = document.querySelector(".to select");
var getBtn = document.querySelector("form button");
var exIcon = document.querySelector("form .reverse");
var amount = document.querySelector("form input");
var exRateTxt = document.querySelector("form .result"); // Event listener for currency dropdowns (select)

[fromCur, toCur].forEach(function (select, i) {
  for (var curCode in Country_List) {
    var selected = i === 0 && curCode === "USD" || i === 1 && curCode === "GBP" ? "selected" : "";
    select.insertAdjacentHTML("beforeend", "<option value=\"".concat(curCode, "\" ").concat(selected, ">").concat(curCode, "</option>"));
  }

  select.addEventListener("change", function () {
    var code = select.value;
    var imgTag = select.parentElement.querySelector("img");
    imgTag.src = "https://flagcdn.com/48x36/".concat(Country_List[code].toLowerCase(), ".png");
  });
}); // Fucntion to fetch exchange rate from API

function getExchangeRate() {
  var amountVal, response, result, exchangeRate, totalExRate;
  return regeneratorRuntime.async(function getExchangeRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          amountVal = amount.value || 1;
          exRateTxt.innerText = "Getting exchange rate...";
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("https://v6.exchangerate-api.com/v6/24115f5b62fc2b1be83c060f/latest/".concat(fromCur.value)));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context.sent;
          exchangeRate = result.conversion_rates[toCur.value];
          totalExRate = (amountVal * exchangeRate).toFixed(2);
          exRateTxt.innerText = "".concat(amountVal, " ").concat(fromCur.value, " = ").concat(totalExRate, " ").concat(toCur.value);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          exRateTxt.innerText = "Something went wrong. Please try again later.";

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
} // Event Listener for button and exchange icon click


window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getExchangeRate();
});
exIcon.addEventListener("click", function () {
  var _ref = [toCur.value, fromCur.value];
  fromCur.value = _ref[0];
  toCur.value = _ref[1];
  [fromCur, toCur].forEach(function (select) {
    var code = select.value;
    var imgTag = select.parentElement.querySelector("img");
    imgTag.src = "https://flagcdn.com/48x36/".concat(Country_List[code].toLowerCase(), ".png");
  });
  getExchangeRate();
});