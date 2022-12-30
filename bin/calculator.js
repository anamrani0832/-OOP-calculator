export class Calculator {
    _nums;
    constructor(nums) {
        this._nums = nums;
    }
    get add() {
        return this._nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
    get sub() {
        return this._nums.reduce((accumulator, currentValue) => accumulator - currentValue);
    }
    get multiply() {
        return this._nums.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
    }
    get divide() {
        return this._nums.reduce((accumulator, currentValue) => {
            return accumulator / currentValue;
        });
    }
}
