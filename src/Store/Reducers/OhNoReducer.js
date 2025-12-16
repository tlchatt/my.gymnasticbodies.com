import { updateObject } from '../util';

const initial = {
  open: false
}

const openModal = (state) => {
  return updateObject(state, {
    open: true,
  })
}

export const OH_NO_OPEN_MODAL = 'OH_NO_OPEN_MODAL';
export const OH_NO_CLOSE_MODAL = 'OH_NO_CLOSE_MODAL';

export const openOhNo = () => {
  return {
    type: OH_NO_OPEN_MODAL
  }
}

export const closeOhNo = () => {
  return {
    type: OH_NO_CLOSE_MODAL
  }
}

export const OhNoReducer = (state = initial, action) => {
  switch (action.type) {
    case OH_NO_OPEN_MODAL: return openModal(state)
    case OH_NO_CLOSE_MODAL: return initial;
    default: return state;
  }
}
