export async function getWords(){
    const res = await fetch('russian.json');
    const items = await res.json();
    return items.map(el => el.toLowerCase());
}