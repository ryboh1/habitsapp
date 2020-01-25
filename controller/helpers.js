exports.helpers = function helpers() {

    this.changeToArray = (theGoalData) => {
        let theLength = theGoalData.length;
        let theArray = [];

        for(let i = 0; i < theLength; i++){
            theArray.push(theGoalData[i]["goalTwo"]);
        };

        return theArray;
    };
};
  