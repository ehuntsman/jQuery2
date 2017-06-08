$(document).ready(function(){

    if(localStorage.getItem('rexasaur1')){
        $('#newList.list-group').html(localStorage.getItem('rexasaur1'));
    }
    if(localStorage.getItem('rexasaur2')){
        $('#currentList.list-group').html(localStorage.getItem('rexasaur2'));
    }
    if(localStorage.getItem('rexasaur3')){
        $('#archivedList.list-group').html(localStorage.getItem('rexasaur3'));
    }

    var listo = [];
    var Task = function(task){
        this.task = task;
        this.id = 'new';
    }
    var addTask = function(task) {
        if(task) {
            task = new Task(task);
		    listo.push(task);

            $('#newItemInput').val('');
		    $('#newList').append(
                '<a href="#finish" class="" id="item">' + '<li class="list-group-item">' + '<h3>'
                + task.task + '</h3>'+ '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' + '</span>' + '</li>' + '</a>'
            );
        }
        $('#newTaskForm').slideToggle('fast', 'linear');
    };

    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                } else {
                    listo.splice(i, 1);
                }
            break;
            }
        }
        task.remove();
        localStorage.setItem('rexasaur1', $('#newList').html());
        localStorage.setItem('rexasaur2', $('#currentList').html());
        localStorage.setItem('rexasaur3', $('#archivedList').html());
    };

    $('#newTaskForm').hide();
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
        localStorage.setItem('rexasaur1', $('#newList').html());
    });

    $('#add-todo').on('click', function () {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });

    $(document).on('click', '#item', function(e) {
        e.preventDefault(); //just prevents the default from happening, like the reset.css files

        var task = this;
        advanceTask(task);
        this.id = "inProgress";
        $('#currentList').append(this.outerHTML);
        localStorage.setItem('rexasaur1', $('#newList').html());
        localStorage.setItem('rexasaur2', $('#currentList').html());
        localStorage.setItem('rexasaur3', $('#archivedList').html());
    });

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
        localStorage.setItem('rexasaur1', $('#newList').html());
        localStorage.setItem('rexasaur2', $('#currentList').html());
        localStorage.setItem('rexasaur3', $('#archivedList').html());
    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        localStorage.setItem('rexasaur1', $('#newList').html());
        localStorage.setItem('rexasaur2', $('#currentList').html());
        localStorage.setItem('rexasaur3', $('#archivedList').html());
    });
    
})