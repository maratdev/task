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

## Интерпретация лога

Ошибка 404 указывает что ресурс к которому выполнялся запрос не был найден на сервере

Причины:
* Неправильный URL или endpoint в запросе
* Ресурс удалён или недоступен
* Проблема на стороне API

Важные места в стеке вызовов:

Ошибка возникла на этапе выполнения запроса в методе HttpRequestsService.vitaminIdLoginWithAuthCode (строка 428)

Метод AuthService.loginWithAuthCode (строка 608) передал управление в этот метод

## Какой шаблон проектирования реализован коде указанном ниже?

```bash
public async globalWs__(
    incomingAction: WsActionsAcceptingEnum,
    data: any,
    profile: ProfileRepository,
    socket: Socket
  ) {
    switch (incomingAction) {
      case WsActionsAcceptingEnum.TICKET_OPEN_TICKET:
        // open ticket
        await this.wsRoleCheck(profile, [
          ProfileRoleEnum.AUCTION,
          ProfileRoleEnum.EDTECH,
          ProfileRoleEnum.REAL_ESTATE,
          ProfileRoleEnum.COMMON,
          ProfileRoleEnum.FOOD,
        ]);
        return this.ticketOpen(
          await validateByClassUtil(data, WsTicketCreateDto),
          profile,
          socket
        );

      case WsActionsAcceptingEnum.TICKET_CLOSE_TICKET:
        await this.wsRoleCheck(profile, [
          ProfileRoleEnum.ADMIN,
          ProfileRoleEnum.MODERATOR,
        ]);
        return this.ticketClose(
          await validateByClassUtil(data, WsTicketCloseDto),
          socket
        );

      case WsActionsAcceptingEnum.GENERAL_SEND_MESSAGE:
        await this.wsRoleCheck(profile, []);
        return this.sendMessageToChat(
          profile,
          await validateByClassUtil(data, WsGeneralSendMessageDto),
          socket
        );

      default:
        return;
    }
  }
```
В коде используется шаблон проектирования «Command pattern».

Каждое значение incomingAction соответствует конкретной операции (например, TICKET_OPEN_TICKET, TICKET_CLOSE_TICKET), которая обрабатывается в switch.
