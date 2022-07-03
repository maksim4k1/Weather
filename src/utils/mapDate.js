const daysOfWeek = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
}

function mapDate(num){
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

export default mapDate;