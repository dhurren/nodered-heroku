# nodered-heroku
An automation server based on [Node-RED](http://nodered.org), [PM2](https://pm2.keymetrics.io/) running on [Heroku](https://www.heroku.com).


## 1. Deploying to Heroku
* Login to your Heroku account then press this button.
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/dhurren/nodered-heroku)

* When prompted, set username and password for Node-RED Flow Editor:
* **NODE_RED_USERNAME** - the username to secure the Flow Editor with
* **NODE_RED_PASSWORD** - the password to secure the Flow Editor with
* (Note: Intially the app won't run as it requires an S3 bucket)
  
## 2. Configuring the Heroku App
* Add the Heroku Bucketeer(S3 bucket) service to the app (one S3 service can be shared between apps by going to another app that
  uses Bucketeer and selecting the 'resources' tab, then clicking on the 'attachments' option).
* Set GitHub as the deploy source on the app's 'Deploy' tab and point it at this repo or a forked version of this repo (do not enable automatic deploys).
* Restart the Dyno (use 'Restart All Dynos' option), and you should see the Node-Red welcome page when you click the 'Open App' button.

## 3. Access Node-Red editor on Cloud
* Flow Editor - Use the **/editor** path to access the editor
* Enter the user name password you gave at setup (these can be seen/changed in the Heroku app Environment vars)

## 4. Test the cloud service.
* Use the **[appname].herokuapp.com/**  url in your browser to try out the 'Hello World' home page.
* Use the **[appname].herokuapp.com/api**  url in your browser to try out the demo REST api end-point.

## 5. Create you first cloud end-point
* Select and copy the 3 nodes which form the existing 'api' service and paste them into the main tab.
* Double-click on the first node and modify the end-point path from '/api' to '/hello'
* Modify the end-point response by editing the JSON set in the second node.
* Switch to the 'Admin' tab and press the 'SAVE' inject node (Saves the changes to the S3 bucket)
* Test the new end-point in another browser tab by using the **/instance1/hello** path.
* Note: If you don't press 'SAVE' on the Admin tab your changes will be lost in 24hrs.

## Adding new Node-Red nodes to the pallet.
* Test your chosen node in the normal way by adding it to the node-red pallet.
   Note: that pallet node will be unavalable in 24hrs when your Heroku app restarts unless you do the following -
* Fork this repo and attach your Heroku app to that instead of this repo.
* Modify the package.json file to include the npm package for that node.
* Re-deploy your Heroku app from your new forked github repo.
  
## Increasing the number of node-red instances running.
* Once you are happy that your app is running properly, you may want to increase the instance count to get the most out of your Heroku dyno.
* Edit the pm2.json file and increase the number of node-red instances to 2 or 3.
* In Heroku edit your app's config vars to include NODE_RED_INSTANCES with the same number you used in the pm2.json file.
* Restart all Dynos.
* Now if you use **[appname].herokuapp.com/api** url an instance will be chosen to serv your request using a round-robin method (in proxy.js).
* You can force use of an individual instance like this - **[appname].herokuapp.com/instance2/api**


  
