
const format = (arr) => {
    arr.map(i => {
        Object.keys(i.dataValues).forEach(attr => {
            if (attr == "createdAt" || attr == "updatedAt") {
                const MoscowFormater = new Intl.DateTimeFormat('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric', 
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: "Europe/Moscow"
                });
                const date = new Date(i[attr]);
                i.dataValues[attr] = MoscowFormater.format(date)
            }  
        })
    })
}

export default format