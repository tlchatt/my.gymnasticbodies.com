export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Get stuff done 1', amount: '0/3'},
    'task-2': { id: 'task-2', title: 'Get stuff done 2', amount: '0/3' },
    'task-3': { id: 'task-3', title: 'Get stuff done 3', amount: '0/3' },
    'task-4': { id: 'task-4', title: 'Get stuff done 4', amount: '0/3' },
    'task-5': { id: 'task-5', title: 'Get stuff done 5', amount: '0/3' },
    'task-6': { id: 'task-6', title: 'Get stuff done 6', amount: '0/3' },
    'task-7': { id: 'task-7', title: 'Get stuff done 7', amount: '0/3' },
    'task-8': { id: 'task-8', title: 'Get stuff done 8', amount: '0/3' },
    'task-9': { id: 'task-9', title: 'Get stuff done 9', amount: '0/3' },

  },
  columns: {
    'Mon': {
      id: 'Mon',
      taskIds: ['task-2','task-3','task-4' ]
    },
    'Tue': {
      id: 'Tue',
      taskIds: ['task-8', 'task-9']
    },
    'Wed': {
      id: 'Wed',
      taskIds: [ 'task-5', 'task-6', 'task-7',]
    },
    'Thur': {
      id: 'Thur',
      taskIds: []
    },
    'Fri': {
      id: 'Fri',
      taskIds: ['task-1']
    },
    'Sat': {
      id: 'Sat',
      taskIds: []
    },
    'Sun': {
      id: 'Sun',
      taskIds: []
    }
  },
  columnOrder: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  showToast: false,
  message: '',
  variation: 'success'
}
