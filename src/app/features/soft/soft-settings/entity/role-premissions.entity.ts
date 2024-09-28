import { PropertyRead } from '@angular/compiler';

export const roleColumnsPosition = [
  {
    field: 'name',
    title: 'როლი',
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
    field: '',
    title: 'წვდომები',
    width: '16.6%',
    hasDescription: true,
    property: 'rolePermissions',
  },
  {
    field: 'createdAt',
    title: 'გაყიდვების ჯგუფი',
    width: '16.6%',
  },
  {
    field: 'updatedAt',
    title: 'გაყიდვების ჯგუფი',
    width: '16.6%',
  },
  {
    field: 'icons',
    title: '',
    width: '16.6%',
    icons: {
      edit: true,
      delete: true,
    },
  },
];
