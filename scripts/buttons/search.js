import { shuffle } from "../functions.js";

export default function(items, lettersBtn, lettersFiltersBtn, count, wordInputs, resultContainer, resultEmptyContainer){
    const searchBtn = document.createElement('button');
    searchBtn.innerHTML = 'Поиск...';
    searchBtn.addEventListener('click', function(){
        const allowLetter = lettersBtn
            .filter(el => +el.dataset?.status === 1)
            .map(el => el.innerHTML);
        const disAllowLetter = lettersBtn
            .filter(el => +el.dataset?.status === 2)
            .map(el => el.innerHTML);

        const disAllowLetterFilter = [];
        for(let i = 0; i < lettersFiltersBtn.length; i++){
            const filter = lettersFiltersBtn[i]
                .filter(el => +el.dataset?.status === 1)
                .map(el => el.innerHTML);
            disAllowLetterFilter.push(filter);
        }

        const searchItems = items.filter(el => {
            for(let i = 0; i < allowLetter.length; i++){
                if(!el.includes(allowLetter[i])){
                    return false;
                }
            }
            for(let i = 0; i < disAllowLetter.length; i++){
                if(el.includes(disAllowLetter[i])){
                    return false;
                }
            }
            const splitEl = el.split('');
            for(let i = 0; i < count; i++){
                if(disAllowLetterFilter[i].includes(splitEl[i])){
                    return false;
                }

                const value = wordInputs[i].value;
                if(value && splitEl[i] !== value){
                    return false;
                }
            }
            return true;
        });
        shuffle(searchItems);

        resultContainer.innerHTML = '';
        resultEmptyContainer.innerHTML = '';
        if(searchItems.length > 0){
            resultContainer.innerHTML = searchItems.map(el => `<div>${el}</div>`).join('');
        } else {
            resultEmptyContainer.innerHTML = 'Слово не найдено';
        }
    });

    return searchBtn;
}