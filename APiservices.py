import google_auth_oauthlib.flow
import googleapiclient.discovery
from google.auth.transport.requests import Request
import googleapiclient.errors
from oauthlib.oauth2.rfc6749.clients.base import Client
from uritemplate import api
from testing import *
from google.auth.transport.requests import Request
from video import Video, changeDescription


SCOPES = ["https://www.googleapis.com/auth/youtube"]
SECRTE_FILE = './secret_file.json'
API_KEY = "" # none need for this project
CHANNEL_ID = ""
API = 'youtube'
API_VERSION = "v3"
Key_Expired = False

class ApiService(object):
    client_Key_secret = None # should not be used like ''//keep it safe//''
    apiInst = None

    def _auth(self):
        # self.client_Key_secret = auth() # testing
        
        if self.client_Key_secret is None:
            flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(SECRTE_FILE, SCOPES)
            flow.run_local_server(port=0,prompt='consent',
                                authorization_prompt_message='')
            print('getting data')
            self.client_Key_secret = flow.credentials
        if self.client_Key_secret and self.client_Key_secret.expired and self.client_Key_secret.refresh_token:
            print('Refreshing Access Token...')
            self.client_Key_secret.refresh(Request())

        return self.client_Key_secret if self.client_Key_secret != None else None

    def build(self):
        return googleapiclient.discovery.build(
                API, API_VERSION, credentials=self._auth())
    
    def logout(self):
        if self.client_Key_secret is not None:
            self.client_Key_secret = None

    def getVideosListId(self):
        vidoesList = []

        self.apiInst = self.build();
        
        data = self.apiInst.activities().list(
            part="snippet,contentDetails",
            maxResults=50,
            mine=True
        ).execute()

        videos = data['items']

        for obj in videos:
            id = obj['contentDetails']['upload']['videoId']
            vidoetitle = obj['snippet']['title']
            desc = changeDescription(obj['snippet']['description'])
            vidObj = Video(title=vidoetitle, id=id, description=desc)
            vidoesList.append(vidObj)

        return [obj.__dict__ for obj in vidoesList] if len(vidoesList) > 0 else dict()
    
    def updateVideo(self,obj):
        self.apiInst = self.build();
        videoResp = self.apiInst.videos().list(id=obj['id'], part="snippet").execute()
        snip = videoResp['items'][0]['snippet']
        snip['description'] = obj['description']

        data = self.apiInst.videos().update(
            part="snippet",
            body=dict(snippet=snip,id=obj['id'])
        ).execute()

        return data
    
    def updateAllVideos(self,obj):
        self.apiInst = self.build();
        videoResp = self.apiInst.videos().list(id=obj['id'], part="snippet").execute()
        snip = videoResp['items'][0]['snippet']
        snip['description'] = snip['description']+"\n"+obj['description']
        
        data = self.apiInst.videos().update(
            part="snippet",
            body=dict(snippet=snip,id=obj['id'])
        ).execute()

        return data