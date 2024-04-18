import requests
from pprint import pprint
from dotenv import load_dotenv
import os
import datetime

load_dotenv()

URL_API_TEMPO = os.environ.get("URL_API_TEMPO")
INTERVALO_ATUALIZACOES_SEGUNDOS = 300

ultimo_tempo = datetime.datetime.now()
ultima_atualizacao = datetime.datetime.now()

while True:
    
    tempo_atual = datetime.datetime.now()
    
    if tempo_atual.second != ultimo_tempo.second:
        print(tempo_atual)
        ultimo_tempo = tempo_atual
    
    dif_tempo = tempo_atual - ultima_atualizacao
    if dif_tempo.seconds >= INTERVALO_ATUALIZACOES_SEGUNDOS:
        
        r = requests.get(URL_API_TEMPO)
        pprint(r.json())

        ultima_atualizacao = tempo_atual