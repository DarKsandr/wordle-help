import alphabet from '../alphabet.js';

export default function(onClick, lang){
    const lettersContainer = document.createElement('div');
    lettersContainer.classList.add('letters-container');
    const lettersBtn = [];
    alphabet[lang].items.forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.innerHTML = letter;
        letterBtn.addEventListener('click', onClick);
        lettersBtn.push(letterBtn);
    });
    lettersContainer.append(...lettersBtn);

    return {lettersContainer, lettersBtn}
}