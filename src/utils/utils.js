import { c, h, hc, hr, lc, lr, s, sl, sn, t } from "../assets/weatherIcons";

export const dateShortener = () => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNumber = new Date().getDay();
  const monthNumber = new Date().getMonth();

  const dayName = weekdays[dayNumber];
  const monthName = months[monthNumber];

  const today = new Date().getDate();

  return { dayName, monthName, today };
};

export const weatherIconSelector = (weatherStateAbbr, setSrc) => {
  switch (weatherStateAbbr) {
    case "sn":
      setSrc(sn);
      break;
    case "sl":
      setSrc(sl);
      break;
    case "h":
      setSrc(h);
      break;
    case "t":
      setSrc(t);
      break;
    case "hr":
      setSrc(hr);
      break;
    case "lr":
      setSrc(lr);
      break;
    case "s":
      setSrc(s);
      break;
    case "hc": {
      setSrc(hc);
      break;
    }
    case "lc":
      setSrc(lc);
      break;
    case "c":
      setSrc(c);
      break;
    default:
      return setSrc(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
      );
  }
};
