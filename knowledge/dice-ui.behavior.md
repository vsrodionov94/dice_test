# Dice UI Behavior Spec

## Roll
- Отображается число от 1 до 36
- Только целые числа

## Bet flow
1. Пользователь вводит amount
2. Выбирает Under / Over
3. Нажимает Roll
4. UI ждёт response
5. Показывает:
   - roll
   - win / lose
   - payout
   - обновлённый баланс

## Auto Bet
- start / stop
- delay между ставками
- stop on profit / loss

## Visuals
- Roll появляется мгновенно (без анимаций по умолчанию)

## Initialization

- UI ОБЯЗАН вызвать POST /init при старте
- До успешного ответа ставки запрещены
- Баланс и nonce берутся только из ответа
