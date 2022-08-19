window.onload =  function() {
    const my_img = $("img")

    //creazione div gallery con wrapall
    $(my_img).wrapAll("<div class='my_gallery' />");
    const Gallery_dim = $(".my_gallery img").length;

    //rendo non visibili le immgaini della galleria
    $(".my_gallery img").hide();

    let curr_img = $(".my_gallery img").eq(0);
    curr_img.fadeIn("slow");

    //gestione next button
    $("#nextbutton").click(function() {
        curr_img.hide();
        curr_img = curr_img.next();
        if (curr_img.length == 0)
            curr_img = $(".my_gallery img").eq(0);
        curr_img.fadeIn("slow");
        $(curr_img).css({
            "border" :"7px solid  #b9e2ff"
        });
    });

    //gestione prev button
    $("#prevbutton").click(function() {
        curr_img.hide()
        curr_img = curr_img.prev();
        if (curr_img.length == 0)
            curr_img = $(".my_gallery img").eq(Gallery_dim-1);
        curr_img.fadeIn("slow");
        $(curr_img).css({
            "border" :"7px solid #cdb4ff"
        });
    });

    //parte gestione CSS
    $("body").css({
        "background":"#f6ddcc"
    });

    $(".my_gallery img").css({
        "margin":"30px 63px",
        "border": "7px solid #f5f5f5",
        "box-shadow" : "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
        "border-radius":"4px"
    });

    $("#nextbutton").css({
        "color":"#363636",
        "background-color": "#f6ddcc",
        "font-size": "170%",
        "width":"110px",
        "height":"75px",
        "margin":"10px 200px",
        "border" : "5px solid #b9e2ff",
        "border-radius":"4px"
    });

    $(document).ready(function(){
        $("#nextbutton").hover(function(){
            $(this).css({
                "background-color":"#b9e2ff",
                "transition-duration": "0.5s",
                "box-shadow" : "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)"
            })}, function(){
            $(this).css({
                "background-color":"#f6ddcc",
                "transition-duration": "0.5s",
                "box-shadow" : "none"
            })}
        );
    });

    $("#prevbutton").css({
        "color":"#363636",
        "background-color": "#f6ddcc",
        "font-size": "170%",
        "width":"110px",
        "height":"75px",
        "margin":"10px 210px",
        "border" : "5px solid #cdb4ff",
        "border-radius":"4px"
    });

    $(document).ready(function() {
        $("#prevbutton").hover(function () {
                $(this).css({
                    "background-color": "#cdb4ff",
                    "transition-duration": "0.5s",
                    "box-shadow": "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)"
                })
            }, function () {
                $(this).css({
                    "background-color": "#f6ddcc",
                    "transition-duration": "0.5s",
                    "box-shadow": "none"
                })
            });
    });
};

