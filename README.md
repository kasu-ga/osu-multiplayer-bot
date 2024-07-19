# Osu Multiplayer Bot

> Multiplayer bot for osu! written in nodejs

Osu Multiplayer Bot is a simple solution to create multiplayer rooms with an auto host rotate system already included. Being built using Bun, the end user only needs to modify a `JSON` file and run the binary corresponding to their operating system.

## Setup

### Installation

In the download section, install the most recent version that corresponds to your operating system and architecture. Once downloaded, unzip the ZIP file and open the resulting folder.

### Customization

Open the `settings.json` file with notepad or your favorite text editor.

Inside you must modify the following properties based on what is indicated in the table:

| Name          | Description                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user.username | This is the username of your osu account (or the bot to use), write it as it appears in your profile.                                                                                       |
| user.password | This is the password generated in the osu portal, if you don't have it yet, check this [guide](https://github.com/kasu-ga/osu-multiplayer-bot/blob/main/docs/irc-password.md) to obtain it. |
| apikey        | API Key of the official Osu API, check this [guide](https://github.com/kasu-ga/osu-multiplayer-bot/blob/main/docs/api-key.md) if you don't have it yet.                                     |
| prefix        | Symbol used to recognize when it is a command that the bot must listen to. By default it is `!`                                                                                             |

In the `rooms` property there will be the rooms that must be created. Consider that the free API allows 4 simultaneous rooms, otherwise you will have to close them to create a new one.

It will seem complicated if you are not familiar with the code, but you will see that it is simple.

Among the `[]` are the different rooms, each `{}` is a room, to create a room you can modify the one that already exists or delete it and place another one, the options for each room are the following:

| Option     | Type      | Description                                                                                                                   |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| name       | `string`  | Room name                                                                                                                     |
| slots      | `number`  | Room slots                                                                                                                    |
| beatmapId  | `number`  | Default room beatmap                                                                                                          |
| difficulty | `object`  | The object has two self-explanatory properties `min` and `max`, that is, the maximum and minimum difficulty used in the room. |
| password   | `string`  | Room password                                                                                                                 |
| privated   | `boolean` | `true` if the room is private and `false` if it is public.                                                                    |

e.g:

```json
{
  "rooms": [
    {
      "name": "0.0* - 3.0* | Auto Host Rotate",
      "slots": 16,
      "beadmapId": 4686663,
      "difficulty": {
        "min": 0,
        "max": 3.1
      },
      "password": "",
      "privated": false
    }
  ]
}
```

## Start Bot

Now yes, it is time to play, to do this run the `start` file and a console will open where you will find a message confirming the creation of the rooms or otherwise you will find errors that may have occurred.

## Contribution

Contributions are welcome so do not hesitate to make them, they will be reviewed and integrated as quickly as possible so that this project continues to grow and improve day by day.

## License

[MIT LICENSE](https://github.com/kasu-ga/shirayukii/blob/main/LICENSE.md)
