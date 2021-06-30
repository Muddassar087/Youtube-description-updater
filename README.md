# Youtube-description-updater
This application is made in python, HTML/CSS/JS

# Introduction
The YDU is a automation for youtube that uses youtube api v3 to update description you can update description of a single video as well as all other videos at once.
<ul>
  <li>For single video it will work fine</li>

  <li>For all videos to update there description the new description will be added at the end of your each video's description it will not update the whole video's description</li>
</ul>

# Prerqusites
you need to have python 3.7 or above version<br>
install all the dependencies:<br>
<code>pip install google_auth_oauthlib</code><br>
<code>pip install google.auth</code><br>
<code>pip install eel</code><br>

# google api
for using this application or any other application which are using this youtube api you'll need a secret key what you have to do is create a OAUTH key from google api console (you can name the project youtube description updater) download the sceret file and update the name of screte file along with the destination in apiservices.py file and testing.py in case you want to store your key for longer time..

<code>SCOPES = ["https://www.googleapis.com/auth/youtube"]</code><br>
<code>SECRTE_FILE = 'your secret file.json destination along with name'</code>

# Run
after all the installation run the main.py file

# demo
![homeAnimation1](https://user-images.githubusercontent.com/69845990/123261868-b81c7d80-d510-11eb-9cf9-955c34d9efd9.gif)
