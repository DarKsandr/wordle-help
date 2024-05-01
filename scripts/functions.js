export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export async function getWords(){
    const res = await fetch('russian.json');
    const items = await res.json();
    return items.map(el => el.toLowerCase());
}