## Логи ошибок

```bash
AxiosError: Request failed with status code 404
at settle (/home/www/dev-api.wame.tools.some/current/node_modules/axios/dist/node/axios.cjs: 2015: 12)
at IncomingMessage.handleStreamEnd (/home/www/dev-api.wame.tools.some/current/node_modules/axios/dist/node/axios.cjs: 3131: 11)
at IncomingMessage.emit (node: events: 530: 35)
at IncomingMessage.emit (node: domain: 488: 12)
at endReadableNT (node: internal/streams/readable: 1696: 12)
at process.processTicksAndRejections (node: internal/process/task_queues: 82: 21)
at Axios.request (/home/www/dev-api.wame.tools.some/current/node_modules/axios/dist/node/axios.cjs: 4262: 41)
at process.processTicksAndRejections (node: internal/process/task_queues: 95: 5)
at async HttpRequestsService.vitaminIdLoginWithAuthCode (/home/www/dev-api.wame.tools.some/current/dist/app/http-requests/http-requests.service.js: 428: 29)
at async AuthService.loginWithAuthCode (/home/www/dev-api.wame.tools.some/current/dist/app/api/auth/auth.service.js: 608: 36)
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If
you'd like to join them, please [read more here](https://docs.nestjs.com/support).
