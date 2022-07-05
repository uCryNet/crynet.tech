# Blog

Source code for my personal blog: [crynet.tech](https://crynet.tech/).

Dev version for my blog: [crynet-dev.pp.ua](https://crynet-dev.pp.ua/). Аdmin panel here: [crynet-dev.pp.ua/#/login](https://crynet-dev.pp.ua/#/login) (admin:admin). Dev version does not differ in functionality from the release.
___
You can download my blog and see how it works. Download [master](https://github.com/uCryNet/blog/archive/refs/heads/master.zip) branch and install. It is assumed that you already have Node and NPM installed.

### How to start:
**Back-end:**
* `cd server`
* `npm i`
* `npm run start`

**Front-end:**
* `cd client`
* `npm i`
* `npm run serve`
___
### Info for front-end:
* **Starting in:** localhost:8080
* **Admin panel:** [localhost:8080/#/login](localhost:8080/#/login) (admin:admin)


### Info for back-end:
* **Starting in:** localhost:5000
* **API:** localhost:5000/api/
* SSL is not used locally, but prod and dev use. On a VPS startApp() function is different from the local
* Nginx is not used locally, but prod and dev use for static files. Local used endpoint that is not available on a VPS
___
### Links:
* **Release** [crynet.tech](https://crynet.tech/)
* **Dev:** [crynet-dev.pp.ua](https://crynet-dev.pp.ua/)
* **Dev admin panel:** [crynet-dev.pp.ua/#/login](http://crynet-dev.pp.ua/#/login) (admin:admin)
* **Nginx config:** [crynet.tech.conf](https://github.com/uCryNet/blog/blob/dev/crynet.tech.conf)
