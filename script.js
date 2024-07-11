const cashInput = document.getElementById('cash');
const displayChangeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const displayCid = document.getElementById('cashdrawer');
const price = 19.5;

const cid = [
  ['PENNY', 0.01],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
];

document.getElementById('price').innerHTML = `<strong>Price:</strong> ${price.toFixed(2)}`;

const displayCashInDrawer = () => {
  displayCid.innerHTML = `<h4>Cash in Drawer:</h4>${cid.map(([denomination, amount]) => `${denomination}: $${amount.toFixed(2)} <br>`).reverse().join('')}`;
};
