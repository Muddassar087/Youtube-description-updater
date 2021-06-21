# Youtube-description-updater
This application is made in python, HTML/CSS/JS

# Introduction
The YDU is a automation for youtube that uses youtube api v3 to update description you can update description of a single video as well as all other videos at once.
<ul>
  <li>For single video it will work fine</li>

  <li>For all videos to update there description you need know the new description will be added at the end of your video description it will not update whole video description</li>
</ul>

# Prerqusites
you need to have python3.7 or above version
install all the dependencies:
<code>
  pip install google_auth_oauthlib
  pip install google.auth
  pip install eel
</code>

# google api
for using this application or any other application which are using this youtube api you'll need a secret key what you have to do is create a OAUTH key from google api console (you can name the project youtube description updater) download the sceret file and update the name of screte file along with the destineation in apiservices.py file

<code>
  SCOPES = ["https://www.googleapis.com/auth/youtube"]
  SECRTE_FILE = 'you file destination along with name'
</code>

# Run
after all the installation run the main.py file
