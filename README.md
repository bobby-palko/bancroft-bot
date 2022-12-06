# Bancroft Bot

A discord bot that integrates into my Home Assistant instance

## Set up

First, set up a bot. You can follow the [guide on discordJS](https://discordjs.guide/preparations/setting-up-a-bot-application.html) if you're not sure how.

Then, you'll need your own `.env` file with the following variables:

- DISCORD_TOKEN: Your bot's token that was generated when following the previous guide
- GUILD_ID: The ID for your discord server. If you don't know how to find this, [this guide from Discord](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) will walk you through the steps
- APP_ID: Your bot's "CLIENT_ID"
- HA_TOKEN: A [long lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) generated on your profile in your Home Assistant instance
- BASE_HA_URL: The domain or IP:Port address of your Home Assistant instance. `http://192.168.1.5:8123` for example
- ALARM_CODE: Used for the alarm integration.

Then, build the docker container:

```
docker build -t bancroft-bot
```

## Deploying

Start the bot!

```
docker run bancroft-bot
```

## Developing

To build the bot for a development environment, run:

```
docker compose build app
```

Then start it up with

```
docker compose up
```

The bot will auto reload on any new changes. Any additional packages or dependencies will require a rebuild, and any new commands will need to [be registered](https://discordjs.guide/creating-your-bot/command-deployment.html) with discord to show up.
