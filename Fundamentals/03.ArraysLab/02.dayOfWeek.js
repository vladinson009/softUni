function dayOfWeek(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday',
    ]
    if (day > 0 && day <= 7) {
        console.log(days[day - 1]);
    } else {
        console.log('Invalid day!');
    }

}
dayOfWeek(8);