const $titleimg = $('.titleimg')
const $title = $('.title')
const $desc = $('.desc')
const $date = $('.date')
const $meta = $('.meta')
const $review = $('.review')
const $input = $('input[type="text"]')

let gameData, newGameData, userInput;



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

const $similar0 = $('.similar0');
const $similar1 = $('.similar1');
const $similar2 = $('.similar2');
const $similar3 = $('.similar3');
const $similar4 = $('.similar4');

$('button').on('click', handleGetData2);

function handleGetData2(event) {
    event.preventDefault();

    $.ajax({
        url:'https://api.rawg.io/api/games/' + userInput + '/suggested?page_size=5'
    }).then(
        (data) =>{
            newGameData = data;
            console.log(data);
            render();
        },
        (error) => {
            console.log('WHOOPS: ', error)
        }
    );
}

function render() {
    $titleimg.text(gameData.background_image);
    $title.text(gameData.name);
    $desc.text(gameData.description_raw);
    $date.text(gameData.released);
    $meta.text(gameData.metacritic);
    $review.text(gameData.rating);
    $similar0.text(newGameData.results[0].name);
    $similar1.text(newGameData.results[1].name);
    $similar2.text(newGameData.results[2].name);
    $similar3.text(newGameData.results[3].name);
    $similar4.text(newGameData.results[4].name);
}

