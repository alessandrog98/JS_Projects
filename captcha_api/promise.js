$(document).ready(function() {
    var session_id;

    //Funzione rischiesta ID sessione + rischiesta e stampa immagine captcha
    function captcha_session_req() {
        $.ajax({
               type:'GET',
               url: 'http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getIdentifier',
               timeout: 2000,
               dataType: 'json',
           }).then(function(data){
               session_id = data.id;
               return $.ajax({
                   type:'POST',
                   url: 'https://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getImage&id='+session_id,
                   timeout: 2000,
                   dataType: 'json',
        });
            }).done(function(data){
                var session_image = data.url;
                $('#captcha').attr("src","http://www.dais.unive.it/~cosmo/teaching/esercitazione3/"+session_image);
                show_UI();
            }).fail(function(){
                alert('Errore nella richiesta!');
                setTimeout(function() {
                    hide_UI();
                    captcha_session_req(); }, 1000);
            });
    };

    //Funzione gestione click bottone "ok": invio risposta utente + verifica autenticazione
    $("#ok").click(function () {
        let user_insert = $('input').val()
        console.log(user_insert);
        $.ajax({
            type: "POST",
            url : "http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&sendCode&id="+session_id+"&code="+user_insert,
            timeout: 2000,
            dataType: 'json'
        }).done(function(data){
            if(data.auth) {
                hide_UI();
                alert('Autenticazione Eseguita correttamente');
            }
            else {
                hide_UI();
                alert('Autenticazione fallita !');
                setTimeout(function(){
                    captcha_session_req(); }, 1000);
            }
        }).fail(function(){
            alert('Errore nella richiesta!');
            setTimeout(function() {
                hide_UI();
                captcha_session_req();
            });
        });
    });

    //Funzioni di gestione della UI
    function hide_UI(){
        $("#ok").hide();
        $("#captcha").hide();
        $("#captcha_code").hide();
    }

    function show_UI(){
        $("#ok").show();
        $("#captcha").show();
        $("#captcha_code").show();
    }

    //CSS gestione style
    $("#captcha").css({
        "height": "200px",
        "width" : "350px",
        "border-radius": "2px",
        "border": "2px solid #ccc",
        "transition-duration": "0.6s",
    });
    $("#captcha_code").css({
        "width": "255px",
        "box-sizing": "border-box",
        "border": "2px solid #ccc",
        "border-radius": "5px",
        "font-size": "20px",
        "margin" : "4px 2px",
        "background-color": "white",
        "background-image": "url(\"templates/key.png\")",
        "background-position": "10px 10px",
        "background-repeat": "no-repeat",
        "transition-duration": "0.6s",
        "padding": "12px 20px 12px 40px",
    })
    $("#ok").css({
        "background-color": "white",
        "color": "black",
        "border": "2px solid #ccc",
        "margin" : "6px 2px",
        "border-radius": "3px",
        "padding": "12px 30px",
        "text-decoration": "none",
        "font-size": "16px",
        "transition-duration": "0.6s",
        "cursor": "pointer",
    });

    $(document).ready(function() {
        $("#ok").hover(function () {
                $(this).css({
                    "background-color": "#ccc",
                })
            }, function () {
                $(this).css({
                    "background-color": "white",
                })
            }
        )
    });

    function main(){
        captcha_session_req();
    }

    main();

});

