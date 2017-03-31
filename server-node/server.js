var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    cors            = require('cors'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'), 
    db              = require('./models');

var app = express();
var port = process.env.PORT || 3001;

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

//Routes
app.use(require('./routes/anonymous-routes'));
app.use(require('./routes/protected-routes'));

app.use(require('./routes/user-routes'));
app.use(require('./routes/wallet-routes'));


//Initialize app and sequelize
db.sequelize
.sync({ force: false })
.then(function() {
    http.createServer(app).listen(port, function (err) {
      console.log('listening in http://localhost:' + port);
    });
});

