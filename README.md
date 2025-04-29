# _FIRST_ Discord Bot

![build workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/build.yml/badge.svg)
![publish workflow](https://github.com/drewwhis/first-discord-bot/actions/workflows/publish.yml/badge.svg)

## Docker

This project can be started by using the `docker-compose.yml` file.

This project requires a `secrets` folder in the same directory as the `docker-compose.yml` file, containing one file for each secret. The expected values include:
- `discord_token.txt`: Your [Discord](https://discord.com/developers/docs/reference) API token.
- `application_id.txt`: Your [Discord](https://support-dev.discord.com/hc/en-us/articles/360028717192-Where-can-I-find-my-Application-Team-Server-ID) application ID.
- `server_guild_id.txt`: Your [Discord](https://support-dev.discord.com/hc/en-us/articles/360028717192-Where-can-I-find-my-Application-Team-Server-ID) server ID.
- `weather_api_key.txt`: The API key for [https://www.weatherapi.com](https://www.weatherapi.com).
- `default_zip.txt`: The default ZIP code to use for [https://www.weatherapi.com](https://www.weatherapi.com).
- `restricted_channel.txt`: A safe channel for mentor-only content.
- `mod_report_channel.txt`: The channel red and yellow cards should be reported to.
- `serious_channels.txt`: A comma-separated list of channels that joke actions should not run in.
- `db_host.txt`: The container name of the MySQL database in the Docker network.
- `db_password.txt`: The root password for the MySQL database in the Docker network.
- `db_port.txt`: The port for the MySQL database container in the Docker network.


## Migrations

To add a new migration:

`knex migrate:make NAME --client mysql2 --migrations-directory src/migrations -x ts`

## Seed

To add a new seed:

`knex seed:make ../src/seeds/NAME -x ts`