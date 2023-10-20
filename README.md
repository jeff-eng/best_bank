# Best Bank

Best Bank is a static web page to practice CSS and JavaScript principles. 

## CSS Principles
* Hover pseudoclass
* Containers
* Group selectors
* Compound selectors
* Responsive Design (including media queries)

## JS Principles:
* Spread operator
* .map(), .join(), .forEach() methods
* Module import/export
* Object destructuring
* Event: target

## Project Screenshots
![project screenshot full width](/assets/screenshot@full-width.png)
![project screenshot tablet width](/assets/screenshot@max-width743.png)
![project screenshot mobile width](/assets/screenshot@max-width370.png)
![project screenshot animation](/assets/best-bank-animation.gif)

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