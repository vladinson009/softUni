function constructionCrew(object) {
    if (object.dizziness) {
        object.levelOfHydrated += 0.1 * object.weight * object.experience;
        object.dizziness = false;
    }
    return object;
}
constructionCrew({
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
});