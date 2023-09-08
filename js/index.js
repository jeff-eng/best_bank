import accounts from './data.js';

document.getElementById('accounts-flex-container').innerHTML = renderAccountsHtml();
document.getElementById('spending-flex-container');

function renderAccountsHtml() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return accounts.map((account) => {
        const { title, balance } = account;
        const acctSelectedClass = title === 'Main Account' ? 'account--selected' : '';

        return `<div class="account ${acctSelectedClass}">
                    <a class="account__link" href="#">
                        <h3 class="account__heading">${title}</h3>
                        <p class="account__amount">${formatter.format(balance)}</p>
                    </a>
                </div>`;
    }).join('');
}