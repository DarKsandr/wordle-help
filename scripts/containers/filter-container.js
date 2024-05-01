import getLettersContainer from './letters-container.js';

export default function(count, lettersContainer){
    const lettersFiltersContainer = [];
    const lettersFiltersBtn = [];

    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');
    for(let i = 0; i < count; i++){
        const btn = document.createElement('button');
        btn.innerHTML = 'Ред.';

        const letterFilter = getLettersContainer(function(){
            const status = this.dataset.status ?? 0;
            this.classList.remove('disable');
            const newStatus = +status + 1 > 1 ? 0 : +status + 1;
            this.dataset.status = newStatus;
            switch(newStatus){
                case 1:
                    this.classList.add('disable');
                    break;
            }
        });
        letterFilter.lettersContainer.classList.add('hidden');
        
        btn.addEventListener('click', function(){
            filterContainer.classList.add('hidden');
            filterTotalContainer.classList.remove('hidden');
            lettersContainer.classList.add('hidden');
            letterFilter.lettersContainer.classList.remove('hidden');
        });
        filterContainer.append(btn);
        lettersFiltersContainer.push(letterFilter.lettersContainer);
        lettersFiltersBtn.push(letterFilter.lettersBtn);
    }

    const filterTotalContainer = document.createElement('div');
    filterTotalContainer.classList.add('filter-total-container', 'hidden');
    const filterTotalContainerBtn = document.createElement('button');
    filterTotalContainerBtn.innerHTML = 'Общее ред.';
    filterTotalContainerBtn.addEventListener('click', function(){
        filterTotalContainer.classList.add('hidden');
        filterContainer.classList.remove('hidden');
        lettersContainer.classList.remove('hidden');
        lettersFiltersContainer.forEach(el => {
            el.classList.add('hidden')
        });
    });
    filterTotalContainer.append(filterTotalContainerBtn);

    return {filterContainer, filterTotalContainer, lettersFiltersContainer, lettersFiltersBtn};
}