function message(data_message){
    const div_message = $('<div class="alert alert-warning" role="alert"></div>').html(data_message);
    $('#menssages_of_system').append(div_message);
    $('.alert').delay(10000).queue(hide_alert);
}

function savePet(petId, clientId) {
    const pet = {
        id: petId,
        clientId: clientId,
        name: $('#edit_name_pet').val(),
        species: $('#edit_species_pet').val(),
        year_of_birth: $('#edit_year_of_birth_pet').val()
    }
    $.post('/funcionalidade/autualizar_pet/' + clientId + '\/' + petId, { pet: pet }).done((data) => {
        const { id, name, species, year_of_birth } = data.pet;
        $('#pet_name_'+id).html(name);
        $('#pet_species_'+id).html(species);
        $('#pet_age_'+id).html((new Date()).getFullYear() - Date(year_of_birth).getFullYear());
        message(data.message);
    })
}

function loadPet(petId, clientId) {
    $.post('/funcionalidade/informacoes_do_pet/' + clientId + '\/' + petId, { petId: petId, clientId: clientId }).done((data) => {
        const { name, species, year_of_birth } = data.pet;
        $('#edit_name_pet').val(name);
        $('#edit_species_pet').val(species);
        $('#edit_year_of_birth_pet').val(year_of_birth.slice(0, 10));
        $('#btn_save_pet').attr('onclick', 'savePet('+petId+', '+clientId+')');
        message(data.message);
    })
}

function addPet(clientId) {
    const pet = {
        clientId: clientId,
        name: $('#name_pet').val(),
        species: $('#species_pet').val(),
        year_of_birth: $('#year_of_birth_pet').val()
    }
    $.post('/funcionalidade/adicionar_pet/' + clientId, { pet: pet }).done((data) => {
        const { id, name, species, year_of_birth } = data.pet;
        const row = $('<tr id="pet_'+id+'"></tr>');
        const td_name = $('<td id="pet_name_'+id+'"></td>').html(name);
        const td_species = $('<td id="pet_species_'+id+'"></td>').html(species);
        const age = (new Date()).getFullYear() - (new Date(year_of_birth)).getFullYear();
        const td_age = $('<td id="pet_age_'+id+'"></td>').html(age);
        const td_links = $('<td></td>');
        const link_edit = $('<a class="link-primary" onclick="loadPet('+id+', '+clientId+')" data-bs-toggle="modal" data-bs-target="#edit_pet_modal"></a>').html('Editar');
        const link_remove = $('<a class="link-danger" onclick="removePet('+id+', '+clientId+')"></a>').html('Remover');
        td_links.append(link_edit);
        td_links.append(' | ');
        td_links.append(link_remove);
        row.append(td_name);
        row.append(td_species);
        row.append(td_age);
        row.append(td_links);
        $('#table_pets tbody').append(row);
        message(data.message);
    })
}

function removePet(petId, clientId){
    $.post('/funcionalidade/remover_pet/' + clientId + '\/' + petId, { petId: petId, clientId: clientId }).done((data) => {
        $('#pet_'+petId).remove();
        message(data.message);
    })
}