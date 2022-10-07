function requiredReading(totalPages, pagesPerHour, days) {
    const pagesPerDay = totalPages / days;
    const result = pagesPerDay / pagesPerHour

    console.log(result);
}
requiredReading(212,
    20,
    2)