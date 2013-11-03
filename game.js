var dimension = 15;
var chanceOfLiveCell = 0.5;
var table;
var cells;

$(document).ready(function() {

//   alert(1);
    table = $('#main');
    initializeGame();

    cells = table.find('td');
    placeRandomCells();

});

/**
 * инициализация
 * @returns {undefined}
 */
function initializeGame()
{
    var trHtml = [];
    for (var y = 0; y < dimension; y++) {

        trHtml.push('<tr>');
        for (var x = 0; x < dimension; x++) {
            trHtml.push('<td>&nbsp</td>');
        }

        trHtml.push('</tr>');
    }
    trHtml = trHtml.join('');

    table.append($(trHtml));

//    console.log(trHtml);
}

/**
 * простановка случайных клеток
 * @returns {undefined}
 */
function placeRandomCells()
{
    for (var y = 0; y < dimension; y++) {
        for (var x = 0; x < dimension; x++) {

            var cell = getCell(x, y);
            if (Math.random() > chanceOfLiveCell) {
                cell.addClass('alive');
            } else {
                cell.removeClass('alive');
            }
        }
    }
}