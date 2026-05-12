export const routes = {
  home: '/',
  login: '/login',
  publicMenu: (slug: string) => `/r/${slug}`,
  tableOrder: (slug: string, tableId: string) => `/r/${slug}/t/${tableId}`,
  orderSent: '/order-sent',
  dashboard: {
    home: '/dashboard',
    cashier: '/dashboard/cashier',
    menu: '/dashboard/menu',
    tables: '/dashboard/tables',
    qr: '/dashboard/qr',
    history: '/dashboard/history',
    logs: '/dashboard/logs',
    settings: '/dashboard/settings',
    staff: '/dashboard/staff',
    branding: '/dashboard/branding',
  },
  superadmin: {
    overview: '/superadmin',
    restaurants: '/superadmin/restaurants',
    restaurantDetails: (id: string) => `/superadmin/restaurants/${id}`,
    users: '/superadmin/users',
    plans: '/superadmin/plans',
    logs: '/superadmin/logs',
    security: '/superadmin/security',
    settings: '/superadmin/settings',
  }
};
