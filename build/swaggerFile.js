"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
// const BAD_REQUEST = 'Bad Request';
// const REQUIRED = '"Some field" is required';
/* eslint-disable max-lines */
const swaggerFile = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Trybe Futebol Clube (TFC)',
        description: 'API de um CRUD de um campeonato de futebol',
    },
    host: 'localhost:3001',
    basePath: '/',
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
        },
    },
    tags: [
        {
            name: 'Login',
            description: 'Login Endpoints',
        },
        {
            name: 'Teams',
            description: 'Teams Endpoints',
        },
        {
            name: 'Matches',
            description: 'Matches Endpoints',
        },
        {
            name: 'Leaderboard',
            description: 'Leaderboard Endpoints',
        },
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/login/': {
            post: {
                tags: ['Login'],
                description: 'Valida um usuário e retorna um token',
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        schema: { $ref: '#/definitions/Login' },
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            properties: 'token',
                            example: {
                                token: 'zI1NiIsInR5cCI6IkpXVCJ9.LCJleHAiOjE2NjE1MjQwODZ9.ZTJ5L0yvIfX9dzZBtI',
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Incorrect email or password',
                            },
                        },
                    },
                },
            },
        },
        '/teams/': {
            get: {
                description: 'Retorna todos os times cadastrados',
                tags: ['Teams'],
                parameters: [],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Teams' },
                    },
                },
            },
        },
        '/teams/{id}': {
            get: {
                description: 'Retorna um time cadastrado com base em seu id',
                tags: ['Teams'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Teams' },
                    },
                },
            },
        },
        '/matches/': {
            get: {
                description: 'Retorna todas partidas sem filtrar ou filtrando pelo andamento',
                tags: ['Matches'],
                parameters: [
                    {
                        name: 'inProgress',
                        in: 'query',
                        type: 'boolean',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Matches' },
                    },
                },
            },
            post: {
                description: 'Cadastra uma nova partida',
                tags: ['Matches'],
                security: [{
                        apiKeyAuth: [],
                    }],
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        schema: { $ref: '#/definitions/CreateMatche' },
                    },
                ],
                responses: {
                    201: {
                        description: 'Created',
                        schema: { $ref: '#/definitions/CreateMatcheRes' },
                    },
                    401: {
                        description: 'Unauthorized',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Token must be a valid token',
                            },
                        },
                    },
                    404: {
                        description: 'Not Found',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'There is no team with such id!',
                            },
                        },
                    },
                },
            },
        },
        '/matches/{id}/finish': {
            patch: {
                description: 'Finaliza uma partida',
                tags: ['Matches'],
                security: [{
                        apiKeyAuth: [],
                    }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Finished',
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Token must be a valid token',
                            },
                        },
                    },
                },
            },
        },
        '/matches/{id}': {
            patch: {
                description: 'Edita o placar de uma partida em andamento',
                tags: ['Matches'],
                security: [{
                        apiKeyAuth: [],
                    }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                    },
                    {
                        name: 'body',
                        in: 'body',
                        schema: { $ref: '#/definitions/EditMatche' },
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Score changed!',
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        schema: {
                            type: 'object',
                            properties: 'message',
                            example: {
                                message: 'Token must be a valid token',
                            },
                        },
                    },
                },
            },
        },
        '/leaderboard/': {
            get: {
                description: 'Retorna a classificação geral dos times',
                tags: ['Leaderboard'],
                parameters: [],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Leaderboard' },
                    },
                },
            },
        },
        '/leaderboard/home': {
            get: {
                description: 'Retorna a classificação dos times como mandantes',
                tags: ['Leaderboard'],
                parameters: [],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Leaderboard' },
                    },
                },
            },
        },
        '/leaderboard/away': {
            get: {
                description: 'Retorna a classificação dos times como visitantes',
                tags: ['Leaderboard'],
                parameters: [],
                responses: {
                    200: {
                        description: 'OK',
                        schema: { $ref: '#/definitions/Leaderboard' },
                    },
                },
            },
        },
    },
    definitions: {
        Login: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'user@user.com',
                },
                password: {
                    type: 'string',
                    example: 'secret_user',
                },
            },
            required: ['email', 'password'],
        },
        Teams: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 1,
                    },
                    teamName: {
                        type: 'string',
                        example: 'Avai/Kindermann',
                    },
                },
                required: ['id', 'teamName'],
            },
        },
        Matches: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 1,
                    },
                    homeTeam: {
                        type: 'number',
                        example: 16,
                    },
                    homeTeamGoals: {
                        type: 'number',
                        example: 1,
                    },
                    awayTeam: {
                        type: 'number',
                        example: 8,
                    },
                    awayTeamGoals: {
                        type: 'number',
                        example: 1,
                    },
                    inProgress: {
                        type: 'boolean',
                        example: false,
                    },
                    teamHome: {
                        type: 'object',
                        properties: {
                            teamName: {
                                type: 'string',
                                example: 'São Paulo',
                            },
                        },
                        required: ['teamName'],
                    },
                    teamAway: {
                        type: 'object',
                        properties: {
                            teamName: {
                                type: 'string',
                                example: 'Grêmio',
                            },
                        },
                        required: ['teamName'],
                    },
                },
                required: [
                    'id',
                    'homeTeam',
                    'homeTeamGoals',
                    'awayTeam',
                    'awayTeamGoals',
                    'inProgress',
                    'teamHome',
                    'teamAway',
                ],
            },
        },
        CreateMatche: {
            type: 'object',
            properties: {
                homeTeam: {
                    type: 'number',
                    example: 12,
                },
                awayTeam: {
                    type: 'number',
                    example: 1,
                },
                homeTeamGoals: {
                    type: 'number',
                    example: 2,
                },
                awayTeamGoals: {
                    type: 'number',
                    example: 2,
                },
            },
            required: ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'],
        },
        CreateMatcheRes: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    example: 49,
                },
                homeTeam: {
                    type: 'number',
                    example: 12,
                },
                awayTeam: {
                    type: 'number',
                    example: 1,
                },
                homeTeamGoals: {
                    type: 'number',
                    example: 2,
                },
                awayTeamGoals: {
                    type: 'number',
                    example: 2,
                },
                inProgress: {
                    type: 'boolean',
                    example: true,
                },
            },
            required: [
                'id',
                'homeTeam',
                'awayTeam',
                'homeTeamGoals',
                'awayTeamGoals',
                'inProgress',
            ],
        },
        EditMatche: {
            type: 'object',
            properties: {
                homeTeamGoals: {
                    type: 'number',
                    example: 3,
                },
                awayTeamGoals: {
                    type: 'number',
                    example: 1,
                },
            },
            required: ['homeTeamGoals', 'awayTeamGoals'],
        },
        Leaderboard: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'Santos',
                    },
                    totalPoints: {
                        type: 'number',
                        example: 9,
                    },
                    totalGames: {
                        type: 'number',
                        example: 3,
                    },
                    totalVictories: {
                        type: 'number',
                        example: 3,
                    },
                    totalDraws: {
                        type: 'number',
                        example: 0,
                    },
                    totalLosses: {
                        type: 'number',
                        example: 0,
                    },
                    efficiency: {
                        type: 'string',
                        example: '100.00',
                    },
                    goalsFavor: {
                        type: 'number',
                        example: 9,
                    },
                    goalsOwn: {
                        type: 'number',
                        example: 3,
                    },
                    goalsBalance: {
                        type: 'number',
                        example: 6,
                    },
                },
                required: [
                    'name',
                    'totalPoints',
                    'totalGames',
                    'totalVictories',
                    'totalDraws',
                    'totalLosses',
                    'efficiency',
                    'goalsFavor',
                    'goalsOwn',
                    'goalsBalance',
                ],
            },
        },
    },
};
exports.default = swaggerFile;
//# sourceMappingURL=swaggerFile.js.map