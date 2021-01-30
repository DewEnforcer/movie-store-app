export function filterByParams(items, genreID, query="", defaultGenreID = "1") {
    const itemsCopy = [...items];
    if (query.length > 0) return itemsCopy.filter(mov => mov.title.toLowerCase().startsWith(query));
    if (genreID === defaultGenreID) return itemsCopy;
    return itemsCopy.filter((mov) => mov.genre._id === genreID);
}