import { getWords } from "./functions.js";
import getWordContainer from './containers/word-container.js';
import getResultContainer from './containers/result-container.js';
import getLettersContainer from './containers/letters-container.js';
import getFilterContainer from './containers/filter-container.js';
import getBtnContainer from './containers/btn-container.js';
import getSearchBtn from './buttons/search.js';
import getResetBtn from './buttons/reset.js';

(async function(){
    const app = document.getElementById('app');

    //get count
    const count = +prompt('Введите количество букв', 4);
    if(isNaN(count) || count <= 0){
        location.reload();
    }

    //get words
    const items = await getWords()
        .then(elememts => elememts.filter(el => el.length === count));

    //init input word
    const {wordContainer, wordInputs} = getWordContainer(count);

    //init letters
    const {lettersContainer, lettersBtn} = getLettersContainer(function(){
        const status = this.dataset.status ?? 0;
        this.classList.remove('enable', 'disable');
        const newStatus = +status + 1 > 2 ? 0 : +status + 1;
        this.dataset.status = newStatus;
        switch(newStatus){
            case 1:
                this.classList.add('enable');
                break;
            case 2:
                this.classList.add('disable');
                break;
        }
    });

    //init filter letter word
    const {filterContainer, filterTotalContainer, lettersFiltersContainer, lettersFiltersBtn} = getFilterContainer(count, lettersContainer);

    const {resultContainer, resultEmptyContainer} = getResultContainer();

    //init btn
    const {btnContainer} = getBtnContainer();

    const searchBtn = getSearchBtn(items, lettersBtn, lettersFiltersBtn, count, wordInputs, resultContainer, resultEmptyContainer);

    const resetBtn = getResetBtn();

    btnContainer.append(searchBtn, resetBtn);

    app.append(wordContainer);
    app.append(filterContainer);
    app.append(filterTotalContainer);
    app.append(lettersContainer);
    app.append(...lettersFiltersContainer);
    app.append(btnContainer);
    app.append(resultContainer);
    app.append(resultEmptyContainer);
})();