'use strict'

$(document).ready(function (){
    $(".dws-form").on("click", ".tab", function() {
        //находим и удаляем класс active в блоке dws-form
        $(".dws-form").find(".active").removeClass("active");

        //добавляем класс active
        $(this).addClass("active");

        //связываем индекс вкладки с индексом формы
        $(".tab-form").eq($(this).index()).addClass("active");
    });
});
