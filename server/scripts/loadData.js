import fs from 'fs'

const loadData = (arrayObj) => {
    for (let id = 0; id < arrayObj.length; id++) {
        const data = JSON.parse(fs.readFileSync(arrayObj[id].file, "utf8"))
        data.forEach((res) => {
            arrayObj[id].model.create(res)
                .then(() => {
                    return
                }) 
        })
    }
}

export default loadData