function attachEventsListeners() {

    const ratios = {
        days: 1,
        hours: 24,
        minutes: 1440,
        seconds: 86400
    }

    function convert(value, units) {
        const inDays = value / ratios[units];
        return {
            days: inDays,
            hours: inDays * ratios.hours,
            minutes: inDays * ratios.minutes,
            seconds: inDays * ratios.seconds,
        }

    }
    document.querySelector('main').addEventListener('click', action)
    const dField = document.querySelector('input[type="text"][id="days"]');
    const hField = document.querySelector('input[type="text"][id="hours"]');
    const mField = document.querySelector('input[type="text"][id="minutes"]');
    const sField = document.querySelector('input[type="text"][id="seconds"]');

    function action(e) {
        if (e.target.tagName == 'INPUT' && e.target.value == 'Convert') {
            const input = e.target.parentElement.querySelector('input[type="text"]');
            time = convert(Number(input.value), input.id);
            dField.value = time.days;
            hField.value = time.hours;
            mField.value = time.minutes;
            sField.value = time.seconds

        }
    }
}