import alphabet from '../alphabet.js'

export default function(app){
    return new Promise(resolve => {
        //init form
        const form = document.createElement('form');
        form.classList.add('home-screen--form');
        form.addEventListener('submit', function(event){
            event.preventDefault();
            const data = new FormData(this);

            resolve({
                count: data.get('count'), 
                lang: data.get('lang')
            });
        });

        //init langs
        const langContainer = document.createElement('div');
        const langText = document.createElement('div');
        langText.classList.add('title');
        langText.innerHTML = 'Выберите язык для поиска слова';
        langContainer.append(langText);
        Object.keys(alphabet).forEach(key => {
            const label = document.createElement('label');
            label.innerHTML = alphabet[key].name;
            label.setAttribute('for', key);
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'lang';
            radio.style.opacity = 0;
            radio.required = true;
            radio.value = key;
            radio.id = key;
            if(key === 'ru'){
                radio.checked = true;
            }
            langContainer.append(radio, label);
        });
        form.append(langContainer);

        //init count
        const inputContainer = document.createElement('div');
        const inputText = document.createElement('div');
        inputContainer.append(inputText);
        inputText.innerHTML = 'Введите количество букв';
        inputText.classList.add('title');
        const input = document.createElement('input');
        input.name = 'count';
        input.type = 'number';
        input.value = 4;
        input.min = 1;
        input.required = true;
        inputContainer.append(input);
        form.append(inputContainer);

        //init btn
        const btn = document.createElement('button');
        btn.type = 'submit';
        btn.innerHTML = 'Дальше';
        form.append(btn);
    
        app.append(form);
    });
}