import accounts from './data.js';

document.getElementById('accounts-flex-container').innerHTML = renderAccountsHtml();
document.getElementById('spendings').insertAdjacentHTML('beforeend', renderSpendingsHtml(accounts[0]));

// Event listener(s)
document.addEventListener('click', (event) => {
    const clickedId = parseInt(event.target.dataset.id);

    if (clickedId) {
        const accountsDivEls = document.getElementsByClassName('account');

        // Remove highlighted styling of selected account
        for (const accountsDivEl of accountsDivEls) {
            accountsDivEl.classList.remove('account--selected');        
        }

        // Add back styling to the selected account
        document.getElementById(`${clickedId}`).classList.toggle('account--selected');
        
        // Render Spendings Categories
        const accountObject = accounts.find((account) => account.id === clickedId);
        const spendingFlexContainer = document.getElementById('spending-flex-container');
        spendingFlexContainer.innerHTML = renderSpendingsHtml(accountObject);
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
        const spendingsCategoriesHtml = spendings.map((spendingCategory) => {
            const {category, spent} = spendingCategory;
    
            return `<article class="spending-category">
                        <h3 class="spending-category__heading">${category}</h3>
                        <p class="spending-category__amount">$${spent}</p>
                    </article>`;
        }).join('');

        return `<div class="spending-container expand" id="spending-flex-container">${spendingsCategoriesHtml}</div>`;
    } else {
        return '<p class="center">No Details Available</p>';
    }
}