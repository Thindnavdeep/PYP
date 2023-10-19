let toggle=document.querySelector(".toggle");
let links=document.querySelector(".links")
toggle.addEventListener('click',function(){
    toggle.classList.toggle('active');
    links.classList.toggle('active');
})
$(window).on("load",()=>{
    $("#loader").delay(3000).fadeOut("slow");
})