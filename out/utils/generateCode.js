"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.getTimeOut = exports.differenceBetweenDates = void 0;
const differenceBetweenDates = (start, end) => {
    return (end.getTime() - start.getTime());
};
exports.differenceBetweenDates = differenceBetweenDates;
const getTimeOut = (time, timeOutSeconds) => {
    const timeMills = (0, exports.differenceBetweenDates)(time, new Date());
    return Math.round(timeOutSeconds - timeMills / 1000);
};
exports.getTimeOut = getTimeOut;
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map