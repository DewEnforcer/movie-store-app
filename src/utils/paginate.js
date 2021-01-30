export function paginate(items, pageNum, pageSize) {
    const itemsCopy = [...items];
    const from = (pageNum - 1) * pageSize;
    return itemsCopy.splice(from, pageSize);
}   