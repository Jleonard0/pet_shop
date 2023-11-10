function hide_alert() {
    $('.alert').attr('class', (i, value) => {
        return value + ' ' + 'd-none'
    });
}

$('.alert').delay(10000).queue(hide_alert);

$(document).ready(()=>{
    $('#cpf').mask('000.000.000-00');
    $('#telephone').mask('(00) 0 0000-0000');
});