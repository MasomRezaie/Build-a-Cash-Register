const cashInput = document.getElementById('cash');
const displayChangeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const displayCid = document.getElementById('cashdrawer');
const price = 19.5;

const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

document.getElementById('price').innerHTML = `<strong>Price:</strong> ${price.toFixed(2)}`;

const displayCashInDrawer = () => {
  displayCid.innerHTML = `<h4>Cash in Drawer:</h4>${cid.map(([denomination, amount]) => `${denomination}: $${amount.toFixed(2)} <br>`).reverse().join('')}`;
};

const calculateChange = (cash) => {
  const change = Number((cash - price).toFixed(2));
  const totalCid = Number(cid.reduce((total, [, amount]) => total + amount, 0).toFixed(2));

  if (change > totalCid) {
    return { status: 'INSUFFICIENT_FUNDS', change: 0 };
  }

  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const denominationNames = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];
  const changeArr = [];
  const cidCopy = [...cid];

  for (let i = 0; i < denominations.length; i += 1) {
    let totalDenom = 0;
    while (change >= denominations[i] && cidCopy[cidCopy.length - 1 - i][1] > 0) {
      cidCopy[cidCopy.length - 1 - i][1] = Number(
      (cidCopy[cidCopy.length - 1 - i][1] - denominations[i]).toFixed(2)
    );
      change = Number((change - denominations[i]).toFixed(2));
      totalDenom += denominations[i];
    }
    if (totalDenom > 0) {
      changeArr.push([denominationNames[i], totalDenom]);
    }
  }

  if (change > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: 0 };
  }

  const remainingCid = cidCopy.reduce((total, [, amount]) => total + amount, 0);
  const status = remainingCid === 0 ? 'CLOSED' : 'OPEN';

  return { status, change: changeArr };
};

const checkRegister = () => {
  const cashInt = parseFloat(cashInput.value);

  if (cashInt < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  if (cashInt === price) {
    displayChangeDue.innerText = 'No change due - customer paid with exact cash';
    return;
  }

  if (cashInput.value !== '') {
    const { status, change } = calculateChange(cashInt);

    if (status === 'INSUFFICIENT_FUNDS') {
      displayChangeDue.innerText = 'Status: INSUFFICIENT_FUNDS';
    } else {
      displayChangeDue.innerHTML = `Status: <b>${status}</b> <br><br>${change.map(([denomination, amount]) => `<b>${denomination}</b>: $${amount.toFixed(2)} <br>`).join(' ')}`;
      cid = status === 'CLOSED' ? cid.map(([denomination]) => [denomination, 0]) : calculateChange(cashInt).change;
    }
  }
  displayCashInDrawer();
};

window.onload = displayCashInDrawer;
purchaseBtn.addEventListener('click', checkRegister);
document.addEventListener('DOMContentLoaded', () => {
  cashInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkRegister();
    }
  });
});
