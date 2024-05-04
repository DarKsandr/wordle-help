import { getWords } from "./scripts/functions.js";
import getWordContainer from './scripts/containers/word-container.js';
import getResultContainer from './scripts/containers/result-container.js';
import getLettersContainer from './scripts/containers/letters-container.js';
import getFilterContainer from './scripts/containers/filter-container.js';
import getBtnContainer from './scripts/containers/btn-container.js';
import getLoaderContainer from './scripts/containers/loader-container.js';
import getSearchBtn from './scripts/buttons/search.js';
import getResetBtn from './scripts/buttons/reset.js';

(async function(){
    const app = document.getElementById('app');

    //get count
    const count = +prompt('Введите количество букв', 4);
    if(isNaN(count) || count <= 0){
        location.reload();
    }

    const {loaderContainer} = getLoaderContainer();

    app.append(loaderContainer);

    //get words
    const items = await getWords()
        .then(elememts => elememts.filter(el => el.length === count));

    if(items.length === 0){
        alert(`Слов длиной ${count} отсутствуют!`);
        location.reload();
        return;
    }

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

    const wordMainContainer = document.createElement('div');
    wordMainContainer.classList.add('word-main-container')
    wordMainContainer.append(wordContainer, filterContainer);

    loaderContainer.remove();

    app.append(
        wordMainContainer,
        filterTotalContainer,
        lettersContainer,
        ...lettersFiltersContainer,
        btnContainer,
        resultContainer,
        resultEmptyContainer
    );
})();