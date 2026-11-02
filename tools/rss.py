# Regenera revista.xml i revista-ca.xml amb les entrades de data/revista.json que ja toca publicar (execució diària a GitHub Actions).
import json,os,html,datetime,sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE='https://lucasgranado9.github.io/Menudokanteohub/'
E=json.load(open(os.path.join(R,'data','revista.json'),encoding='utf8'))
today=datetime.date.today().isoformat()
for lang,fn,i in (('es','revista.xml',1),('ca','revista-ca.xml',0)):
    items=''
    for e in sorted(E,key=lambda x:x['d'],reverse=True):
        if e['d']>today:continue
        y,m,d=map(int,e['d'].split('-'))
        pub=datetime.datetime(y,m,d,8,0,tzinfo=datetime.timezone.utc).strftime('%a, %d %b %Y %H:%M:%S +0000')
        cat={'des':('Descobriment','Descubrimiento'),'bio':('Biografia','Biografía'),'idea':('Idea','Idea')}[e['k']][1 if lang=='es' else 0]
        items+='<item><title>%s</title><link>%s</link><guid isPermaLink="false">mk-revista-%s</guid><pubDate>%s</pubDate><category>%s</category><description>%s</description></item>\n'%(html.escape(e['title'][i]),html.escape(BASE+'revista.html?lang=%s#%s'%(lang,e['d'])),e['d'],pub,cat,html.escape(e['lede'][i]+' '+e['p'][i]))
    sub='Una entrada nova cada dia: descobriments, biografies i idees.' if lang=='ca' else 'Una entrada nueva cada día: descubrimientos, biografías e ideas.'
    xml='<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Revista Menudo Kanteo</title><link>%srevista.html</link><description>%s</description><language>%s</language><lastBuildDate>%s</lastBuildDate>\n%s</channel></rss>\n'%(BASE,html.escape(sub),lang,datetime.datetime.now(datetime.timezone.utc).strftime('%a, %d %b %Y %H:%M:%S +0000'),items)
    open(os.path.join(R,fn),'w',encoding='utf8').write(xml)
print('ok',today)
