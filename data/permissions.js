/* For nested routes use "-" character between parent and child */

const permissions = [
  {
    id: 1,
    label: 'Dashboard',
    name: 'dashboard',
    subItems: [
      {
        label: 'View',
        value: 'dashboard.view'
      }
    ]
  },
  {
    id: 2,
    label: 'Manage System Values',
    name: 'system_values',
    subItems: [
      {
        label: 'View',
        value: 'system.view'
      },
      {
        label: 'Edit',
        value: 'system.edit'
      },
      {
        label: 'Add',
        value: 'system.add'
      },
      {
        label: 'Delete',
        value: 'system.delete'
      }
    ]
  },
  {
    id: 3,
    label: 'Manage Users',
    name: 'admins',
    subItems: [
      {
        label: 'View',
        value: 'admins.view'
      },
      {
        label: 'Edit',
        value: 'admins.edit'
      },
      {
        label: 'Add',
        value: 'admins.add'
      },
      {
        label: 'Delete',
        value: 'admins.delete'
      }
    ]
  },
  {
    id: 4,
    label: 'Manage Chains',
    name: 'chains',
    subItems: [
      {
        label: 'View',
        value: 'chains.view'
      },
      {
        label: 'Edit',
        value: 'chains.edit'
      },
      {
        label: 'Add',
        value: 'chains.add'
      },
      {
        label: 'Delete',
        value: 'chains.delete'
      }
    ]
  },
  {
    id: 5,
    label: 'Manage Competitors',
    name: 'competitors',
    subItems: [
      {
        label: 'View',
        value: 'competitors.view'
      },
      {
        label: 'Edit',
        value: 'competitors.edit'
      },
      {
        label: 'Add',
        value: 'competitors.add'
      },
      {
        label: 'Delete',
        value: 'competitors.delete'
      }
    ]
  },
  {
    id: 6,
    label: 'Manage Branches',
    name: 'branches',
    subItems: [
      {
        label: 'View',
        value: 'branches.view'
      },
      {
        label: 'Edit',
        value: 'branches.edit'
      },
      {
        label: 'Add',
        value: 'branches.add'
      },
      {
        label: 'Delete',
        value: 'branches.delete'
      }
    ]
  },
  {
    id: 7,
    label: 'Manage Tasks',
    name: 'tasks',
    subItems: [
      {
        label: 'View',
        value: 'tasks.view'
      },
      {
        label: 'Edit',
        value: 'tasks.edit'
      },
      {
        label: 'Add',
        value: 'tasks.add'
      },
      {
        label: 'Delete',
        value: 'tasks.delete'
      }
    ]
  },
  {
    id: 8,
    label: 'Manage Brands',
    name: 'brands',
    subItems: [
      {
        label: 'View',
        value: 'brands.view'
      },
      {
        label: 'Edit',
        value: 'brands.edit'
      },
      {
        label: 'Add',
        value: 'brands.add'
      },
      {
        label: 'Delete',
        value: 'brands.delete'
      }
    ]
  },
  {
    id: 9,
    label: 'Manage Demos',
    name: 'demos',
    subItems: [
      {
        label: 'View',
        value: 'demos.view'
      },
      {
        label: 'Edit',
        value: 'demos.edit'
      },
      {
        label: 'Add',
        value: 'demos.add'
      },
      {
        label: 'Delete',
        value: 'demos.delete'
      },
      {
        label: 'Add Target',
        value: 'demos.addtarget'
      }
    ]
  },
  {
    id: 10,
    label: 'Manage Tickets',
    name: 'tickets',
    subItems: [
      {
        label: 'View',
        value: 'tickets.view'
      },
      {
        label: 'Show',
        value: 'tickets.show'
      },
      {
        label: 'Delete',
        value: 'tickets.delete'
      }
    ]
  },
  {
    id: 11,
    label: 'Manage Visits',
    name: 'visits',
    subItems: [
      {
        label: 'View',
        value: 'visits.view'
      }
      // {
      //   label: 'Edit',
      //   value: 'visits.edit'
      // },
      // {
      //   label: 'Add',
      //   value: 'visits.add'
      // },
      // {
      //   label: 'Assign',
      //   value: 'visits.assign'
      // },
      // {
      //   label: 'Delete',
      //   value: 'visits.delete'
      // }
    ]
  },
  {
    id: 12,
    label: 'Manage Promotions',
    name: 'promotions',
    subItems: [
      {
        label: 'View',
        value: 'promotions.view'
      },
      {
        label: 'Edit',
        value: 'promotions.edit'
      },
      {
        label: 'Add',
        value: 'promotions.add'
      },
      {
        label: 'Delete',
        value: 'promotions.delete'
      }
    ]
  },
  {
    id: 13,
    label: 'Manage Messages',
    name: 'messages',
    subItems: [
      {
        label: 'View',
        value: 'messages.view'
      },
      {
        label: 'Send Messages',
        value: 'messages.add'
      },
      {
        label: 'Show',
        value: 'messages.show'
      },
      {
        label: 'Delete',
        value: 'messages.delete'
      }
    ]
  },

  {
    id: 15,
    label: 'Manage Reports',
    name: 'reports',
    subItems: [
      {
        label: 'Comment Reports',
        value: 'reports.comment'
      },
      {
        label: 'View',
        value: 'reports.view'
      },
      {
        label: 'Show',
        value: 'reports.show'
      },
      {
        label: 'Competition Sell Out',
        value: 'reports.competition-sell-out'
      },
      {
        label: 'Competition Stock Count',
        value: 'reports.competition-stock-count'
      },
      {
        label: 'Sell Out Reports',
        value: 'reports.sell-out'
      },
      {
        label: 'Stock Count Reports',
        value: 'reports.stock-count'
      },
      {
        label: 'Return Reports',
        value: 'reports.return-report'
      },
      {
        label: 'Supply Order',
        value: 'reports.supply-order'
      },
      {
        label: 'Non Selling',
        value: 'reports.nonselling'
      }
    ]
  },
  {
    id: 16,
    label: 'Manage Roles',
    name: 'roles',
    subItems: [
      {
        label: 'View',
        value: 'roles.view'
      },
      {
        label: 'Add',
        value: 'roles.add'
      },
      {
        label: 'Edit',
        value: 'roles.edit'
      },
      {
        label: 'Delete',
        value: 'roles.delete'
      }
    ]
  },
  {
    id: 17,
    label: 'Manage Products',
    name: 'products',
    subItems: [
      {
        label: 'View',
        value: 'products.view'
      },
      {
        label: 'Add',
        value: 'products.add'
      },
      {
        label: 'Edit',
        value: 'products.edit'
      },
      {
        label: 'Delete',
        value: 'products.delete'
      }
    ]
  },
  {
    id: 18,
    label: 'Settings',
    name: 'settings',
    subItems: [
      {
        label: 'View',
        value: 'settings.view'
      }
    ]
  },
  {
    id: 19,
    label: 'Pricing',
    name: 'pricing',
    subItems: [
      {
        label: 'View',
        value: 'pricing.view'
      },
      {
        label: 'Edit',
        value: 'pricing.edit'
      },
      {
        label: 'Import Sheet',
        value: 'pricing.import'
      }
    ]
  },
  {
    id: 20,
    label: 'Manage Salaries',
    name: 'salaries',
    subItems: [
      {
        label: 'View',
        value: 'salaries.view'
      },
      {
        label: 'Import Sheet',
        value: 'salaries.import'
      },
      {
        label: 'Show',
        value: 'salaries.show'
      }
    ]
  },

  {
    id: 22,
    label: 'Shared Documents',
    name: 'documents',
    subItems: [
      {
        label: 'View',
        value: 'documents.view'
      },
      {
        label: 'Show',
        value: 'documents.show'
      },
      {
        label: 'Add',
        value: 'documents.add'
      },
      {
        label: 'Delete',
        value: 'documents.delete'
      }
    ]
  }
]

const permissionsMapping = {
  reports: 'reports.view',
  'reports-reportId': 'reports.show',
  'reports-comment': 'reports.comment',
  'reports-competition-sell-out': 'reports.competition-sell-out',
  'reports-competition-stock-count': 'reports.competition-stock-count',
  'reports-sell-out': 'reports.sell-out',
  'reports-stock-count': 'reports.stock-count',
  'reports-return-report': 'reports.return-report',
  'reports-supply-order': 'reports.supply-order',
  'reports-nonselling': 'reports.nonselling',
  'settings-system': 'system.view',
  'settings-system-regions': 'system.view',
  'settings-system-cities': 'system.view',
  'settings-system-areas': 'system.view',
  'settings-system-groups': 'system.view',
  'settings-system-display-type': 'system.view',
  'settings-system-ticket-types': 'system.view',
  'settings-system-task-types': 'system.view',

  'settings-system-add': 'system_values.add',
  'settings-system-regions-add': 'system_values.add',
  'settings-system-cities-add': 'system_values.add',
  'settings-system-areas-add': 'system_values.add',
  'settings-system-groups-add': 'system_values.add',
  'settings-system-display-type-add': 'system_values.add',
  'settings-system-ticket-types-add': 'system_values.add',
  'settings-system-task-types-add': 'system_values.add',

  'settings-system-edit': 'system_values.edit',
  'settings-system-regions-edit': 'system_values.edit',
  'settings-system-cities-edit': 'system_values.edit',
  'settings-system-areas-edit': 'system_values.edit',
  'settings-system-groups-edit': 'system_values.edit',
  'settings-system-display-type-edit': 'system_values.edit',
  'settings-system-ticket-types-edit': 'system_values.edit',
  'settings-system-task-types-edit': 'system_values.edit',

  'settings-system-delete': 'system_values.delete',
  'settings-system-regions-delete': 'system_values.delete',
  'settings-system-cities-delete': 'system_values.delete',
  'settings-system-areas-delete': 'system_values.delete',
  'settings-system-groups-delete': 'system_values.delete',
  'settings-system-display-type-delete': 'system_values.delete',
  'settings-system-ticket-types-delete': 'system_values.delete',
  'settings-system-task-types-delete': 'system_values.delete',

  'settings-users': 'users.view',
  'settings-users-add': 'users.add',
  'settings-users-userId': 'users.edit',
  'settings-users-delete': 'users.delete',
  'settings-roles': 'roles.view',
  'settings-roles-add': 'roles.add',
  'settings-roles-roleId': 'roles.edit',
  'settings-roles-delete': 'roles.delete',
  products: 'products.view',
  'products-productId': 'products.edit',
  'products-add': 'products.add',
  'products-delete': 'products.delete',
  competitors: 'competitors.view',
  'competitors-competitorId': 'competitors.edit',
  'competitors-add': 'competitors.add',
  'competitors-delete': 'competitors.delete',
  pricing: 'pricing.view',
  branches: 'branches.view',
  'branches-add': 'branches.add',
  'branches-branchId': 'branches.edit',
  'branches-delete': 'branches.delete',
  brands: 'brands.view',
  'brands-add': 'brands.add',
  'brands-brandId': 'brands.edit',
  'brands-delete': 'brands.delete',
  chains: 'chains.view',
  'chains-add': 'chains.add',
  'chains-chainId': 'chains.edit',
  'chains-delete': 'chains.delete',
  tasks: 'tasks.view',
  'tasks-taskId': 'tasks.edit',
  'tasks-add': 'tasks.add',
  'tasks-delete': 'tasks.delete',
  documents: 'documents.view',
  'documents-documentId': 'documents.show',
  'documents-add': 'documents.add',
  'documents-delete': 'documents.delete',
  promotions: 'promotions.view',
  'promotions-promotionId': 'promotions.edit',
  'promotions-add': 'promotions.add',
  'promotions-delete': 'promotions.delete',
  demos: 'demos.view',
  'demos-demoId': 'demos.edit',
  'demos-add': 'demos.add',
  'demos-delete': 'demos.delete',
  'demos-assign-visitId': 'demos.assign',
  admins: 'admins.view',
  'admins-adminId': 'admins.edit',
  'admins-add': 'admins.add',
  'admins-delete': 'admins.delete',
  tickets: 'tickets.view',
  'tickets-ticketId': 'tickets.show',
  'tickets-delete': 'tickets.delete',
  visits: 'visits.view',
  'visits-edit': 'visits.edit',
  'visits-add': 'visits.add',
  'visits-delete': 'visits.delete',
  bonus_criteria: 'bonus_criteria.view',
  'bonus-criteria': 'bonus_criteria.view',
  'bonus-criteria-add': 'bonus_criteria.add',
  bonuses: 'bonuses.view',
  'manage-bonus': 'bonuses.view',
  'manage-bonus-add': [
    'bonuses.add_demo_bonus',
    'bonuses.add_supervisor_bonus'
  ],
  'manage-bonus-id': ['bonuses.add_demo_bonus', 'bonuses.add_supervisor_bonus'],

  index: 'dashboard.view',
  settings: 'settings.view',
  messages: 'messages.view',
  'messages-messageId': 'messages.show',
  'messages-add': 'messages.add',
  'messages-delete': 'messages.delete',
  salaries: 'salaries.view',
  'salaries-salariesId': 'salaries.show'
}

export { permissions, permissionsMapping }
