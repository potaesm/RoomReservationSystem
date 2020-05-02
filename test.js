function calculateUnit(studyInitialTime, studyTerminateTime) {
    let initialIntPart = Number(studyInitialTime.split(".")[0]);
    let terminateIntPart = Number(studyTerminateTime.split(".")[0]);
    let initialFloatPart = Number(studyInitialTime.split(".")[1]);
    let terminateFloatPart = Number(studyTerminateTime.split(".")[1]);
    let unitNumber = ((terminateIntPart - initialIntPart) * 2 + ((terminateFloatPart - initialFloatPart) === 30 ? 1 : (terminateFloatPart - initialFloatPart) === -30 ? -1 : 0));
    let startNumber = ((initialIntPart - 7) * 2 + (initialFloatPart === 30 ? 1 : 0)) - 2;
    let unit = [];
    for (let i = 0; i < unitNumber; i++) {
        unit.push(i + startNumber);
    }
    return unit;
}

console.log(calculateUnit("08.30", "11.30"));