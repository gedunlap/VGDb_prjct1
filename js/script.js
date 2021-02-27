const $titleimg = $('.titleimg')
const $title = $('.title')
const $desc = $('.desc')
const $date = $('.date')
const $meta = $('.meta')
const $review = $('.review')
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
    );

    // $('.titleimg').html('<img src="https://media.rawg.io/media/games/0bc/0bcc108295a244b488d5c25f7d867220.jpg"');
}

$('button').on('click', handleGetData2);

function handleGetData2(event) {
    event.preventDefault();
    
}

function render() {
    $titleimg.text(gameData.background_image);
    $title.text(gameData.name);
    $desc.text(gameData.description_raw);
    $date.text(gameData.released);
    $meta.text(gameData.metacritic);
    $review.text(gameData.rating);
}