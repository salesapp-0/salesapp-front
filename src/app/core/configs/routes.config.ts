import { PermissionsEnum } from '../enums/premissions.enum';

export const availableRoutes = [
  { path: 'main-page', permissions: [PermissionsEnum.UPDATE_ARTICLES] },
  { path: 'organizations', permissions: [PermissionsEnum.READ_ORGANIZATION] },
  {
    path: 'add-organization',
    permissions: [PermissionsEnum.READ_ORGANIZATION],
  },
  {
    path: 'edit-organizations/:id',
    permissions: [PermissionsEnum.READ_ORGANIZATION],
  },
  {
    path: 'specific-organization/:id',
    permissions: [PermissionsEnum.READ_ORGANIZATION],
  },
  {
    path: 'soft-settings',
    permissions: [PermissionsEnum.READ_SOFT_SETTINGS],
  },
];
