const addScript = (language) => {
  var s = document.createElement("script");
  s.setAttribute(
    "src",
    `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`,
  );
  document.body.appendChild(s);
};

if (window.clientInformation.language == "ko-KR") {
  addScript("ko");
} else if (window.clientInformation.language == "vi") {
  addScript("vi");
}
