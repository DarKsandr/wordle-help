import { getWords } from "./scripts/api.js";
import getLoaderContainer from './scripts/containers/loader-container.js';
import getErrorContainer from './scripts/containers/error-container.js';

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
    let items = [];
    try {
        items = await getWords()
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

    //import modules
    const [
        {default: getWordContainer},
        {default: getLettersContainer},
        {default: getFilterContainer},
        {default: getResultContainer},
        {default: getBtnContainer},
        {default: getSearchBtn},
        {default: getResetBtn},
    ] = await Promise.all([
        import('./scripts/containers/word-container.js'),
        import('./scripts/containers/letters-container.js'),
        import('./scripts/containers/filter-container.js'),
        import('./scripts/containers/result-container.js'),
        import('./scripts/containers/btn-container.js'),
        import('./scripts/buttons/search.js'),
        import('./scripts/buttons/reset.js'),
    ]);

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