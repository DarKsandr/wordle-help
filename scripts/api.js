export async function getWords(lang){
    const res = await fetch(`dictionaries/${lang}.json`);
    const items = await res.json();
    return items.map(el => el.toLowerCase());
}