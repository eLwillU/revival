<template>
  <q-page class="q-pa-md">
    <q-table
      title="Übersicht"
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-action="props">
        <q-btn flat :label="props.row.actionLabel" @click="handleActionClick(props.row.action)" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'section', align: 'left', label: 'Abschnitt', field: 'section', sortable: true },
        { name: 'status', label: 'Status', field: 'status', sortable: true },
        { name: 'progress', label: 'Fortschritt', field: 'progress', sortable: true },
        { name: 'action', label: 'Action', field: 'action', sortable: false }
      ],
      rows: [
        { id: 1, section: 'Diagnostik', status: 'Begonnen', progress: 'Beantwortet 1/9', actionLabel: 'Führe fort', action: 'continue' },
        { id: 2, section: 'Ihr Gesundheitszustand', status: 'Beendet', progress: 'Beantwortet 8/8', actionLabel: 'Fertig', action: 'done' },
        { id: 3, section: 'Leben mit / nach Krebs', status: 'Begonnen', progress: 'Beantwortet 1/8', actionLabel: 'Führe fort', action: 'continue' }
      ]
    }
  },
  methods: {
    handleActionClick(action) {
      if (action === 'continue') {
        this.$q.notify('Fortfahren mit dem Abschnitt');
      } else {
        this.$q.notify('Dieser Abschnitt ist abgeschlossen');
      }
    }
  }
}
</script>
