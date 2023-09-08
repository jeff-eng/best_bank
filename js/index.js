import accounts from './data.js';

document.getElementById('accounts-flex-container').innerHTML = renderAccountsHtml();
document.getElementById('spending-flex-container').innerHTML = renderSpendingsHtml(accounts[0]);

// Event listener(s)
document.addEventListener('click', (event) => {
    const clickedId = parseInt(event.target.dataset.id);
    const accountsDivEls = document.getElementsByClassName('account');

    for (const accountsDivEl of accountsDivEls) {
        accountsDivEl.classList.remove('account--selected');        
    }

    if (clickedId) {
        document.getElementById(`${clickedId}`).classList.toggle('account--selected');
        const accountObject = accounts.find((account) => account.id === clickedId);
        document.getElementById('spending-flex-container').innerHTML = renderSpendingsHtml(accountObject);
    }
});

// Functions to render HTML
function renderAccountsHtml() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return accounts.map((account) => {
        const { id, title, balance, } = account;
        const acctSelectedClass = title === 'Main Account' ? 'account--selected' : '';

        return `<div class="account ${acctSelectedClass}" data-id=${id} id=${id}>
                    <article class="account__link" data-id=${id}>
                        <h3 class="account__heading" data-id=${id}>${title}</h3>
                        <p class="account__amount" data-id=${id}>${formatter.format(balance)}</p>
                    </article>
                </div>`;
    }).join('');
}

function renderSpendingsHtml(account) {
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
        return `<p class="center">No Details Available</p>`;
    }
}