class API {
  static async get(url) {
    var requestOptions = {
      method : "GET",
      withCredntials: true,
      credentials: 'include',
      redirect : "follow",
    }
    try {
      var response = await fetch(url, requestOptions)
      response = await response.text()
      response = await JSON.parse(response)
      return response
    }
    catch(err) {
      console.log(err);
      return "Error!"
    }
  }

  static async post(url, body = {}) {
    var myHeaders = new Headers()

    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      withCredntials: true,
      credentials: 'include',
      redirect: 'follow'
    }

    try {
      console.log("Sending request")
      var response = await fetch(url, requestOptions)
      console.log(response)
      response = await response.text()
      response = JSON.parse(response)

      console.log(response)

      if(response.status === "SUCCESS")
          return response
      else
          return "Error"
    }
    catch (err) {
        console.log(err);
        return "Error!"
    }
  }

  static async put(url, body = {}) {
    var myHeaders = new Headers()

    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(body),
      withCredntials: true,
      credentials: 'include',
      redirect: 'follow'
    }

    try {
      console.log("Sending put request")
      var response = await fetch(url, requestOptions)
      console.log(response)
      response = await response.text()
      response = JSON.parse(response)

      console.log(response)

      if(response.status === "SUCCESS")
          return response
      else
          return "Error"
    }
    catch (err) {
        console.log(err);
        return "Error!"
    }
  }

  static async delete(url, body = {}) {
    var myHeaders = new Headers()

    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(body),
      withCredntials: true,
      credentials: 'include',
      redirect: 'follow'
    }

    try {
      console.log("Sending delete request")
      var response = await fetch(url, requestOptions)
      response = await response.text()
      response = JSON.parse(response)

      console.log(response)

      if(response.status === "SUCCESS")
          return response
      else
          return "Error"
    }
    catch (err) {
        console.log(err);
        return "Error!"
    }
  }
}

export default API;
