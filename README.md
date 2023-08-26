# Best Bank
Best Bank project's purpose is practicing CSS principles such as:
* Hover pseudoclass
* Containers
* Group selectors
* Compound selectors

![Best Bank Project Screenshot]()

## Conventions
* BEM (Block__Element--Modifier) naming convention for CSS classes
    * _Block_: `account`
    * _Element_: `heading`
    * _Modifier_: `active`
    * _**Example**_:
        ```
        <div class="account">
            <h3 class="account__heading">Main Account</h3>
            <p class="account__amount--active">$1,234.56</p>
        </div>
        <div class="account">
            <h3 class="account__heading">Rainy Day Fund</h3>
            <p class="account__amount">$432.10</p>
        </div>
        ```  