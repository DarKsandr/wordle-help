export default function(){
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = 'Сброс';
    resetBtn.addEventListener('click', () => location.reload());

    return resetBtn;
}