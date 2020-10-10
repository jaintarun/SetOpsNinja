import _ from "lodash"

class SetopsLogic {
    subtract(source: string[], toRemove: string[], caseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        source = this.applyOptions(source, caseSensitive, trimLines, ignoreEmptyLines);
        toRemove = this.applyOptions(toRemove, caseSensitive, trimLines, ignoreEmptyLines);

        const toRemoveHash = this.arrayToDictionary(toRemove);

        const toReturn = [];
        const arrayLength = source.length;
        for (let i = 0; i < arrayLength; i++) {
            if (!toRemoveHash[source[i]]) {
                toReturn.push(source[i]);
            }
        }
        return toReturn;
    }

    union(aArray: string[], bArray: string[], caseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        aArray = this.applyOptions(aArray, caseSensitive, trimLines, ignoreEmptyLines);
        bArray = this.applyOptions(bArray, caseSensitive, trimLines, ignoreEmptyLines);

        const aArrayHash = this.arrayToDictionary(aArray);

        const toReturn = [...aArray];
        const bArrayLen = bArray.length;
        for (let i = 0; i < bArrayLen; i++) {
            if (!aArrayHash[bArray[i]]) {
                toReturn.push(bArray[i]);
            }
        }
        return toReturn.sort();

    }

    intersection(aArray: string[], bArray: string[], caseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        aArray = this.applyOptions(aArray, caseSensitive, trimLines, ignoreEmptyLines);
        bArray = this.applyOptions(bArray, caseSensitive, trimLines, ignoreEmptyLines);

        const aArrayHash = this.arrayToDictionary(aArray);

        const toReturn = [];
        const bArrayLen = bArray.length;
        for (let i = 0; i < bArrayLen; i++) {
            if (aArrayHash[bArray[i]]) {
                toReturn.push(bArray[i]);
            }
        }
        return toReturn;
    }

    applyOptions(inputArray: string[], caseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        let toReturn: string[] = inputArray;
        if (!caseSensitive) {
            toReturn = this.makeLowercase(toReturn);
        }

        if (ignoreEmptyLines) {
            toReturn = this.removeEmptyLines(toReturn);
        }

        if (trimLines) {
            toReturn = this.trimLines(toReturn);
        }

        return toReturn;
    }

    makeLowercase(inputArray: string[]): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        const toReturn: string[] = [];
        _.forEach(inputArray, a => {
            toReturn.push(a.toLowerCase());
        });
        return toReturn;
    }

    removeEmptyLines(inputArray: string[]): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        const toReturn: string[] = [];
        _.forEach(inputArray, a => {
            const x = a.trim();
            if (x.length > 0) {
                toReturn.push(x);
            }
        });
        return toReturn;
    }

    sort(inputArray: string[], isCaseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] | number[] {
        if (!inputArray || !inputArray.length) {
            return [];
        }

        inputArray = this.applyOptions(inputArray, isCaseSensitive, trimLines, ignoreEmptyLines);

        let areAllNumbers = true;
        const numArray: number[] = [];

        const arrayLength = inputArray.length;

        for (let i = 0; i < arrayLength; i++) {
            if (inputArray[i]) {
                const x = Number(inputArray[i]);
                
                if (isNaN(x)) {
                    areAllNumbers = false;         
                    break;
                }

                numArray.push(x);
            }
        }

        if (areAllNumbers) {
            numArray.sort((a,b)=>a-b);
            return numArray;
        } else {
            inputArray.sort();
            return inputArray;
        }

    }

    trimLines(inputArray: string[]): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        const toReturn: string[] = [];
        _.forEach(inputArray, a => {
            toReturn.push(a.trim());
        });
        return toReturn;
    }

    getUnique(inputArray: string[], isCaseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        if (ignoreEmptyLines) {
            inputArray = this.removeEmptyLines(inputArray);
        }

        if (trimLines) {
            inputArray = this.trimLines(inputArray);
        }

        const localDict: { [key: string]: boolean } = {};
        const toReturn: string[] = [];

        _.forEach(inputArray, a => {
            let toAdd = a;
            if (!isCaseSensitive) {
                toAdd = a.toLowerCase();
            }

            if (!(toAdd in localDict)) {
                toReturn.push(a);     
                localDict[toAdd] = true;
            }
            
        });
        
        return toReturn;
    }

    getDuplicates(inputArray: string[], isCaseSensitive: boolean, trimLines: boolean, ignoreEmptyLines: boolean): string[] {

        if (!inputArray || !inputArray.length) {
            return [];
        }

        inputArray = this.applyOptions(inputArray, isCaseSensitive, trimLines, ignoreEmptyLines);

        const toReturn: { [key: string]: boolean } = {};
        const dict: { [key: string]: boolean } = {};

        _.forEach(inputArray, a => {

            if (dict[a]) {
                toReturn[a] = true;
            }
            else {
                dict[a] = true;
            }
        });

        const toReturnArray: string[] = [];
        for (const prop in toReturn) {
            toReturnArray.push(prop);
        }

        return toReturnArray;
    }


    stringToArray(input: string): string[] {
        if (!input || !input.length) {
            return [];
        }
        return input.split("\n");
    }

    arrayToString(inputArray: string[] | number[]): string {
        if (!inputArray || !inputArray.length) {
            return "";
        }
        return inputArray.join("\n");
    }

    arrayToDictionary(inputArray: string[]): Record<string, boolean> {
        if (!inputArray || !inputArray.length) {
            return {};
        }
        const toReturn: Record<string, boolean> = {};
        const len = inputArray.length;
        for (let i = 0; i < len; i++) {
            toReturn[inputArray[i]] = true;
        }
        return toReturn;
    }

}

const instance = new SetopsLogic();
export default instance;