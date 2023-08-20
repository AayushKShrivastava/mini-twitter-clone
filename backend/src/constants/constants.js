var constants = {
  DB_CONNECTION_ERROR : {
    Code : 5001,
    Message: "Unable to connect to the database. Please check your internet connection or firewall/proxy settings"
  },
  DB_DISCONNECT_ERROR : {
    Code : 5002,
    Message : "Failed to Disconnect from the Database. Forced to close the database connection",
  },
  INVALID_REQUEST : {
    Code : 4001,
    Message : "The request format is invalid. Missing required parameters or invalid data-type for the request parameters"
  },
  INVALID_USERNAME: {
    Code: 4002,
    Message: "Incorrect username"
  },
  INVALID_PASSWORD: {
    Code: 4002,
    Message: "Incorrect password"
  },
  UNAUTHORIZED: {
    Code: 4003,
    Message: "User not logged in"
  },
  FAILURE : "FAILURE",
  SUCCESS : "SUCCESS",
  SERVER_ERROR : {
      Code : 5050,
      Message : "An unknown server-error occured."
  }
}

module.exports = constants