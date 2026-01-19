POST /bet

Request:
{
  "amount": number,
  "target": number,
  "condition": "UNDER" | "OVER"
}

Response:
{
  "roll": number,
  "win": boolean,
  "payout": number,
  "balance": number,
  "nonce": number
}

POST /init

Request:
{
  "balance"?: number
}

Response:
{
  "balance": number,
  "nonce": number
}
