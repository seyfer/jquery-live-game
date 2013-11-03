var dimension = 35;
var chanceOfLiveCell = 0.5;
var table;
var cells;

$(document).ready(function() {

//   alert(1);
    table = $('#main');
    initializeGame();

    cells = table.find('td');
    placeRandomCells();
    playGame();

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
//            trHtml.push('<td>&nbsp</td>');
            trHtml.push('<td></td>');
        }

        trHtml.push('</tr>');
    }
    trHtml = trHtml.join('');

    table.append($(trHtml));

//    consoleLog(trHtml);
}

/**
 * простановка случайных клеток
 * @returns {undefined}
 */
function placeRandomCells()
{
    consoleLog("placeRandomCells");
    for (var y = 0; y < dimension; y++) {
        for (var x = 0; x < dimension; x++) {

            consoleLog("placeRandomCells");
            var cell = getCell(x, y);
            if (Math.random() > chanceOfLiveCell) {
                cell.addClass('alive');
            } else {
                cell.removeClass('alive');
            }
        }
    }
}

/**
 * игра
 * @returns {undefined}
 */
function playGame()
{
    playGeneration();
    setTimeout('playGame()', 500);
}

/**
 * процесс генерации
 * @returns {undefined}
 */
function playGeneration()
{
    prepareNextGeneration();

    consoleLog(cells);
    renderNextGeneration();
}

/**
 * подготовить генерацию
 * @returns {undefined}
 */
function prepareNextGeneration()
{
    for (var y = 0; y < dimension; y++) {
        for (var x = 0; x < dimension; x++) {

            consoleLog("prepareNextGeneration");
            var cell = getCell(x, y);
            var neighbours = getLiveNeighbourCount(x, y);

            cell.prop('isalive', 'false');
            if (isCellAlive(x, y)) {

                consoleLog(neighbours);

                if (neighbours === 2 || neighbours === 3) {
                    cell.prop('isalive', 'true');
                }
            } else if (neighbours === 3) {
                cell.prop('isalive', 'true');
            }
        }
    }
}

/**
 * отрисовка
 * @returns {undefined}
 */
function renderNextGeneration()
{
    cells.each(function() {

        var cell = $(this);

        cell.removeClass('alive');

        if (cell.prop('isalive') === 'true') {
            consoleLog(3);
            cell.addClass('alive');
        }

        cell.prop('isalive', "false");
    });
}

/**
 * кол-во живых соседей
 * @param {type} x
 * @param {type} y
 * @returns {Number}
 */
function getLiveNeighbourCount(x, y)
{
//    consoleLog("getLiveNeighbourCount");

    var count = 0;
    if (isCellAlive(x - 1, y - 1)) count++;
    if (isCellAlive(x, y - 1)) count++;
    if (isCellAlive(x + 1, y - 1)) count++;

    if (isCellAlive(x - 1, y)) count++;
    if (isCellAlive(x + 1, y)) count++;

    if (isCellAlive(x - 1, y + 1)) count++;
    if (isCellAlive(x, y + 1)) count++;
    if (isCellAlive(x + 1, y + 1)) count++;

    return count;
}

/**
 * живая ли клетка
 * @param {type} x
 * @param {type} y
 * @returns {unresolved}
 */
function isCellAlive(x, y)
{
    var cell = getCell(x, y);

//    consoleLog(cell);
//    consoleLog(cell.prop('class'));

    return cell.prop('class') === 'alive';
}

/**
 * получить ячейку
 * @param {type} x
 * @param {type} y
 * @returns {unresolved}
 */
function getCell(x, y)
{
    if (x >= dimension) {
        x = 0;
    }
    if (y >= dimension) {
        y = 0;
    }
    if (x < 0) {
        x = dimension - 1;
    }
    if (y < 0) {
        y = dimension - 1;
    }

    var getted = $(cells[y * dimension + x]);
//    consoleLog("getted");
//    consoleLog(getted);

    return getted;
}

/**
 * лог переключалка
 * @param {type} item
 * @returns {undefined}
 */
function consoleLog(item)
{
    var log = false;

    if (log) {
        console.log(item);
    }
}