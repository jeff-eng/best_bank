import accounts from './data.js';

document.getElementById('accounts-flex-container').innerHTML = renderAccountsHtml();
document.getElementById('spending-flex-container').innerHTML = renderSpendingHtml(accounts[0]);

document.addEventListener('click', (event) => {
    event.preventDefault();

    const clickedId = parseInt(event.target.dataset.id);

    if (clickedId) {
        const accountObject = accounts.find((account) => account.id === clickedId);
        document.getElementById('spending-flex-container').innerHTML = renderSpendingHtml(accountObject);
    }
});


function renderAccountsHtml() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return accounts.map((account) => {
        const { id, title, balance, } = account;
        const acctSelectedClass = title === 'Main Account' ? 'account--selected' : '';

        return `<div class="account ${acctSelectedClass}" data-id=${id}>
                    <a class="account__link" href="#" data-id=${id}>
                        <h3 class="account__heading" data-id=${id}>${title}</h3>
                        <p class="account__amount" data-id=${id}>${formatter.format(balance)}</p>
                    </a>
                </div>`;
    }).join('');
}

function renderSpendingHtml(account) {
    const spendings = account.spendings;
    
    if (spendings.length) {
        return spendings.map((spendingCategory) => {
            const {category, spent} = spendingCategory;
    
            return `<article class="spending-category">
                        <h3 class="spending-category__heading">${category}</h3>
                        <p class="spending-category__amount">$${spent}</p>
                    </article>`;
        }).join('');
    } else {
        return `<p>Nothing to display</p>`;
    }
}

