export default (error: any) => {
  console.log(error.response)

  if (error.response.data.message) {
    return error.response.data.message
  } else {
    return "Network Error"
  }
}