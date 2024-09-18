export const taskreducers = function (state = {tasks : []}, action) {
    console.log("action", action)
    switch (action.type) {
      case "ADD_TASK":
          return {
              ...state,
              tasks : [...state.tasks, action.payload ]
          }
      case "ALL_TASK":
          return {
              ...state,
              tasks : action.payload
          }
      default:
        return state;
    }
  };