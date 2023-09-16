import accounts from './data.js';
import { generateAccountsHtml, renderSpendingsBars } from './functions.js';

// Dynamically render page content
document.getElementById('accounts-flex-container').innerHTML = generateAccountsHtml(accounts);
renderSpendingsBars(accounts, accounts[0].id);

// Event listener(s)
document.addEventListener('click', (event) => {
    const clickedId = parseInt(event.target.dataset.id);
    const isAcctSelected = event.target.parentElement.classList.contains('account--selected');

    if (clickedId && !isAcctSelected) {
        const accountDivEls = document.getElementsByClassName('account');

        // Remove highlighted styling of selected account
        for (const divEl of accountDivEls) {
            divEl.classList.remove('account--selected');        
        }
        // Add back styling to the selected account
        document.getElementById(`account${clickedId}`).classList.add('account--selected');

        renderSpendingsBars(accounts, clickedId);
    }
});