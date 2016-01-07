$(document).ready(function () {
    $(".hidden").each(function () {
	$(this).hide();
    });

    var names = [];

    var switch_page = function (what) {
	$("#page").html("");
	$("#page").hide();
	$("#page").html($(what).html());
	$("#page").fadeIn(500);
	return true;
    }

    var bind_home = function () {
	$("#ask-number").click(function () {
	    var nb_people = parseInt($("#number-people").val());
	    var inputs = '';
	    for (var i = 1; i <= nb_people; ++i) {
		inputs += '<h4>Entre ici le prénom de la personne #' + i + '</h4>'
		inputs += '<input type="text" class="input-name" /><br />\n';
	    }	    
	    var current = $("#names").html();
	    current = current.replace('{nb}', nb_people);
	    current = current.replace('{inputs}', inputs);
	    $("#names").html(current);
	    switch_page("#names") && bind_names();
	    return false;
	});
    }

    var bind_names = function () {
	$("#go-loading").click(function () {
	    $(".input-name").each(function () {
		var name = $(this).val();
		if (name.length > 0) {
		    names.push(name);
		}
	    });
	    switch_page("#loading");
	    // $("#galette-loading").fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
	    $("#galette-loading").fadeIn(1000).fadeOut(1000).fadeIn(1000, function () {
		bind_table();
	    });
	    return false;
	});
    }

    var bind_table = function () {
	var assiettes = ["http://www.elle-mosaique.com/428-1181-thickbox/assiette-plate-digoin-modele-cibon.jpg",
			 "http://www.designers-avenue.com/5272-large_default/grand-cru-soft-assiette-27-cm-4-pcs-rosendahl.jpg",
			 "http://www.assiettesetcompagnie.com/wp-content/uploads/2011/04/assiette-shopping-assiettesetcompagnie.jpg",
			 "http://www.cristallerie-de-paris.fr/image/article/boite_de_6_assiettes_creuses_2338.jpg"];

	var copains = "";
	console.log(names);
	for (var i = 0; i < names.length; ++i) {
	    var copain = "";
	    copain += "<div class='copain'>";
	    copain += "<h4>Assiette de <b>" + names[i] + "</b></h4>";
	    copain += "<img width='200' height='200' src='" + assiettes[Math.floor(Math.random() * assiettes.length)] + "' />";
	    copain += "</div>";

	    copains += copain;
	}

	var current = $("#table").html();
	current = current.replace('{copains}', copains);
	$("#table").html(current);
	switch_page("#table");
    }

    switch_page("#home") && bind_home();
});
