import json
import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from video import Video

# making a file for client to store its key -- not for production delete this while deploying

def auth():
    credentials = None
    if os.path.exists('youtube_data_token_brand.pickle'):
        print('Loading Credentials From File...')
        with open('youtube_data_token_brand.pickle', 'rb') as token:
            credentials = pickle.load(token)
            
    # If there are no valid credentials available, then either refresh the token or log in.
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            print('Refreshing Access Token...')
            credentials.refresh(Request())
        else:
            print('Fetching New Tokens...')
            flow = InstalledAppFlow.from_client_secrets_file(
                'secret_file.json',
                scopes=[
                    'https://www.googleapis.com/auth/youtube'
                ]
            )

            flow.run_local_server(port=0, prompt='consent',
                                authorization_prompt_message='')
            credentials = flow.credentials

            with open('youtube_data_token_brand.pickle', 'wb') as f:
                print('Saving Credentials for Future Use...')
                pickle.dump(credentials, f)

    return credentials

def dummyData():
    lis = []
    for i in range(10):
        lis.append(Video(title='dummy',id='dummy',description='some dummy description for the testing facility and for the checking purpose{}'.format(i)))
    return [obj.__dict__ for obj in lis]