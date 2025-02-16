// Chargement de la page terminé
$(document).ready(function() {
    // Ecoute le formulaire
    $("#signin-index-create").on("submit", function() {
        // Dom du formulaire
        var form = $(this);
        
        // Initialise le loader
        var ladda = Ladda.create(form.find("button[type=submit]").get(0));
        
        // Lance le loader
        ladda.start();
        
        // Réinitialise les erreurs
        form.find(".error").html("").removeClass("error");
        
        // Exécute la requête
        $.ajax({
            url: form.data("url"),
            method: form.data("method"),
            dataType: "json",
            data: form.serialize()
        
        // Réponce du serveur
        }).done(function(json) {
            // Si le formulaire est valide
            if (json.status) {
                // Redirection vers la page de fin
                window.location.href = form.data("done");
                
            // Si il y a des erreurs
            } else {
                if (json.errors && typeof json.errors === "object") {
                    // Recherche les champs a erreur
                    for (var name in json.errors) {
                        form.find(".error-"+name).html(json.errors[name]).addClass("error");
                    }
                }
            }
            
            // Arrête le loader
            ladda.stop();
        });
        
        // Bloque le navigateur
        return false;
    });
});