function sortTwoCriteria(arr) {
    const result = arr.sort((a, b) => a.length - b.length ||
        a.localeCompare(b));
    return result.join('\n');
}

sortTwoCriteria();