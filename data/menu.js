/* For nested routes use "-" character between parent and child */

export const menuItems = [
  {
    id: 1,
    label: 'Home',
    icon: 'bx-home-alt',
    route: 'index',
    routeName: 'dashboard.view'
  },
  {
    id: 17,
    label: 'Reports',
    icon: 'bxs-cog',
    routeName: 'reports.view',
    subItems: [
      {
        id: 1,
        label: 'Comment Reports',
        route: 'reports-comment',
        routeName: 'reports.comment',
        parentId: 17
      },
      {
        id: 2,
        label: 'Competition Sell Out',
        route: 'reports-competition-sell-out',
        routeName: 'reports.competition-sell-out',
        parentId: 17
      },
      {
        id: 3,
        label: 'Competition Stock Count',
        route: 'reports-competition-stock-count',
        routeName: 'reports.competition-stock-count',
        parentId: 17
      },
      {
        id: 4,
        label: 'Return Reports',
        route: 'reports-return-report',
        routeName: 'reports.return-report',
        parentId: 17
      },
      {
        id: 5,
        label: 'Sell Out Reports',
        route: 'reports-sell-out',
        routeName: 'reports.sell-out',
        parentId: 17
      },
      {
        id: 6,
        label: 'Stock Count Reports',
        route: 'reports-stock-count',
        routeName: 'reports.stock-count',
        parentId: 17
      },
      {
        id: 7,
        label: 'Supply Order Reports',
        route: 'reports-supply-order',
        routeName: 'reports.supply-order',
        parentId: 17
      },
      {
        id: 8,
        label: 'Non Selling Reports',
        route: 'reports-nonselling',
        routeName: 'reports.nonselling',
        parentId: 17
      }
    ]
  },
  {
    id: 9,
    label: 'Branches',
    icon: 'bx-git-branch',
    route: 'branches',
    routeName: 'branches.view'
  },
  {
    id: 10,
    label: 'Competitors',
    icon: 'bx-git-branch',
    route: 'competitors',
    routeName: 'competitors.view'
  },
  {
    id: 3,
    label: 'Brands',
    icon: 'bx-git-merge',
    route: 'brands',
    routeName: 'brands.view'
  },
  {
    id: 2,
    label: 'Chains',
    icon: 'bx-chat',
    route: 'chains',
    routeName: 'chains.view'
  },
  {
    id: 11,
    label: 'Tasks',
    icon: 'bx-copy',
    route: 'tasks',
    routeName: 'tasks.view'
  },
  {
    id: 4,
    label: 'Products',
    icon: 'bx-dock-top',
    route: 'products',
    routeName: 'products.view'
  },
  {
    id: 5,
    label: 'Pricing',
    icon: 'bx-data',
    route: 'pricing',
    routeName: 'pricing.view'
  },
  {
    id: 6,
    label: 'Admins',
    icon: 'bx-group',
    route: 'admins',
    routeName: 'admins.view'
  },
  
  {
    id: 7,
    label: 'Demos',
    icon: 'bx-user',
    route: 'demos',
    routeName: 'demos.view'
  },
  {
    id: 8,
    label: 'Messages',
    icon: 'bx-message',
    route: 'messages',
    routeName: 'messages.view'
  },
  
  {
    id: 12,
    label: 'Visits Schedule',
    icon: 'bx-map',
    route: 'visits',
    routeName: 'visits.view'
  },
  {
    id: 13,
    label: 'Tickets',
    icon: 'bx-id-card',
    route: 'tickets',
    routeName: 'tickets.view'
  },
  {
    id: 14,
    label: 'Promotions',
    icon: 'bx-like',
    route: 'promotions',
    routeName: 'promotions.view'
  },
  {
    id: 15,
    label: 'Salary Slip',
    icon: 'bx-money',
    route: 'salaries',
    routeName: 'salaries.view'
  },
  {
    id: 16,
    label: 'Shared Documents',
    icon: 'bx-spreadsheet',
    route: 'documents',
    routeName: 'documents.view'
  },
  {
    id: 18,
    label: 'Settings',
    icon: 'bxs-cog',
    routeName: 'settings.view',
    subItems: [
      {
        id: 1,
        label: 'Users Roles',
        route: 'settings-roles',
        routeName: 'roles.view',
        parentId: 18
      },
      {
        id: 2,
        label: 'System Settings',
        route: 'settings-system',
        routeName: 'system.view',
        parentId: 18
      }
    ]
  },
  
]
