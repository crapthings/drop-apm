### ABOUT

this repo work with
https://github.com/vladgolubev/kadira

kadira can be slow after days
run this to drop old data

### HOW

```bash
git clone https://github.com/crapthings/drop-apm.git
cd drop-apm
npm i
pm2 start index.js --name='drop-apm'
```

#### default env

process.env.MONGO_URL = 'mongodb://localhost:27018'
process.env.DB = 'apm'
process.env.PORT = 3000
