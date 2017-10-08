let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

let generateLocationMessage = (from, lat, long) => {

    let url = `https://www.google.com/maps?q=${lat},${long}`
    return {
        from,
        url,
        createdAt: new Date().getTime()
    }
}


module.exports = {generateMessage, generateLocationMessage};