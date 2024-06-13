//Esto es un manejador de eventos con esta manera puedo encolar procesos para no ejecutar todos a la ves

function eventManager(fn)
{
    let events = [];
    let executing = false;

    //funcion de orden superior
    return async () => {

        events.push(fn)

        if(!executing)
        {
            executing = true;

            while(events.length)
            {
                //shift quita el primer elemento de los arrays y aparte lo retorna
                await events.shift()();
            }
            executing = false;
        }

    }
}

const manager = eventManager(async () => {
    const process = crypto.randomUUID();
    console.log('inicia' + process)
    
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log('finaliza'+process)
            resolve()
        }, 2000)
    })
})

const managerUrl = eventManager(async () => {
    const num = Math.floor(Math.random() * 100 + 1)
    console.log('inicia ' + num)
    
    const json = await fetch("http://jsonplaceholder.typicode.com/todos/"+num)
                 .then(response=>response.json())
                 .then(json => json)
    console.log('finaliza '+ num);
    document.getElementById('content').innerHTML += json.title+ " ,";
})