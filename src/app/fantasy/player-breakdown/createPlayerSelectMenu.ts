import {
  ActionRowBuilder,
  AnyComponentBuilder,
  SelectMenuComponentOptionData,
  StringSelectMenuBuilder
} from "discord.js";
import Player from "../../../types/endpoints/fantasy/Player";
import getPositionAbbreviation from "../utilities/getPositionAbbreviation";
import getNFLTeamAbbreviation from "../utilities/getNFLTeamAbbreviation";

export default function createPlayerSelectMenu(
  menuId: string,
  activeAndSecuredRoster: Player[]
): ActionRowBuilder<AnyComponentBuilder> {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(menuId)
    .setPlaceholder("Select player(s)...")
    .setMinValues(1)
    .setMaxValues(activeAndSecuredRoster.length)
    .addOptions(createPlayerOptionsList(activeAndSecuredRoster));

  return new ActionRowBuilder().addComponents(selectMenu);
}

function createPlayerOptionsList(activeAndSecuredRoster: Player[]): SelectMenuComponentOptionData[] {
  const playerOptionsList = activeAndSecuredRoster
    .map(function ({ id, fullName, firstName, lastName, positionData, nflTeamData }): SelectMenuComponentOptionData {
      const label = fullName ?? (firstName && lastName ? `${firstName} ${lastName}` : "Name Unavailable");
      const value = id ?? "";

      const playerPosition = getPositionAbbreviation(positionData);
      const teamAbbrevName = getNFLTeamAbbreviation(nflTeamData?.team);

      const description = playerPosition ? `${playerPosition}, ${teamAbbrevName}` : undefined;

      return {
        label,
        value,
        description
      };
    })
    .filter((option) => option.value !== "");

  return playerOptionsList;
}
