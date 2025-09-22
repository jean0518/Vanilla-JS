const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    function digitalCalendar(clock, dayAll , btnPlayClock, calendar ,btnPlayCalendar, weekDays, mothYearElement, datesElement, prevMothBtn, nextMothBtn){
        let clockTempo = null;
        let currentDate = new Date();
        const $container = d.querySelectorAll(".container button"),
            $btnPlayClock = d.querySelector(btnPlayClock),
            $btnPlayCalendar = d.querySelector(btnPlayCalendar),
            $calendar = d.querySelector(calendar),
            $weekDays = d.querySelector(weekDays),
            $mothYear = d.querySelector(mothYearElement),
            $dateElement = d.querySelector(datesElement),
            $prevMothBtn = d.querySelector(prevMothBtn),
            $nextMothBtn = d.querySelector(nextMothBtn);
        //Verifica si el botón existe antes de agregar el event listener

        function updateDisplay(){
            const date = new Date();
                const amPm = date.toLocaleTimeString("en-US", { hour12: true}).split(" ")[1];
                const [hour, minutes, seconds, day, month, year] = [
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getDate(),
                    date.getMonth()+1,
                    date.getFullYear(), 
                    ];
                d.querySelector(clock).innerHTML = `<h2> ${hour % 12 || 12}:${String(minutes).padStart(2, "0")}</h2><p>${amPm}<br>${String(seconds).padStart(2, "0")}</p>`;
                d.querySelector(dayAll).innerHTML = `<p>Dia:${day} Mes:${month} año:${year}</p>`
        };

        function weekDaysArray () {
            const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
            for(i = 0; i < days.length; i++){
                    let th = d.createElement("th");
                    th.className = "day";
                    th.textContent = days[i];
                    $weekDays.appendChild(th);
                }
        }
        function updateCalendar(){
            const currentYear = currentDate.getFullYear(),
                currentMonth = currentDate.getMonth(),
                firstDay = new Date(currentYear, currentMonth, 0),
                lastDay = new Date(currentYear, currentMonth + 1, 0);

                const mothYearString = currentDate.toLocaleString("default", {month: "long", year: "numeric"});
                $mothYear.textContent = mothYearString;

                let datesHTML = "";
                let i;

                for(i = firstDay.getDay(); i > 0; i--){
                    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
                    datesHTML += `<div class="date inactive"> ${prevDate.getDate()}</div>`;
                }
                for(i = 1; i <= lastDay.getDate(); i++){
                    const date = new Date(currentYear, currentMonth, i);
                    const activeClass = date.toDateString() === new Date().toDateString() ? "active" : "";
                    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
                }
                for(i = 1; i <= 7 - lastDay.getDay(); i++){
                    const nextDate = new Date(currentYear, currentMonth + 1, i);
                    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
                }

                $dateElement.innerHTML = datesHTML;
            
        }
            $prevMothBtn.addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });
            $nextMothBtn.addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

        
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
                $calendar.classList.remove("calendar");
                updateCalendar();
                weekDaysArray();
                ev.stopPropagation();
                $container.forEach(button => {
                    button.classList.add("active2");
                });
            }else{
                setTimeout(() => {
                    clearInterval(clockTempo);
                    $calendar.classList.add("calendar");
                    d.querySelector(weekDays).innerHTML = null;
                    d.querySelector(mothYearElement).innerHTML = null;
                    d.querySelector(datesElement).innerHTML = null;
                    d.querySelector(prevMothBtn).innerHTML = null;
                    d.querySelector(nextMothBtn).innerHTML = null;
                },1000);
                $container.forEach(button => {
                    button.classList.remove("active2");
                });
            }
        });
    };
    digitalCalendar("#clock", "#date" , "#btnClock", "#calendar", "#btnCalendar", "#weekRow","#mothYear", "#dates", "#prevBtn" ,"#nextBtn");
});