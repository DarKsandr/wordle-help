import { getWords } from '../api.js';
import getLoaderContainer from '../containers/loader-container.js';
import getErrorContainer from '../containers/error-container.js';
import getWordContainer from '../containers/word-container.js';
import getLettersContainer from '../containers/letters-container.js';
import getFilterContainer from '../containers/filter-container.js';
import getResultContainer from '../containers/result-container.js';
import getBtnContainer from '../containers/btn-container.js';
import getSearchBtn from '../buttons/search.js';
import getResetBtn from '../buttons/reset.js';

export default async function(app, count, lang){
    const {loaderContainer} = getLoaderContainer();

    app.append(loaderContainer);

    //get words
    let items = [];
    try {
        items = await getWords(lang)
            .then(elememts => elememts.filter(el => el.length === count));
    } catch (error) {
        console.error(error);
        loaderContainer.remove();
        const {errorContainer} = getErrorContainer('Ошибка загрузки словаря.<br/> Попробуйте позже.');
        app.append(errorContainer);
        return;
    }

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
    }, lang);

    //init filter letter word
    const {filterContainer, filterTotalContainer, lettersFiltersContainer, lettersFiltersBtn} = getFilterContainer(count, lettersContainer, lang);

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
}