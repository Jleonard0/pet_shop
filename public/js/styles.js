function hide_alert() {
    $('.alert').attr('class', (i, value) => {
        return value + ' ' + 'd-none'
    });
}

$('.alert').delay(10000).queue(hide_alert);
