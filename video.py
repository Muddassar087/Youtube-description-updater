class Video(object):
    def __init__(self,title,id,description) -> None:
        self.title = title
        self.id = id
        self.description = description
    
    def getId(self):
        return self.id
    
    def getTtile(self):
        return self.title
    
    def getDesc(self):
        return self.description

    def __str__(self) -> str:
        return "title="+self.title+"\nid="+self.id+"\ndescription="+self.description+"\n"

def changeDescription(desc):
    str = desc.replace('\n','&')
    str = str.replace("'","~")
    return str.replace('"','#')