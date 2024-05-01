export default function (count){
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('word-container');
    const wordInputs = [];
    for(let i = 0; i < count; i++){
        const input = document.createElement('input');
        input.type = 'text';
        input.addEventListener('input', function(){
            this.value = this.value.slice(0, 1).toLowerCase();
        });
        wordInputs.push(input);
    }
    wordContainer.append(...wordInputs);

    return {wordContainer, wordInputs};
}
