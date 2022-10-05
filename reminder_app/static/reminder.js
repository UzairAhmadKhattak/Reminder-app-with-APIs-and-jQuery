
$(document).ready(function(){
    populate_reminder_data()
              
})

function populate_reminder_data(){
    $.ajax({
        url: "/reminder/API/GET_reminders/",
        datetype:'JSON',
        type: 'GET',
        success: function(response) {
    
            for(var i=0;i<response.length;i++){
            $("#reminder_table").append("<tr id="+response[i].id+">"+
                    "<th scope='row'>"+String(i+1)+"</th>"+
                    "<td>"+response[i].heading+"</td>"+
                    "<td>"+response[i].description+"</td>"+
                    "<td>"+response[i].reminder_time.replace("T"," ").replace("Z","").slice(0,-3)+"</td>"+
                    "<td>"+
                        "<div class='btn-group'>"+
                            
                            "<button type='button' class='btn btn-success dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
                            "<span class='sr-only'>Toggle Dropdown</span>"+
                            "Operation </button>"+
                            "<div class='dropdown-menu'>"+
                            "<button id=save_"+response[i].id+" onclick = save_editing(this.id) class='dropdown-item' disabled>Save</button>"+
                            "<button id=edit_"+response[i].id+" onclick = edit_reminder(this.id) class='dropdown-item'>Edit</button>"+
                            "<button id=delete_"+response[i].id+" onclick = delete_reminder(this.id) class='dropdown-item'>Delete</button>"+
                            "</div>"+
                        "</div>"+
                    "</td>"+
                "</tr>")
            }
        }
    })
    
}

function save_editing(id){
    id_num = id.split("_").slice(1)
    var name = $("#edit_name").val()
    var description = $("#edit_dis").val()
    var reminder_date_time = $("#edit_remind").val()
    reminder_date_time = reminder_date_time.replace("T"," ")
    scrf = getCookie("csrftoken")

    var post_data ={  

        "heading": name,
        "reminder_time": reminder_date_time,
        "description": description
    }
    $.ajax({
        url: `/reminder/API/update_reminder/${id_num}`,
        datetype:'JSON',
        type: 'PUT',
        headers:{"X-CSRFToken":scrf},
        data:post_data,
        success: function(response) {
            if (String(response).includes("reminder updated")) {
                alert(`Reminer:${name} updated`)
                location.reload()
            }
            else alert(`unable to update Reminer:${name}`)

        }
    })

}

function edit_reminder(id){
    id_num = id.split("_").slice(1)
    save_button = $("#save_"+id_num).prop("disabled",false)
    edit_button = $("#edit_"+id_num).prop("disabled",true)
    delete_button = $("#delete_"+id_num).prop("disabled",true)

    row = $('tr')[id_num]
    col2 = row.cells[1]
    col3 = row.cells[2]
    col4 = row.cells[3]
    nametext = col2.textContent
    disctext = col3.textContent
    datetext = col4.textContent
    
    $(`<td><input id = "edit_name" value='${nametext}' class='form-control form-control-sm'></td>`).replaceAll(col2)
    $(`<td><input id = "edit_dis"  value='${disctext}' class='form-control form-control-sm'></td>`).replaceAll(col3)
    $(`<td><input id = "edit_remind" type="datetime-local" value='${datetext}' class='form-control form-control-sm'></td>`).replaceAll(col4)

}

function delete_reminder(id){
    id_num = id.split("_").slice(1)
    scrf = getCookie("csrftoken")
    $.ajax({
        url: `/reminder/API/delete_reminder/${id_num}`,
        type: 'DELETE',
        headers:{"X-CSRFToken":scrf},
        success: function(response) {
            if (String(response).includes("reminder deleted")) {
                alert(`Reminer deleted`)
                location.reload()
            }
        }
    })
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;}

function create_new_reminder(){
    var name = $("#name").val()
    var description = $("#dis").val()
    var reminder_date_time = $("#remind").val()
    reminder_date_time = reminder_date_time.replace("T"," ")
    scrf = getCookie("csrftoken")

    var post_data ={  

        "heading": name,
        "reminder_time": reminder_date_time,
        "description": description
    }
    $.ajax({
        url: "/reminder/API/create_reminder/",
        datetype:'JSON',
        type: 'POST',
        headers:{"X-CSRFToken":scrf},
        data:post_data,
        success: function(response) {
            if (String(response).includes("reminder created")) {
                alert(`Reminer:${name} created`)
                location.reload()
            }

        }
    })  
} 