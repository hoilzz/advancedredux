const createList = filter => (state = [], action) => {
  if (action.filter !== filter) {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

export const getIds = state => state;

export default createList;
