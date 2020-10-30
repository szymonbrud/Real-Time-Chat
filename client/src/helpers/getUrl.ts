export default () => {
  if (window.location.hostname === 'localhost') {
    return ('http://localhost:5000/');
  }
  return('https://real-time-chat-backend.herokuapp.com/');
}