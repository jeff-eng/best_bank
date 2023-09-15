function renderSpendingsBars(accounts, clickedAccountId) {
    const accountObject = accounts.find((account) => account.id === clickedAccountId);
    const spendingsFlexContainer = document.getElementById('spendings-flex-container');
    const noDetailsHeading = document.getElementById('no-details-heading');

    if (spendingsFlexContainer) {
        spendingsFlexContainer.remove();
    } else if (noDetailsHeading) {
        noDetailsHeading.remove();
    }

    document.getElementById('spendings').insertAdjacentHTML('beforeend', generateSpendingsHtml(accountObject));

    const spendingsByAccount = accountObject.spendings.map((spendingItem) => {
        return parseInt(spendingItem.spent);
    });
    const maxVal = Math.max(...spendingsByAccount);

    spendingsByAccount.forEach((spendingAmt, index) => {
        const spendingId = `spending-category-${index}`;
        const percentString = `${calculateSpendingBarPercentageWidth(spendingAmt, maxVal)}%`;
        document.getElementById(spendingId).style.width = percentString;
    });
}

function calculateSpendingBarPercentageWidth(spendingCatVal, highestVal) {
    // 33% is min width of spending bar as % of container (after subtracting out padding)
    // 59% is max remaining width; 59 is multiplied by ratio of category val to largest spending category val
    return 33 + ((spendingCatVal / highestVal) * 59);
}

// Functions to render HTML
function generateAccountsHtml(accounts) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return accounts.map((account) => {
        const { id, title, balance, } = account;
        const acctSelectedClass = title === 'Main Account' ? 'account--selected' : '';

        return `<div class="account ${acctSelectedClass}" data-id="${id}" id="account${id}">
                    <article class="account__link" data-id="${id}">
                        <h3 class="account__heading" data-id="${id}">${title}</h3>
                        <p class="account__amount" data-id="${id}">${formatter.format(balance)}</p>
                    </article>
                </div>`;
    }).join('');
}

function generateSpendingsHtml(account) {
    const spendings = account.spendings;
    
    if (spendings.length) {
        const spendingsCategoriesHtml = spendings.map((spendingsCategory, index) => {
            const {category, spent} = spendingsCategory;
        
            return `<article class="spendings-category" id="spending-category-${index}">
                        <h3 class="spendings-category__heading">${category}</h3>
                        <p class="spendings-category__amount">$${spent}</p>
                    </article>`;
        }).join('');
        
        return `<div class="spendings-container expand" id="spendings-flex-container">${spendingsCategoriesHtml}</div>`;
    } else {
        return '<h2 class="center-text" id="no-details-heading">No Details Available</h2>';
    }
}

export { generateAccountsHtml, renderSpendingsBars };