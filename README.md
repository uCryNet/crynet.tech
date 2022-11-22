# Blog

Source code for my personal blog: [crynet.tech](https://crynet.tech/).
___
You can download my blog and see how it works. Download [master](https://github.com/uCryNet/blog/archive/refs/heads/master.zip) branch and install. It is assumed that you already have Node and NPM installed. Admin panel http://localhost:8080/#/login (admin:admin)

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
* SSL is not used locally, but prod use. On a VPS startApp() function is different from the local
* Nginx is not used locally, but prod and use for static files. Local used endpoint that is not available on a VPS
___
### Links:
* **Release** [crynet.tech](https://crynet.tech/)
* **Nginx config:** [crynet.tech.conf](https://github.com/uCryNet/blog/blob/master/crynet.tech.conf)
