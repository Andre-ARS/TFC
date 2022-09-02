import { IMatcheResponse } from '../interfaces/IMatche';

const homeNumbers = (matches: IMatcheResponse[]) => {
  let w = 0;
  let l = 0;
  let d = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) w += 1;
    if (homeTeamGoals < awayTeamGoals) l += 1;
    if (homeTeamGoals === awayTeamGoals) d += 1;
  });

  return [w, l, d];
};

const awayNumbers = (matches: IMatcheResponse[]) => {
  let w = 0;
  let l = 0;
  let d = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) w += 1;
    if (awayTeamGoals < homeTeamGoals) l += 1;
    if (awayTeamGoals === homeTeamGoals) d += 1;
  });

  return [w, l, d];
};

const homeGoals = (matches: IMatcheResponse[]) => {
  let favor = 0;
  let own = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    favor += homeTeamGoals;
    own += awayTeamGoals;
  });

  return [favor, own];
};

const awayGoals = (matches: IMatcheResponse[]) => {
  let favor = 0;
  let own = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    favor += awayTeamGoals;
    own += homeTeamGoals;
  });

  return [favor, own];
};

export {
  homeNumbers,
  awayNumbers,
  homeGoals,
  awayGoals,
};
