<template>
  <FullCalendar :options="calendarOptions" :events="events" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      events: [
        {
          title: "event1",
          start: "2024-06-26",
          end: "2024-06-27",
        },
        {
          title: "event2",
          start: "2010-01-05",
          end: "2010-01-07",
        },
        {
          title: "event3",
          start: "2010-01-09T12:30:00",
          allDay: false,
        },
      ],
      calendarOptions: {
        timeZone: "America/Fortaleza",
        locale: "pt-br",
        selectable: true,
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "today,dayGridDay,dayGridMonth,dayGridWeek",
        },
        buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        },
        contentHeight: "79vh",
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridWeek",
        eventContent: function (info) {
          console.log(info);
          return {
            html: `<b>${info.event.title}</b><br/>${info.event.start}`,
          };
        },
      },
    };
  },
};
</script>

<style></style>
