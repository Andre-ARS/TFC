const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Trybe Futebol Clube (TFC)",
    description: "API de um CRUD de um campeonato de futebol",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Login",
      description: "Login Endpoints",
    },
    {
      name: "Teams",
      description: "Teams Endpoints",
    },
    {
      name: "Matches",
      description: "Matches Endpoints",
    },
    {
      name: "Leaderboard",
      description: "Leaderboard Endpoints",
    },
  ],
  definitions: {
    Login: {
      $email: "user@auser.com",
      $password: "secret_user",
    },
    Teams: [
      {
        $id: 1,
        $teamName: "Avai/Kindermann",
      },
    ],
    Matches: [
      {
        $id: 1,
        $homeTeam: 16,
        $homeTeamGoals: 1,
        $awayTeam: 8,
        $awayTeamGoals: 1,
        $inProgress: false,
        $teamHome: {
          $teamName: "São Paulo",
        },
        $teamAway: {
          $teamName: "Grêmio",
        },
      },
    ],
    CreateMatche: {
      $homeTeam: 12,
      $awayTeam: 1,
      $homeTeamGoals: 2,
      $awayTeamGoals: 2,
    },
    CreateMatcheRes: {
      $id: 49,
      $homeTeam: 12,
      $awayTeam: 1,
      $homeTeamGoals: 2,
      $awayTeamGoals: 2,
      $inProgress: true,
    },
    EditMatche: {
      $homeTeamGoals: 3,
      $awayTeamGoals: 1,
    },
    Leaderboard: [
      {
        $name: "Santos",
        $totalPoints: 9,
        $totalGames: 3,
        $totalVictories: 3,
        $totalDraws: 0,
        $totalLosses: 0,
        $efficiency: "100.00",
        $goalsFavor: 9,
        $goalsOwn: 3,
        $goalsBalance: 6,
      },
    ]
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/router.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // eslint-disable-next-line global-require, import/extensions
  require("./src/server.ts");
});
