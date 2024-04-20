import requests
from pprint import pprint
from dotenv import load_dotenv
import os
import datetime
from sympy import *

load_dotenv()

URL_API_TEMPO = os.environ.get("URL_API_TEMPO")
URL_API_PAINEIS_SOLARES = os.environ.get("URL_API_PAINEIS_SOLARES")
INTERVALO_ATUALIZACOES_SEGUNDOS = 5

def calcular_coeficientes_funcao_energia_solar(capacidade_painel, cod_condicao_climatica):
    RAIZ_UM = 6
    RAIZ_DOIS = 18
    PICO_VERTICE_X = 12
    
    a = Symbol("a")
    b = Symbol("b")
    c = Symbol("c")
    
    if cod_condicao_climatica == 800:
        PICO_VERTICE_Y = capacidade_painel
        
    elif cod_condicao_climatica == 801:
        PICO_VERTICE_Y = capacidade_painel*0.8
            
    elif cod_condicao_climatica == 802:
        PICO_VERTICE_Y = capacidade_painel*0.6
            
    elif cod_condicao_climatica == 803:
        PICO_VERTICE_Y = capacidade_painel*0.5
            
    else:
        PICO_VERTICE_Y = capacidade_painel*0.4

    sistema = [Eq(0, a*RAIZ_UM**2 + b*RAIZ_UM + c), Eq(PICO_VERTICE_Y, a*PICO_VERTICE_X**2 + b*PICO_VERTICE_X + c), Eq(0, a*RAIZ_DOIS**2 + b*RAIZ_DOIS + c)]
    
    resolucao_sistema = linsolve(sistema, a, b, c)
    
    return ({
        "a": N(resolucao_sistema.args[0][0]),
        "b": N(resolucao_sistema.args[0][1]),
        "c": N(resolucao_sistema.args[0][2])
    })


def calcular_geracao_energia_atual(coeficientes, horario_atual: datetime.datetime):
    horario_decimal = float(horario_atual.hour) + float(horario_atual.minute/60)
    resultado_geracao_atual = coeficientes["a"]*(horario_decimal**2) + coeficientes["b"]*horario_decimal + coeficientes["c"]
    
    if resultado_geracao_atual <= 0:
        return 0
    
    return resultado_geracao_atual    


def calcular_energia_consumida(horario_atual: datetime.datetime):
    horario_decimal = float(horario_atual.hour) + float(horario_atual.minute/60)
    
    a: float
    b: float
    
    def calculo(a, b, horario_decimal):
        return a*horario_decimal + b
    
    if horario_decimal > 4 and horario_decimal <= 8:
        a = 0.525
        b = -1.9
    
    elif horario_decimal > 8 and horario_decimal <= 11:
        a = -0.3
        b = 4.8
        
    elif horario_decimal > 11 and horario_decimal <= 13:
        a = 0.3
        b = -1.8
        
    elif horario_decimal > 13 and horario_decimal <= 17:
        a = -0.225
        b = 5.025
        
    elif horario_decimal > 17 and horario_decimal <= 19:
        a = 0.899
        b = -14.1
        
    elif horario_decimal > 19 and horario_decimal <= 23:
        a = -0.675
        b = 15.825
        
    else: 
        return 0.3
    
    return calculo(a, b, horario_decimal)


ultimo_tempo = datetime.datetime.now()
ultima_atualizacao = datetime.datetime.now()

while True:
    
    horario_atual = datetime.datetime.now()
    
    if horario_atual.second != ultimo_tempo.second:
        print(horario_atual)
        ultimo_tempo = horario_atual
    
    dif_tempo = horario_atual - ultima_atualizacao
    
    if dif_tempo.seconds >= INTERVALO_ATUALIZACOES_SEGUNDOS:
        
        req_api_tempo = requests.get(URL_API_TEMPO).json()
        paineis_solares = requests.get(URL_API_PAINEIS_SOLARES).json()
        cod_condicao_climatica = req_api_tempo["weather"][0]["id"]
        
        #APENAS PARA TESTE
        for painel in paineis_solares:
            coeficientes = calcular_coeficientes_funcao_energia_solar(painel["capacidadeGeracao"], cod_condicao_climatica)
            print(f'Painel {painel["id"]} está gerando {calcular_geracao_energia_atual(coeficientes, horario_atual)} W')
        
        print(f'Atualmente consumindo {calcular_energia_consumida(horario_atual)} kW')

        ultima_atualizacao = horario_atual