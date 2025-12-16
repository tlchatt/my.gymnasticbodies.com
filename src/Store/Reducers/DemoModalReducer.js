import { OPEN_MODAL, CLOSE_MODAL } from '../Action/DemoModalActions';
import { updateObject } from '../util';

const initialData = {
  open: false,
  data: {}
}

const openModal = (state, action) => {
  return updateObject(state, {
    open: true,
    data: action.data
  })
}

export const DemoModalReducer = (state = initialData, action) => {
  switch (action.type) {
    case OPEN_MODAL: return openModal(state, action)
    case CLOSE_MODAL: return initialData;
    default: return state;
  }
}
