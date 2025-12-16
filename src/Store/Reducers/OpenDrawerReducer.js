import { updateObject } from '../util';

const initial = {
  open: false,
  componentId: ''
}

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export const openDrawer = (componentId) => {
  return {
    type: OPEN_DRAWER,
    componentId: componentId
  }
}

export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER
  }
}

const openDrawerComponent = (state, action) => {
  console.log(action)
  return updateObject(state, {
    open: true,
    componentId: action.componentId,
    isRedux: true
  })
}

export const OpenDrawerReducer = (state = initial, action) => {
  switch (action.type) {
    case OPEN_DRAWER: return openDrawerComponent(state, action)
    case CLOSE_DRAWER: return initial;
    default: return state;
  }
}
