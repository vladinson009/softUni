function editElement(reference, match, replacer) {
    reference.textContent = reference.textContent
        .split(match)
        .join(replacer);
}