export default class {
    Count = 0;
    Loading = false;
    constructor() {}

    Calculate(isLoad) {
        if (isLoad) {
            this.Count++;
            this.Loading = true;
        } else {
            if (this.Count === 0) this.Loading = false;
            else if (this.Count > 0) {
                this.Count--;
                this.Loading = this.Count > 0;
            }
        }
    }
}
