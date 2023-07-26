class ContributionBlock {
    #contributionDate;
    #contributionCount;
    #contributionCountText;
    constructor(contributionDate, parent, contributionCount = 0) {

        this.element = document.createElement('div');
        this.element.classList.add('contributionBlock');
        parent.appendChild(this.element);

        this.#contributionDate = contributionDate;
        this.#contributionCount = contributionCount;
    }
    changeBlockColor() {
        if (this.#contributionCount === 0) {
            this.element.classList.add('zeroContributions');
        }
        else if (this.#contributionCount >= 1 && this.#contributionCount <= 9) {
            this.element.classList.add('oneToNineContributions');
        }
        else if (this.#contributionCount >= 10 && this.#contributionCount <= 19) {
            this.element.classList.add('tenToNineteenContributions');
        }
        else if (this.#contributionCount >= 20 && this.#contributionCount <= 29) {
            this.element.classList.add('twentyToTwentyNineContributions');
        }
        else if (this.#contributionCount >= 30) {
            this.element.classList.add('thirtyPlusContributions');
        }
        if (this.#contributionCount >= 30) this.#contributionCountText = this.#contributionCount + '+ contributions';
        this.#contributionCountText = this.#contributionCount + ' contributions';
    }
    getContributionDate() {
        return this.#contributionDate;
    }

    getContributionCountText() {
        return this.#contributionCountText;
    }

    setContributionCount(value) {
        this.#contributionCount = value;
    }
}

