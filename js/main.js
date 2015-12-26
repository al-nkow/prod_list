var app;

function app() {
	this.prodList = [{
		name: 'Apple',
		sum: 3,
		done: false
	},{
		name: 'Bread',
		sum: 2,
		done: false
	},{
		name: 'Beer',
		sum: 12,
		done: true
	},{
		name: 'Сheese',
		sum: 6,
		done: false
	},{
		name: 'Pliers',
		sum: 1,
		done: false
	}];
};

// функция рендеринга таблицы покупок
app.prototype.renderList = function() {

	var arr   = this.prodList;
	var tbody = $('#products tbody');

	tbody.text('');

	for (var i = 0; i < arr.length; i++) {
	    
	    var elClass = arr[i].done ? ' done' : '';
	
	    tbody.append('<tr class="prodline ' + elClass + '">' +
			'<td><span class="marker"></span></td>' +
			'<td>' + arr[i].name +'</td>' +
			'<td>' + arr[i].sum +'</td>' +
			'</tr>');
	}
	
};

// прослушка событий
app.prototype.initEvents = function () {

	var self = this;
	var list = this.prodList;

	// добавление продукта
    $(document.body).on('submit', '#addform', function (e) {
        
        e.preventDefault();

        var data = $(this).serializeArray();

        // если не заполнены поля - ничего не добавляем
        if (data[0].value == '' || data[1].value == '') {
        	return false
        }
        
        var flag = true;
        var elem = {
        	name: data[0].value,
        	sum: data[1].value,
        	done: false
        };

        // поиск продукта в списке с таким же названием
        for (var i = 0; i < list.length; i++) {
        	if (list[i].name == data[0].value) {
        		flag = false;
        		list[i].sum = +data[1].value + +list[i].sum;
        	}
        }

        if (flag) self.prodList.push(elem);
        
        self.renderList();

    });

    // пометить купленный продукт
    $(document.body).on('click', '.prodline', function(e) {

    	var rem    = $(this).hasClass('done');
    	var elName = $(this).find('td:nth-child(2)').text();
    	
    	rem ? $(this).removeClass('done') : $(this).addClass('done');

    	for (var i = 0; i < list.length; i++) {
        	if (list[i].name == elName) {
        		rem ? list[i].done = false : list[i].done = true;
        	}
        }
    });

    $(document.body).on('click', '.source', function(e) {
    	$('.code-wrap').toggle();
    });

};

// инициализация
app.prototype.init = function() {

	this.renderList();
	this.initEvents();

};

(function() {

	var cart = new app();

    cart.init();

})()