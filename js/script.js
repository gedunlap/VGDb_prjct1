const $title = $('.title')
const $desc = $('.desc')
const $input = $('input[type="text"]')

let gameData, userInput;

$('form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();

    userInput = $input.val().replace(/ /g, '-');

    console.log(userInput);

    $.ajax({
        url:'https://api.rawg.io/api/games/' + userInput
    }).then(
        (data) => {
            gameData = data;
            render();
            console.log(data);
        },
        (error) => {
            console.log(`That's not quite right: `, error);
        }
    )
}

function render() {
    $title.text(gameData.name);
    $desc.text(gameData.description_raw);
}