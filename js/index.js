const contributionGraphBlocksArray = [];
const contributionGraphMonthsArray = ['Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.', 'Янв.', 'Фев.', 'Март'];
const contributionGraphWeekDaysArray = ['Пн', 'Ср', 'Пт'];


const contributionGraphWrapper = document.createElement('div');
contributionGraphWrapper.id = 'contributionGraphWrapper';
document.body.appendChild(contributionGraphWrapper);

const contributionGraphMonths = document.createElement('div');
contributionGraphMonths.id = 'contributionGraphMonths';
contributionGraphWrapper.appendChild(contributionGraphMonths);

const contributionGraphAndWeeksWrapper = document.createElement('div');
contributionGraphAndWeeksWrapper.id = 'contributionGraphAndWeeksWrapper';
contributionGraphWrapper.appendChild(contributionGraphAndWeeksWrapper);

const contributionGraphWeekDays = document.createElement('div');
contributionGraphWeekDays.id = 'contributionGraphWeekDays';
contributionGraphAndWeeksWrapper.appendChild(contributionGraphWeekDays);

const contributionGraph = document.createElement('div');
contributionGraph.id = 'contributionGraph';
contributionGraphAndWeeksWrapper.appendChild(contributionGraph);


for (let i = 0; i < 12; i++) {
    const contributionGraphMonth = document.createElement('div');
    contributionGraphMonth.classList.add('contributionGraphMonth');
    contributionGraphMonth.innerText = contributionGraphMonthsArray[i];
    contributionGraphMonths.appendChild(contributionGraphMonth);
}

for (let i = 0; i < 3; i++) {
    const contributionGraphWeekDay = document.createElement('div');
    contributionGraphWeekDay.classList.add('contributionGraphWeekDay');
    contributionGraphWeekDay.innerText = contributionGraphWeekDaysArray[i];
    contributionGraphWeekDays.appendChild(contributionGraphWeekDay);
}


fetch('https://dpg.gg/test/calendar.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let now = new Date();
        let time = now.getTime();
        now = new Date(time - (time % 86400000));
        let currentMonth, currentDay, currentDate;

            for (let i = 0; i < 51; i++) {
                const contributionGraphWeek = document.createElement('div');
                contributionGraph.appendChild(contributionGraphWeek);

                for (let i = 0; i < 7; i++, now.setDate(now.getDate() - 1)) {
                    currentMonth = now.getMonth().toString();
                    currentDay = now.getDate().toString();

                    if (!currentMonth[1]) currentMonth = '0' + now.getMonth();
                    if (!currentDay[1]) currentDay = '0' + now.getDate();
                    currentDate = now.getFullYear() + '-' + currentMonth + '-' + currentDay;

                    contributionGraphBlocksArray.push(new ContributionBlock(currentDate, contributionGraphWeek));
                }

            }

            for (let i = 0; i < contributionGraphBlocksArray.length; i++) {

                for (let key in data) {
                    if (key === contributionGraphBlocksArray[i].contributionDate) contributionGraphBlocksArray[i].contributionCount = data[key];
                    contributionGraphBlocksArray[i].blockColor();
                }

                contributionGraphBlocksArray[i].element.addEventListener('click', function (event) {
                    alert('Contributions: ' + contributionGraphBlocksArray[i].contributionCount + "\n" + 'Дата: ' + contributionGraphBlocksArray[i].contributionDate)
                    contributionGraphBlocksArray[i].element.classList.toggle('blackBorder');
                    // const contributionGraphBlockPopup = document.createElement('div');
                    // contributionGraphBlockPopup.classList.add('contributionGraphBlockPopup');
                    // contributionGraphBlockPopup.innerText = '';
                    // contributionGraph.appendChild(contributionGraphBlockPopup);


                });

            }
    });


