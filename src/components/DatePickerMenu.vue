<template>
    <v-menu ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px">
      <template v-slot:activator="{ on }">
        <v-chip v-on="on" outlined> <v-icon class="mr-2">mdi-calendar</v-icon> {{ value }} </v-chip>
      </template>
      <v-date-picker v-model="date"
                     no-title
                     @input="update"></v-date-picker>
    </v-menu>
</template>

<script>

  export default {
    props: ['value'],

    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    }),

    mounted() {
      if (this.value.match("\\d{4}-\\d{2}-\\d{2}")) {
        this.date = this.value
      } 
    },

    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date() {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate(date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      update(e) {
        this.menu = false; // Close menu
        this.$emit('input', e)
      }
    }
  }
</script>