var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}
var generateLocationMessage = (from, latitude, longtitude) => {
    return {
        url: `https://www.google.com/maps/?q=${latitude},${longtitude}`,
        from,
        createdAt: new Date().getTime()
    };
}

module.exports = {
    generateMessage,
    generateLocationMessage
};