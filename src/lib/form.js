export default text => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (text.match(mailformat)) {
    return true;
  }

  return false;
};
