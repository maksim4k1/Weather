const date = new Date();
const daysOfWeek = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  0: "Воскресенье",
}
const months = {
  0: "янв",
  1: "фев",
  2: "мар",
  3: "апр",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "авг",
  8: "сен",
  9: "окт",
  10: "ноя",
  11: "дек",
}

export function mapDaysOfWeek(num){
  if(num === 0) return "Сегодня";
  else if(num === 1) return "Завтра";
  else{
    const date = new Date();
    const dayNum = (date.getDay() + num) % 7;
    for(let key in daysOfWeek){
      if(key === String(dayNum)){
        return daysOfWeek[key];
      }
    }
  }
}

export function mapMonths(day){
  const monthNum = date.getMonth();
  return day < date.getDate() ? `${day} ${months[String(monthNum + 1)]}` : `${day} ${months[String(monthNum)]}`;
}