class ColorContributionBlock {
    element;
    constructor(parent) {
        this.element = document.createElement('div');
        this.element.classList.add('contributionBlock');
        parent.appendChild(this.element);
    }
}
