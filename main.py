from testing import dummyData
import eel
from APiservices import ApiService, Key_Expired

_api = ApiService()

eel.init('src', allowed_extensions=['.js', '.html'])

@eel.expose
def loadClient():
    #authenticate and return result in json form
    return _api._auth().to_json()

@eel.expose
def deleteClient():
	_api.logout()

@eel.expose
def isKeyExpired():
    return Key_Expired

@eel.expose
def getMyData():
    return _api.getVideosListId() if _api.client_Key_secret is not None and _api.client_Key_secret.valid else None;

@eel.expose
def updateDesc(obj):
    return _api.updateVideo(obj)

@eel.expose
def updateAllvideos(obj):
    return _api.updateAllVideos(obj)

if __name__ =='__main__':
    eel.start('index.html')