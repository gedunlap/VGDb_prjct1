const $title = $('#name')
const $desc = $('#desc')

$('form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();
}