const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    function digitalCalendar(clock, dayAll , calendar, btnPlayClock, btnPlayCalendar){
        let clockTempo = null;
        const $container = d.querySelectorAll(".container button"),
            $btnPlayClock = d.querySelector(btnPlayClock),
            $btnPlayCalendar = d.querySelector(btnPlayCalendar);
        //Verifica si el botón existe antes de agregar el event listener

        function updateDisplay(){
            const date = new Date();
                const amPm = date.toLocaleTimeString("en-US", { hour12: true}).split(" ")[1];
                const [hour, minutes, seconds, week, day, month, year] = [
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getDay(),
                    date.getDate(),
                    date.getMonth()+1,
                    date.getFullYear(), 
                    ];
                d.querySelector(clock).innerHTML = `<h2> ${hour % 12 || 12}:${String(minutes).padStart(2, "0")}</h2><p>${amPm}<br>${String(seconds).padStart(2, "0")}</p>`;
                d.querySelector(dayAll).innerHTML = `<p>Dia:${day} Mes:${month} año:${year}</p>`
        };

        function updateCalendar(){
            d.querySelector(calendar).innerHTML = `<h2>Calendario</h2>`;
        };

        $btnPlayClock.addEventListener("click", (ev) =>{
            const btn = ev.currentTarget,
                running = btn.classList.contains("active");

            if(!running){
                clockTempo = setInterval(() => {
                    updateDisplay();
                }, 0);
                ev.stopPropagation();
                $container.forEach(button => {
                    button.classList.add("active");
                });
            }else{
                setTimeout(() => {
                    clearInterval(clockTempo);
                    d.querySelector(clock).innerHTML = null;
                    d.querySelector(dayAll).innerHTML = null;
                }, 600);
                $container.forEach(button => {
                    button.classList.remove("active");
                });
            }
            
        });
        $btnPlayCalendar.addEventListener("click", (ev) => {
            const btn = ev.currentTarget,
                running = btn.classList.contains("active2");
            
            if(!running){
                /* updateCalendar(); */
                ev.stopPropagation();
                $container.forEach(button => {
                    button.classList.add("active2");
                });
            }else{
                setTimeout(() => {
                    clearInterval(clockTempo);
                    /* d.querySelector(calendar).innerHTML = null; */
                }, 600);
                $container.forEach(button => {
                    button.classList.remove("active2");
                });
            }
        });
    };
    digitalCalendar("#clock", "#date" , "#calendar", "#btnClock", "#btnCalendar");
});