export default function(){
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    const resultEmptyContainer = document.createElement('div');
    resultEmptyContainer.classList.add('result-empty-container');

    return {resultContainer, resultEmptyContainer};
}