const body = document.querySelector('body');
const main = document.createElement('main');
main.addEventListener('click', onClick);
body.appendChild(main);

const yearsSection = document.getElementById('years');
main.appendChild(yearsSection);
let previews1;
let previews2;
let previews3;

function onClick(ev) {
  const section = main.querySelector('section');
  const className = section.className;

  ev.preventDefault();

  const options = {
    yearsCalendar: onYear,
    monthCalendar: onMonths,
    daysCalendar: onDays,
  };
  const func = options[className];
  func(ev);
}

function onYear(ev) {
  ev.preventDefault();

  const target = ev.target;
  let current;

  if (target.className == 'day') {
    current = target.children[0].textContent;
  } else if (target.className == 'date') {
    current = target.textContent;
  } else {
    return;
  }

  current = `year-${current}`;
  const choosedYear = document.getElementById(current);
  if (choosedYear) {
    main.appendChild(choosedYear);
  } else {
    main.appendChild(previews2);
  }
  main.removeChild(yearsSection);
  previews1 = yearsSection;
}

function onMonths(ev) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
    '',
  ];
  ev.preventDefault();
  const target = ev.target;
  let current;
  let yr;

  const choosedYear = main.querySelector('section');
  if (target.tagName == 'CAPTION') {
    main.appendChild(previews1);
    main.removeChild(choosedYear);
    previews2 = choosedYear;
    return;
  } else if (target.className == 'day') {
    yr =
      target.parentElement.parentElement.parentElement.querySelector(
        'caption'
      ).textContent;

    current = target.children[0].textContent;
  } else if (target.className == 'date') {
    current = target.textContent;
    yr =
      target.parentElement.parentElement.parentElement.parentElement.querySelector(
        'caption'
      ).textContent;
  } else {
    return;
  }
  const index = months.indexOf(current) + 1;
  let str = `month-${yr.trim()}-${index}`;
  const choosedMonth = document.getElementById(str);
  if (choosedMonth) {
    main.appendChild(choosedMonth);
    choosedMonth.querySelector('.weekdays').style.display = 'inline-block';
  } else {
    previews3.querySelector('.weekdays').style.display = 'inline-block';
    main.appendChild(previews3);
  }
  main.removeChild(choosedYear);
  previews2 = choosedYear;
}
function onDays(ev) {
  ev.preventDefault();

  const choosedMonth = main.querySelector('section');
  const target = ev.target;
  if (target.tagName == 'CAPTION') {
    main.appendChild(previews2);
    main.removeChild(choosedMonth);
    previews3 = choosedMonth;
  } else {
    return;
  }
}
