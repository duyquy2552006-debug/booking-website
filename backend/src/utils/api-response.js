function success(data, message = 'Success') {
  return { success: true, message, data };
}

function failure(message = 'Error', errors = null) {
  return { success: false, message, errors };
}

module.exports = { success, failure };
