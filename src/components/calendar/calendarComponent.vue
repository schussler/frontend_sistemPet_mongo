<template>
  <div class="main-demo">
    <div class="w-flex wrap align-center justify-center">
      <div class="grow mx2">
        {{ splits }}
        <vue-cal
          class="demo full-cal vuecal--full-height-delete"
          hide-weekends
          locale="pt-br"
          :disable-views="['years']"
          :selected-date="selectedDate"
          :time-from="8 * 60"
          :time-to="21 * 60"
          :split-days="
            splits.map((split) => {
              return {
                ...split,
                label: split.name, // Criando o novo campo label com o valor de name
                id: split._id, // Criando o novo campo label com o valor de name
              };
            })
          "
          sticky-split-labels
          :events="demoExample.events"
          active-view="week"
          :on-event-click="onEventClick"
        >
          >
          <template #split-label="{ split }">
            <w-icon :color="split.color" size="20"
              ><span class="mdi mdi-account"></span>
            </w-icon>
            <strong :style="`color: ${split.color}`">{{ split.name }}</strong>
          </template>
        </vue-cal>
        <detailsAppo ref="detailsAppointments" />
      </div>
    </div>
  </div>
</template>

<script>
import vueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import detailsAppo from "../appointments/detailsAppointments.vue";

const demoExample = {
  events: [],
};

export default {
  components: { vueCal, detailsAppo },
  data: () => ({
    demoExample,
    selectedDate: new Date(),
    splits: [
      { label: "John", class: "john" },
      { label: "Kate", class: "kate" },
      { label: "John", class: "john" },
      { label: "Kate", class: "kate" },
    ],
  }),
  methods: {
    onEventClick(event, e) {
      this.$refs.detailsAppointments.dialog = true;
      this.$refs.detailsAppointments.clientName = event.clientName;
      this.$refs.detailsAppointments.petName = event.pet;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
  },
  created() {
    const teste = {
      nome: "oufl",
    };
    const data_atual = "2024-07-03";
    this.demoExample.events.push(
      {
        clientName: "gabryella dos anjos",

        title: "aqui!!",
        content: '<i class="w-icon material-icons mt1">sports_tennis</i>',
        start: `${data_atual} 15:30`,
        end: `${data_atual} 17:30`,
        resizable: false,
        split: "6685fb640b23dc23ba712cd8",
        pet: "fred",
      },
      {
        clientName: "gabryella dos anjos",

        start: `${data_atual} 15:30`,
        end: `${data_atual} 17:30`,
        title: "Tennaaaaaais",
        content: '<i class="w-icon material-icons mt1">sports_tennis</i>',
        pet: "bob",
        split: "6685fb640b23dc23ba712cd8",
      },
      {
        clientName: "gabryella dos anjos",

        start: `${data_atual} 08:00`,
        end: `${data_atual} 10:00`,
        title: "hey",
        content: '<i class="w-icon material-icons mt1">sports_volleyball</i>',
        pet: "bob",
        split: "667746150197b18bbbfa0654",
      },
      {
        clientName: "gabryella dos anjos",

        start: `${data_atual} 09:00`,
        end: `${data_atual} 11:30`,
        title: "Golf",
        content: '<i class="w-icon material-icons mt2">golf_course</i>',
        pet: "bob",
        split: 1,
      },
      {
        clientName: "gabryella dos anjos",

        start: `${data_atual} 16:45`,
        end: `${data_atual} 18:45`,
        title: teste.nome,
        content: "BANHO TOSA BEBE",
        pet: "bob",
        split: 2,
      }
    );
  },
};
</script>
<style>
.main-demo {
  font-size: 12px;
}

.main-demo .tagline {
  max-width: 500px;
  margin: 0 auto 5rem;
}

.main-demo .tagline .title1 {
  letter-spacing: normal;
}
.vuecal__body .split1 {
  background-color: red;
}

.vuecal--date-picker .vuecal__cell-events-count {
  width: 4px;
  height: 4px;
  min-width: 0;
  padding: 0;
  margin-top: 4px;
  color: transparent;
  background-color: #42b983; /* $john */
}

.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
  background-color: #fff;
}

.vuecal__cell--out-of-scope {
  color: rgba(0, 0, 0, 0.15);
}

.full-cal .vuecal__menu {
  background-color: transparent;
}

.full-cal .vuecal__title-bar {
  background: rgba(0, 0, 0, 0.03);
}

.vuecal__view-btn {
  background: none;
  padding: 0 10px;
  margin: 4px 2px;
  border-radius: 30px;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  text-transform: uppercase;
  border: none;
  color: inherit;
}

.vuecal__view-btn--active {
  background: rgb(66, 185, 130);
  color: #fff;
}

.full-cal .weekday-label {
  opacity: 0.4;
  font-weight: 500;
}

.vuecal__header .w-icon {
  color: inherit;
}

.full-cal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: transparent;
}

.full-cal:not(.vuecal--day-view) .vuecal__cell--selected:before {
  border: 1px solid rgba(66, 185, 130, 0.8); /* rgba($john, 0.8) */
}

.vuecal__event-time {
  margin: 3px 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
}

.vuecal__header .john {
  color: #379772; /* darken($john, 5) */
}

.vuecal__body .john {
  background-color: rgba(66, 185, 130, 0.08); /* rgba($john, 0.08) */
}

.john .vuecal__event {
  background-color: rgba(
    71,
    191,
    136,
    0.85
  ); /* rgba(lighten($john, 5), 0.85) */
  color: #fff;
}

.john .lunch {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(66, 185, 130, 0.15) 10px,
    rgba(66, 185, 130, 0.15) 20px
  ); /* rgba($john, 0.15) */
  color: rgba(57, 151, 114, 0.4); /* transparentize(darken($john, 10), 0.4) */
}

.vuecal__header .kate {
  color: #e661a5; /* darken($kate, 5) */
}

.vuecal__body .kate {
  background-color: rgba(255, 127, 200, 0.08); /* rgba($kate, 0.08) */
}

.kate .vuecal__event {
  background-color: rgba(
    255,
    143,
    207,
    0.85
  ); /* rgba(lighten($kate, 5), 0.85) */
  color: #fff;
}

.kate .lunch {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 127, 200, 0.15) 10px,
    rgba(255, 127, 200, 0.15) 20px
  ); /* rgba($kate, 0.15) */
  color: rgba(230, 97, 165, 0.4); /* transparentize(darken($kate, 10), 0.4) */
}

@media screen and (max-width: 499px) {
  .main-demo .day-split-header strong {
    display: none;
  }
}
</style>
