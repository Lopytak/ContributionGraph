class ContributionBlockPopup {
    #element;
    #contributionCountElement;
    #contributionDateElement;
    #top;
    #left;
    constructor(top, left, contributionCount, contributionDate = '') {

        this.#element = document.createElement('div');
        this.#element.classList.add('contributionBlockPopup');
        document.body.appendChild(this.#element);

        this.#contributionCountElement = document.createElement('div');
        this.#contributionCountElement.classList.add('contributionBlockPopup__ContributionCount');
        this.#contributionCountElement.innerText = contributionCount;
        this.#element.appendChild(this.#contributionCountElement);

        if (contributionDate !== '') {
            this.#contributionDateElement = document.createElement('div');
            this.#contributionDateElement.classList.add('contributionBlockPopup__ContributionsDate');
            this.#contributionDateElement.innerText = this.#parseDate(contributionDate);
            this.#element.appendChild(this.#contributionDateElement);
        }

        this.#top = top - this.#element.getBoundingClientRect().height - 5;
        this.#left = left - this.#element.getBoundingClientRect().width / 2;
        this.#element.style = 'top: ' + this.#top + 'px; left: ' + this.#left + 'px;';
    }
    remove() {
        document.body.removeChild(this.#element);
    }
    #parseDate(contributionDate) {
        const contributionParsedDate = new Date(contributionDate);
        const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октбярь', 'Ноябрь', 'Декабрь'];
        const weekDaysArray = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return weekDaysArray[contributionParsedDate.getDay()] + ', ' + monthsArray[contributionParsedDate.getMonth()] + ' ' + contributionParsedDate.getDate().toString() + ', ' + contributionParsedDate.getFullYear().toString();
    }
}
