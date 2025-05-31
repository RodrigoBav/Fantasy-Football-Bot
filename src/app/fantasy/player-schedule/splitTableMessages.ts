import { Align, getMarkdownTable, Row } from "markdown-table-ts";

export default function splitTableMessages(tableRows: Row[], myTeamName: string, oppTeamName: string): string[] {
  const gameTableRowsData: Row[][] = [];
  var gameRowStartingIndex = 0;

  tableRows.forEach(function (row, index) {
    if (row[0].length > 0) {
      // Finds the separator row, which is the last entry for a game row section
      const isLastRow = index + 1 === tableRows.length;
      const isSeparatorRow = row[0].includes("-") && row[1].includes("-") && row[2].includes("-");

      // If it is not the separator row, then assumes it is the game name row which is the start of a game entry
      if (!isSeparatorRow) {
        gameRowStartingIndex = index;
      }

      // separator rows indicate end of game row entry
      if (isSeparatorRow || isLastRow) {
        const endIndex = isLastRow ? undefined : index + 1;

        gameTableRowsData.push(tableRows.slice(gameRowStartingIndex, endIndex));
      }
    }
  });

  const tablesInRows = splitIntoTwoTables(gameTableRowsData).map((tableRows) => {
    const lastRow = tableRows[tableRows.length - 1];

    // remove the last row separator from one of the tables
    if (lastRow[0].includes("-") && lastRow[1].includes("-") && lastRow[2].includes("-")) {
      const lastIndex = tableRows.length - 2 > 0 ? tableRows.length - 2 : undefined;
      return tableRows.slice(0, lastIndex);
    }

    return tableRows;
  });

  return tablesInRows.map((tableRows) =>
    getMarkdownTable({
      table: {
        head: ["Game", myTeamName, oppTeamName],
        body: tableRows
      },
      alignment: [Align.Center, Align.Left, Align.Left]
    })
  );
}

function splitIntoTwoTables(gameEntryRows: Row[][]): Row[][] {
  // Sort the array in descending order
  const sortedRowData = gameEntryRows.sort((a, b) => b.length - a.length);

  // Initialize two arrays to hold the results
  const tableRows1: Row[] = [];
  const tableRows2: Row[] = [];

  // Initialize sums for both arrays
  let tableRows1Sum = 0;
  let tableRows2Sum = 0;

  // Distribute each number to the subarray with the smaller sum
  sortedRowData.forEach(function (gameRows) {
    if (tableRows1Sum <= tableRows2Sum) {
      tableRows1.push(...gameRows);
      tableRows1Sum += gameRows.length;
    } else {
      tableRows2.push(...gameRows);
      tableRows2Sum += gameRows.length;
    }
  });

  return [tableRows1, tableRows2];
}
