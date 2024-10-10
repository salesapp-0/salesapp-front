export const tableColumns = [
  {
    field: 'name',
    title: 'დასახელება',
    width: '25%',
  },
  {
    field: 'createdAt',
    title: 'შექმნის თარიღი',
    width: '25%',
  },
  {
    field: 'updatedAt',
    title: 'განახლების თარიღი',
    width: '25%',
  },
  {
    field: 'icons',
    title: '',
    width: '25%',
    icons: {
      edit: { priority: 1, show: true },
      delete: { priority: 2, show: true },
    },
  },
];
