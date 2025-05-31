import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import DiscordCommand from "../Command";
import DiscordClient from "../Client";
import CommandCategory from "../../../types/discord/CommandCategory";
import retryCall from "../../fantasy/endpoints/retryCall";
import getFantasyLeague from "../../fantasy/endpoints/getFantasyLeague";
import findMyTeamInMatchup from "../../fantasy/utilities/findMyTeamInMatchup";
import findMyWeeklyFantasyMatchup from "../../fantasy/utilities/findMyWeeklyFantasyMatchup";

export default class TestingCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "testing",
      desciption: "testing command for developing purposes",
      category: CommandCategory.test,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: []
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const fantasyLeague = await retryCall(getFantasyLeague);

    if (!fantasyLeague) {
      console.log("no response");
      return;
    }

    const { opponentTeam } = findMyTeamInMatchup(findMyWeeklyFantasyMatchup(fantasyLeague.schedule) ?? {});

    console.log(opponentTeam?.totalRoster);
  }
}
