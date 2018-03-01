const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentDate', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

/*app.use((req, res) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',        
        welcomeMessage: 'Hey, wellcome!'
    })
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/bad/', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    })
})

app.listen(port, () => {
    console.log(`App listening in ${port} port`);
});