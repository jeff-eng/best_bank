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
        const spendingsSection = document.getElementById('spendings');
        const spendingsFlexContainer = document.getElementById('spendings-flex-container');
        const noDetailsHeading = document.getElementById('no-details-paragraph');
        
        // Remove the content in spendings container before rendering new content
        if (spendingsFlexContainer) {
            spendingsFlexContainer.remove();
        } else if (noDetailsHeading) {
            noDetailsHeading.remove();
        }

        spendingsSection.insertAdjacentHTML('beforeend', renderSpendingsHtml(accountObject));
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
        const spendingsCategoriesHtml = spendings.map((spendingsCategory) => {
            const {category, spent} = spendingsCategory;
    
            return `<article class="spendings-category">
                        <h3 class="spendings-category__heading">${category}</h3>
                        <p class="spendings-category__amount">$${spent}</p>
                    </article>`;
        }).join('');

        return `<div class="spendings-container expand" id="spendings-flex-container">${spendingsCategoriesHtml}</div>`;
    } else {
        return '<h2 class="center-text" id="no-details-paragraph">No Details Available</h2>';
    }
}