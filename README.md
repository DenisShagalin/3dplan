
## Getting Started

```bash
npm install
npm run biild
```
## Start build

use native
```
npm start
```
use pm2 
```
npm install pm2 -g
pm2 start npm --name art-next -- run start -- -p 3000
```

To stop process
```
pm2 stop art-next
```
To restart
```
pm2 restart art-next
```
To delete
```
pm2 delete art-next
```