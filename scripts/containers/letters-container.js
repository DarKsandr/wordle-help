import ALPHABET from '../alphabet.js';

export default function(onClick){
    const lettersContainer = document.createElement('div');
    lettersContainer.classList.add('letters-container');
    const lettersBtn = [];
    ALPHABET.forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.innerHTML = letter;
        letterBtn.addEventListener('click', onClick);
        lettersBtn.push(letterBtn);
    });
    lettersContainer.append(...lettersBtn);

    return {lettersContainer, lettersBtn}
}