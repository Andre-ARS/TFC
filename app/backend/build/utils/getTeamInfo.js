"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awayGoals = exports.homeGoals = exports.awayNumbers = exports.homeNumbers = void 0;
const homeNumbers = (matches) => {
    let w = 0;
    let l = 0;
    let d = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals > awayTeamGoals)
            w += 1;
        if (homeTeamGoals < awayTeamGoals)
            l += 1;
        if (homeTeamGoals === awayTeamGoals)
            d += 1;
    });
    return [w, l, d];
};
exports.homeNumbers = homeNumbers;
const awayNumbers = (matches) => {
    let w = 0;
    let l = 0;
    let d = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (awayTeamGoals > homeTeamGoals)
            w += 1;
        if (awayTeamGoals < homeTeamGoals)
            l += 1;
        if (awayTeamGoals === homeTeamGoals)
            d += 1;
    });
    return [w, l, d];
};
exports.awayNumbers = awayNumbers;
const homeGoals = (matches) => {
    let favor = 0;
    let own = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        favor += homeTeamGoals;
        own += awayTeamGoals;
    });
    return [favor, own];
};
exports.homeGoals = homeGoals;
const awayGoals = (matches) => {
    let favor = 0;
    let own = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        favor += awayTeamGoals;
        own += homeTeamGoals;
    });
    return [favor, own];
};
exports.awayGoals = awayGoals;
//# sourceMappingURL=getTeamInfo.js.map