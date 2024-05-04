import homeScreen from './scripts/screens/home.js';

(async function(){
    const app = document.getElementById('app');

    const {count, lang} = await homeScreen(app);
    const {default: mainScreen} = await import('./scripts/screens/main.js');
    app.innerHTML = '';
    mainScreen(app, +count, lang);
})();