export const productsColumnsPosition = [
  {
    field: 'name',
    title: 'დასახელება',
    width: '16.6%',
  },
  {
    field: 'cost',
    title: 'ღირებულება',
    width: '16.6%',
  },
  {
    field: 'sellingPrice',
    title: 'გასაყიდი ფასი',
    width: '16.6%',
  },
  {
    field: 'sellingGroup',
    title: 'გაყიდვების ჯგუფი',
    width: '16.6%',
  },
  {
    field: '',
    title: 'აღწერა',
    width: '16.6%',
    hasDescription: true,
    property: 'description',
  },
  {
    field: 'icons',
    title: '',
    width: '16.6%',
    icons: {
      edit: { priority: 1, show: true },
      delete: { priority: 2, show: true },
    },
  },
];
