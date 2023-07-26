class ContributionGraph {
    #contributionGraphBlocksArray;
    #colorPaletteBlocksArray;
    #contributionGraphMonthsArray;
    #contributionGraphWeekDaysArray;
    #contributionBlocksPopupsMap;
    #colorPalettePopupsMap;

    #contributionGraphWrapper;
    #contributionGraphMonths;
    #contributionGraphAndWeeksWrapper;
    #contributionGraphWeekDays;
    #contributionGraph;

    #now;
    #currentTime;
    #lastDate;
    #futureDays;
    #currentMonth;
    #currentDay;
    #currentDate;

    #contributionGraphWeek

    #contributionGraphMonth;
    #contributionGraphWeekDay;

    #colorPaletteLess
    #colorPaletteClassArray;
    #colorPalette;
    #colorPaletteMore;

    constructor(dataURL = 'https://dpg.gg/test/calendar.json') {
        this.#contributionGraphBlocksArray = [];
        this.#colorPaletteBlocksArray = [];
        this.#contributionBlocksPopupsMap = new Map();
        this.#colorPalettePopupsMap = new Map();
        this.#contributionGraphMonthsArray = [
            'Янв.',
            'Фев.',
            'Март',
            'Апр.',
            'Май',
            'Июнь',
            'Июль',
            'Авг.',
            'Сент.',
            'Окт.',
            'Нояб.',
            'Дек.'
        ];
        this.#contributionGraphWeekDaysArray = ['Пн', 'Ср', 'Пт'];
        this.#colorPaletteClassArray = [
            ['zeroContributions', '0 contributions'],
            ['oneToNineContributions', '1-9 contributions'],
            ['tenToNineteenContributions', '10-19 contributions'],
            ['twentyToTwentyNineContributions', '20-29 contributions'],
            ['thirtyPlusContributions', '30+ contributions']
        ];


        this.#contributionGraphWrapper = document.createElement('div');
        this.#contributionGraphWrapper.classList.add('contributionGraphWrapper');
        document.body.appendChild(this.#contributionGraphWrapper);

        this.#contributionGraphMonths = document.createElement('div');
        this.#contributionGraphMonths.classList.add('contributionGraphMonths');
        this.#contributionGraphWrapper.appendChild(this.#contributionGraphMonths);

        this.#contributionGraphAndWeeksWrapper = document.createElement('div');
        this.#contributionGraphAndWeeksWrapper.classList.add('contributionGraphAndWeeksWrapper');
        this.#contributionGraphWrapper.appendChild(this.#contributionGraphAndWeeksWrapper);

        this.#contributionGraphWeekDays = document.createElement('div');
        this.#contributionGraphWeekDays.classList.add('contributionGraphWeekDays');
        this.#contributionGraphAndWeeksWrapper.appendChild(this.#contributionGraphWeekDays);

        this.#contributionGraph = document.createElement('div');
        this.#contributionGraph.classList.add('contributionGraph');
        this.#contributionGraphAndWeeksWrapper.appendChild(this.#contributionGraph);

        this.#colorPalette = document.createElement('div');
        this.#colorPalette.classList.add('colorPalette');
        this.#contributionGraphWrapper.appendChild(this.#colorPalette);


        fetch(dataURL)
            .then(response => response.json())
            .then(data => {
                this.#createMonthsSpan();
                this.#createWeekDaysSpan();
                this.#createContributionGraph(data);
                this.#createPaletteSpan();
            });
    }

    #createContributionGraph(data) {
        this.#now = new Date();
        this.#currentTime = this.#now.getTime();
        this.#now = new Date(this.#currentTime - (this.#currentTime % 86400000));

        this.#lastDate = new Date();
        this.#lastDate.setDate(this.#now.getDate());
        this.#futureDays = this.#lastDate.getDay() === 0 ? this.#lastDate.getDay() : 7 - this.#lastDate.getDay();
        this.#lastDate.setDate(this.#lastDate.getDate() - 356 + this.#futureDays);

        for (let i = 0; i < 51; i++) {

            this.#contributionGraphWeek = document.createElement('div');
            this.#contributionGraph.appendChild(this.#contributionGraphWeek);

            for (let i = 0; i < 7; i++, this.#lastDate.setDate(this.#lastDate.getDate() + 1)) {

                this.#currentMonth = this.#lastDate.getMonth();
                this.#currentMonth++;
                this.#currentMonth = this.#currentMonth.toString();
                this.#currentDay = this.#lastDate.getDate().toString();

                if (!this.#currentMonth[1]) this.#currentMonth = '0' + this.#currentMonth;
                if (!this.#currentDay[1]) this.#currentDay = '0' + this.#currentDay;

                this.#currentDate = this.#lastDate.getFullYear() + '-' + this.#currentMonth + '-' + this.#currentDay;
                this.#contributionGraphBlocksArray.push(new ContributionBlock(this.#currentDate, this.#contributionGraphWeek));

            }

        }

        for (let i = 0; i < this.#contributionGraphBlocksArray.length; i++) {

            for (let key in data) {
                if (key === this.#contributionGraphBlocksArray[i].getContributionDate()) this.#contributionGraphBlocksArray[i].setContributionCount(data[key]);
                this.#contributionGraphBlocksArray[i].changeBlockColor();
            }

            this.#contributionGraphBlocksArray[i].element.addEventListener('click', () => {

                this.#contributionGraphBlocksArray[i].element.classList.toggle('onClickBorder');

                if (this.#contributionBlocksPopupsMap.size === 0 || !this.#contributionBlocksPopupsMap.has(i)) {
                    this.#contributionBlocksPopupsMap.set(i, new ContributionBlockPopup(
                        this.#contributionGraphBlocksArray[i].element.getBoundingClientRect().top,
                        this.#contributionGraphBlocksArray[i].element.getBoundingClientRect().left + this.#contributionGraphBlocksArray[i].element.getBoundingClientRect().width / 2,
                        this.#contributionGraphBlocksArray[i].getContributionCountText(),
                        this.#contributionGraphBlocksArray[i].getContributionDate()
                    ));
                } else {
                    this.#contributionBlocksPopupsMap.get(i).remove();
                    this.#contributionBlocksPopupsMap.delete(i);
                }

            });
        }
    }
    #createMonthsSpan() {
        for (let i = 11; i >= 0; i--) {
            this.#contributionGraphMonth = document.createElement('div');
            this.#contributionGraphMonth.classList.add('contributionGraphMonth');

            if (new Date().getMonth() - i < 0) this.#contributionGraphMonth.innerText = this.#contributionGraphMonthsArray[new Date().getMonth() + 12 - i];
            else this.#contributionGraphMonth.innerText = this.#contributionGraphMonthsArray[new Date().getMonth() - i];

            this.#contributionGraphMonths.appendChild(this.#contributionGraphMonth);
        }
    }
    #createWeekDaysSpan() {
        for (let i = 0; i < 3; i++) {
            this.#contributionGraphWeekDay = document.createElement('div');
            this.#contributionGraphWeekDay.classList.add('contributionGraphWeekDay');
            this.#contributionGraphWeekDay.innerText = this.#contributionGraphWeekDaysArray[i];
            this.#contributionGraphWeekDays.appendChild(this.#contributionGraphWeekDay);
        }
    }
    #createPaletteSpan() {
        this.#colorPaletteLess = document.createElement('div');
        this.#colorPaletteLess.innerText = 'Меньше';
        this.#colorPaletteLess.classList.add('colorPaletteMoreLessWords');
        this.#colorPalette.appendChild(this.#colorPaletteLess);

        for (let i = 0; i < 5; i++) {
            this.#colorPaletteBlocksArray.push(new ColorContributionBlock(this.#colorPalette));
            this.#colorPaletteBlocksArray[i].element.classList.add(this.#colorPaletteClassArray[i][0]);

            this.#colorPaletteBlocksArray[i].element.addEventListener('click', () => {

                this.#colorPaletteBlocksArray[i].element.classList.toggle('onClickBorder');

                if (this.#colorPalettePopupsMap.size === 0 || !this.#colorPalettePopupsMap.has(i)) {
                    this.#colorPalettePopupsMap.set(i, new ContributionBlockPopup(
                        this.#colorPaletteBlocksArray[i].element.getBoundingClientRect().top,
                        this.#colorPaletteBlocksArray[i].element.getBoundingClientRect().left + this.#contributionGraphBlocksArray[i].element.getBoundingClientRect().width / 2,
                        this.#colorPaletteClassArray[i][1]
                    ));
                } else {
                    this.#colorPalettePopupsMap.get(i).remove();
                    this.#colorPalettePopupsMap.delete(i);
                }

            });
        }

        this.#colorPaletteMore = document.createElement('div');
        this.#colorPaletteMore.innerText = 'Больше';
        this.#colorPaletteMore.classList.add('colorPaletteMoreLessWords');
        this.#colorPalette.appendChild(this.#colorPaletteMore);
    }
}
