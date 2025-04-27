# _FIRST_ Discord Bot

![build workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/build.yml/badge.svg)
![publish workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/publish.yml/badge.svg)
![deploy qa workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/deploy-qa.yml/badge.svg)
![deploy prod workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/deploy-prod.yml/badge.svg)

## Environment Variables

This project requires a `.env` file in the root directory. The expected variables include:
- `TOKEN`: Your [Discord](https://discord.com/developers/docs/reference) API token.
- `CLIENT_ID`: Your [Discord](https://support-dev.discord.com/hc/en-us/articles/360028717192-Where-can-I-find-my-Application-Team-Server-ID) application ID.
- `GUILD_ID`: Your [Discord](https://support-dev.discord.com/hc/en-us/articles/360028717192-Where-can-I-find-my-Application-Team-Server-ID) server ID.
- `WEATHER_API_KEY`: TBD
- `DEFAULT_ZIP`: TBD
- `RESTRICTED_CHANNEL`: TBD
- `MOD_REPORT_CHANNEL`: TBD
- `SERIOUS_CHANNELS`: TBD

## Migrations

`knex migrate:make NAME --client mysql2 --migrations-directory src/migrations -x ts`