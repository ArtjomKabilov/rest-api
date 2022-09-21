const express = require('express');// загружает платформу Express.js, популярную платформу на основе Node.js для создания API.
const cors = require('cors');//загружает пакет cors, который позволяет отправлять так называемые заголовки CORS с ответами на запрос, которые позволяют использовать API из браузера, в случае, если сервер API и клиентское приложение, работающее в браузере, не обслуживаются из одного и того же места .
const app = express(); // инициализирует платформу Express (создает объект приложения)

app.use(cors());        // Avoid CORS errors in browsers; указывает Express обрабатывать каждый входящий HTTP-запрос с помощью функции cors(), которая добавляет к ответу заголовки CORS.
app.use(express.json()) // Populate req.body, указывает Express обрабатывать каждый входящий HTTP-запрос с помощью express.json ((функция, которая анализирует тело запроса и, если присутствует JSON, считывает объект params req.body из JSON)

const widgets = [ //определить массив виджетов с 3 членами, которые являются объектами с 3 свойствами: идентификатор, имя и цена
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

app.get('/widgets', (req, res) => { //определяют конечную точку для запроса GET /widgets, который возвращает весь массив виджетов
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => { //определить конечную точку для запроса GET /widgets/id, который возвращает виджет с этим идентификатором из массива виджетов, присоединенного к /widgets/id . Если идентификатор запроса не определен в массиве widgets, возвращается сообщение об ошибке "Виджет не найден".
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widgets[req.params.id - 1])
})

app.post('/widgets', (req, res) => { //определить конечную точку для запроса POST /widgets, который добавляет новый виджет в коллекцию
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newWidget = {
        id: widgets.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + (widgets.length - 1)).send(
        newWidget
    )
})

//DELETE
app.delete('widgets/:id',(req,res)=>{
    if (typeof  widgets[req.params.id - 1] === 'udefined'){
        return res.status(404).send({error: "Widget not found"})
    }
    widgets.splice(req.params.id-1,1)
    res.status(204).send()
})

app.listen(8080, () =>{
    console.log('API up at: http://localhost:8080')
})
