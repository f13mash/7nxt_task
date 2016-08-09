Project Requisites
* Sqlite3
* Node.js
* Express
* Npm
 
From inside the project directory run 
* `npm install`
* `npm run setup_db`
* `npm run start`
* open [http://localhost:4000/segment/157](http://localhost:4000/segment/157)


As part of `npm run setup_db`
* Download feeds to static_db directory
* Run db_init_script
* db_init_script generated a table **segment_traffic_log** , which contains every transaction/ride/segment travelled along with the revenue generated just due to that segment for a given ticket

When application is started with `npm run start` it launched bin/app.js script.
* **lib/server** create the app and configure the servers
* **lib/middlewares** attached the necessary middlewares
* **lib/route** contains the route and their handlers
* **lib/db** create sequelize instance with appropriate configuration and necessary method exposed for api-handlers
* **bin/db_init_script** contains main logic of database population, it creates an additional table `segment_traffic_log` which is used by the app to get the revenue and pax figures.

Currently, api returns both(i.e. PAX and Revenue figures) as **segment_traffic_log** table and has been optimized to cater to generating both the metrics.

To look inside the the database, run `sqlite3 flixbus.db`
