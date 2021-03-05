

const $title = $('.title')
const $desc = $('.desc')
const $date = $('.date')
const $meta = $('.meta')
const $input = $('input[type="text"]')

let gameData, newGameData, userInput;

$('.icon').click(function(){
    location.reload();
});

$('form').on('submit', handleGetData);

function handleGetData(event) {
    $('#similar').empty();

    event && event.preventDefault();
    
    userInput = $input.val().replace(/['’:]/g, '').replace(/ /g, '-');

    console.log(userInput);

    $.ajax({
        url:'https://api.rawg.io/api/games/' + userInput
    }).then(
        (data) => {
            console.log(data.redirect);
            if(data.hasOwnProperty("redirect")) {
               $input.val(data.slug);
               handleGetData();  
            } else {
                gameData = data;
                render();
                console.log(data);
            }
        },
        (error) => {
            console.log(`That's not quite right: `, error);
        }
    );
}


$('button').on('click', handleGetData2);

function handleGetData2(event) {
    $('#similar').empty();
    $('#similar').html('Click title below to see info.');
    event.preventDefault();

    $.ajax({
        url:'https://api.rawg.io/api/games/' + userInput + '/suggested?page_size=5'
    }).then(
        (data) =>{
            newGameData = data;
            console.log(data);
            render2();
        },
        (error) => {
            console.log('WHOOPS: ', error)
        }
    );


}



function render() {
    $(".gameimg").attr("src", gameData.background_image);
    $title.text(gameData.name);
    $desc.text("Description: " + gameData.description_raw);
    $date.text(gameData.released);
    $meta.text(gameData.metacritic);
}

function render2() {

    $.each(newGameData.results, function(index, item) {
        $('#similar').append('<li>' + item.name + '</li>');
    });
}


$("#similar").on('click','li',function (){
    var gameSearch = $(this).text().replace(/['’:]/g, '').replace(/ /g, '-');

    console.log(gameSearch)

    $.ajax({
        url:'https://api.rawg.io/api/games/' + gameSearch
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
});
