<template>
  <bottom_bar />

  <div class="container">
    <div class="calendar">
      <vue-cal
        class="vuecal--blue-theme"
        locale="pt-br"
        :disable-views="['years', 'week']"
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="60"
        sticky-split-labels
        events-count-on-month-view
        events-count-on-year-view
        :split-days="splitsData"
        :events="eventsData"
        active-view="day"
        :on-event-click="onEventClick"
      >
        <template #split-label="{ split }">
          <p>{{ split.label }}</p>
        </template>
      </vue-cal>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";

export default {
  components: { VueCal },
  data() {
    return {
      selectedEvent: {},
      openModal: false,
      eventsData: [],
      splitsData: [],
    };
  },
  methods: {
    async pegarData() {
      try {
        const response = await axios.get("/db.json");
        this.splitsData = response.data.splits.splits;

        // Mapear os eventos e seus serviços correspondentes
        this.eventsData = response.data.events.events.map((event) => {
          // Definir ícones com base nos nomes dos serviços
          let icon = "";
          let taxi_dog = "";
          event.services.forEach((service) => {
            switch (service.service_name) {
              case "banho":
                icon += '<i class="fas fa-bath"></i>';
                break;
              case "tosa":
                icon += '<i class="fas fa-scissors"></i>';
                break;
              case "hidratacao":
                icon += '<i class="fas fa-tint"></i>';
                break;
              // Adicione mais cases conforme necessário
              default:
                // Caso nenhum serviço corresponda, manter o nome do serviço como está
                icon += service.service_name;
                break;
            }
          });

          // Retornar o evento atualizado com os ícones dos serviços
          if (event.taxi_dog === true) {
            taxi_dog =
              '<i class="fa-solid fa-car" style="color: #FFD43B;"></i>';
          }

          // Verificar o status do serviço e adicionar um indicador correspondente
          let statusIndicator = "";
          switch (event.status_service) {
            case "pago":
              statusIndicator =
                '<i class="fa-solid fa-dollar-sign" style="color: #00cc22;"></i>';
              break;
            case "cancelado":
              statusIndicator =
                '<i class="fa-solid fa-ban" style="color: #ff0000;"></i>';
              break;
            // O status padrão é 'nao pago'
            default:
              statusIndicator =
                '<i class="fa-solid fa-dollar-sign" style="color: #ff0000;"></i>';
              break;
          }
          return {
            title: event.pet_name,
            ...event,
            content: icon + taxi_dog + statusIndicator, // Usar o nome do serviço se nenhum ícone for encontrado
          };
        });
      } catch (error) {
        console.error("Erro ao carregar os dados do calendário:", error);
      }
    },
    onEventClick(event) {
      this.selectedEvent = event;
      this.openModal = true;
      console.log("modal: " + this.openModal);
      console.log("event: " + this.selectedEvent.title);
    },
  },
  created() {
    this.pegarData();
  },
};
</script>

<style>
.calendar {
  height: 90vh;
}
.func-2 {
  background-color: #ff7eb3;
  color: #f0f6ff;
}
.func-1 {
  background-color: #d168ee;
  color: #fcf0ff;
}
/*
  CONFIGURAÇÃO DO HEADER
  */

/*
  CONFIGURAÇÃO DO CALENDARIO
  */
.vuecal__event-time,
.vuecal__no-event {
  display: none;
}
.vuecal__event {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vuecal__event-content > i {
  margin-left: 7px;
}
.vuecal__event-title {
  font-size: 1.3rem;
  margin-right: 10;
}

.vuecal__flex .week-view .vuecal__event-content {
  display: none;
}
@media only screen and (max-width: 768px) {
  .vuecal__event-content {
    display: none;
  }
}
.teste {
  padding-bottom: 300px;
}
</style>
