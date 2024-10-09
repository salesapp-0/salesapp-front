export const employeeColumns = [
  {
    field: 'firstName',
    title: 'სახელი',
    width: '11.1111111111%',
  },
  {
    field: 'lastName',
    title: 'გვარი',
    width: '11.1111111111%',
  },
  {
    field: 'phoneNumber',
    title: 'ტელ.ნომერი',
    width: '11.1111111111%',
    property: 'user.username',
  },
  {
    field: 'position',
    title: 'პოზიცია',
    width: '11.1111111111%',
  },
  {
    field: 'role',
    title: 'როლი',
    width: '11.1111111111%',
  },
  {
    field: 'sellingGroup',
    title: 'გაყიდვების ჯგუფი',
    width: '11.1111111111%',
  },
  {
    field: 'createdAt',
    title: 'შექმნის თარიღი',
    width: '11.1111111111%',
  },
  {
    field: 'updatedAt',
    title: 'განახლების თარიღი',
    width: '11.1111111111%',
  },
  {
    field: 'icons',
    title: '',
    width: '12.5%',
    icons: {
      edit: true,
      delete: true,
      read: true,
    },
  },
];
