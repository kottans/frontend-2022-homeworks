class SummaryModel extends BaseModel {
    constructor() {
        super();
        this.level = LEVEL_BUTTONS[0]
        this.attributes = {
            totalScore: 0,
            bestScore: JSON.parse(localStorage.getItem(`bestScore${this.level}`)) || 0,
        };
        if (!SummaryModel.instance) {
            SummaryModel.instance = this;
        }

        return SummaryModel.instance;
    }

    startNewGame() {
        this.attributes.totalScore = 0;
        localStorage.setItem(`totalScore${this.level}`, JSON.stringify(this.attributes.totalScore));
        this.publish(CHANGE_DATA);
    }

    makeActionByClickCard(addCount) {
        this.attributes.totalScore += addCount;
        localStorage.setItem(`totalScore${this.level}`, JSON.stringify(this.attributes.totalScore));
        this.publish(CHANGE_DATA);
    }

    checkBestResult(status) {
        if (status !== "end") { return; }
        if (this.attributes.totalScore < this.attributes.bestScore || this.attributes.bestScore === 0) {
            this.attributes.bestScore = this.attributes.totalScore;
            localStorage.setItem(`bestScore${this.level}`, JSON.stringify(this.attributes.bestScore));
        }
    }

    setCardAmount(level) {
        this.level = level;
        this.attributes = {
            totalScore: JSON.parse(localStorage.getItem(`totalScore${this.level}`)) || 0,
            bestScore: JSON.parse(localStorage.getItem(`bestScore${this.level}`)) || 0
        }
    }
}

