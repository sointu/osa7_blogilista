const initialState = null
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NEW':
    return (
    //action.type
      action.data
    )
  case 'HIDE':
    return null
  case 'ERRORNEW':
    console.log(action.data)
    return action.data
  case 'ERRORDEL':
    return action.data
  case 'ERRORLIKE':
    return action.data
  // eslint-disable-next-line no-duplicate-case
  case 'CREATE_NEW':
    return action.data
  case 'SUCCESSDEL':
    return action.data
  case 'SUCCESSLIKE':
    return action.data
  default:
    return state
  }
}

// action creator
export const createNewSuccessNotification = (title) => {
  return {
    type: 'CREATE_NEW',
    //data: `You voted ${id}`
    data: `Notification handled by redux: SUCCESS! You created new blog "${title}".`
  }
}

export const createDeleteSuccessNotification = (title) => {
  return {
    type: 'SUCCESSDEL',
    //data: `You voted ${id}`
    data: `Notification handled by redux: SUCCESS! You deleted blog "${title}".`
  }
}
export const createLikeSuccessNotification = (title) => {
  return {
    type: 'SUCCESSLIKE',
    //data: `You voted ${id}`
    data: `Notification handled by redux: SUCCESS! You liked blog "${title}".`
  }
}
// action creator
export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: null
  }
}
// action creator
export const createNewErrorNotification = () => {
  return {
    type: 'ERRORNEW',
    data: 'Notification handled by redux: could not create blog.'
  }
}
export const createDeleteErrorNotification = () => {
  return {
    type: 'ERRORDEL',
    data: 'Notification handled by redux: could not delete blog.'
  }
}
export const createLikeErrorNotification = () => {
  return {
    type: 'ERRORLIKE',
    data: 'Notification handled by redux: No one likes this blog.'
  }
}


export default notificationReducer