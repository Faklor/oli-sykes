import fs from 'fs'

const loadData = (arrayObj) => {
    arrayObj.forEach((obj) => {
        fs.readFile(obj.file, "utf8", async(error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            data = JSON.parse(data);
            const model = await obj.model.findAll({ raw: true })
            console.log(model)
            if (model.length == 0) {
                data.forEach(async(res) => {
                    await obj.model.create(res)
                })
            }
        });
    })
}

export default loadData