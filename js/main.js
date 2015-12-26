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
			'<td>' + arr[i].name + '</td>' +
			'<td>' + arr[i].sum + '</td>' +
			'<td><span class="delete"></span></td>' +
			'</tr>');
	}
	
};

// функция добавления продукта в список
app.prototype.addProduct = function(form) {
		
		var data = form.serializeArray();
		var list = this.prodList;

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

        if (flag) this.prodList.push(elem);
        
        this.renderList();
}

// отметить покупку
app.prototype.markList = function (el) {

	var rem    = el.hasClass('done');
	var elName = el.find('td:nth-child(2)').text();
	var list   = this.prodList;
	
	rem ? el.removeClass('done') : el.addClass('done');

	for (var i = 0; i < list.length; i++) {
    	if (list[i].name == elName) {
    		rem ? list[i].done = false : list[i].done = true;
    	}
    }
}

// удалить покупку
app.prototype.deleteItem = function (el) {

	var cur     = el.closest('tr')
	var elName = cur.find('td:nth-child(2)').text();
	var list   = this.prodList;
	
	cur.remove();
	
	for (var i = 0; i < list.length; i++) {
    	if (list[i].name == elName) {
    		list.splice(i,1);
    	}
    }
}

// прослушка событий
app.prototype.initEvents = function () {

	var self = this;
	var list = this.prodList;

	// добавление продукта
    $(document.body).on('submit', '#addform', function (e) {      
        e.preventDefault();
        self.addProduct($(this));
    });

    // пометить купленный продукт
    $(document.body).on('click', '.prodline', function(e) {
    	self.markList($(this));
    });

    // удалить элемент
    $(document.body).on('click', '.delete', function(e) {
    	e.stopPropagation();
    	self.deleteItem($(this));   	
    });

    // скрыть/показать код
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