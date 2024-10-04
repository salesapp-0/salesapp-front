export const employeeColumns = [
  {
    field: 'personalNumber',
    title: 'პერსონალური ნომერი',
    width: '12.5%',
  },
  {
    field: 'firstName',
    title: 'სახელი',
    width: '12.5%',
  },
  {
    field: 'lastName',
    title: 'გვარი',
    width: '12.5%',
  },
  {
    field: 'user',
    title: 'მომხმარებელი',
    width: '12.5%',
    hasDescription: true,
    property: 'user.username',
  },
  {
    field: 'isActive',
    title: 'აქტიურია',
    width: '12.5%',
  },
  {
    field: 'createdAt',
    title: 'შექმნის თარიღი',
    width: '12.5%',
  },
  {
    field: 'updatedAt',
    title: 'განახლების თარიღი',
    width: '12.5%',
  },
  {
    field: 'icons',
    title: '',
    width: '12.5%',
    icons: {
      edit: true,
      delete: true,
    },
  },
];
