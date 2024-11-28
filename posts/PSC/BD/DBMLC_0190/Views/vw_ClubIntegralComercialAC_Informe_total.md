# View: vw_ClubIntegralComercialAC_Informe_total

## Usa los objetos:
- [[ClubIntegralComercialAC_Creditos_Detalles]]
- [[vw_ClubIntegralComercialAC_Calculo_Puntos_Accesorios]]
- [[vw_ClubIntegralComercialAC_Calculo_Puntos_Retomas]]
- [[vw_ClubIntegralComercialAC_Participacion_otras_fin_Puntos]]
- [[vw_ClubIntegralComercialAC_Participacion_Puntos]]
- [[vw_ClubIntegralComercialAC_Penetracion_Puntos]]
- [[vw_ClubIntegralComercialAC_Ticket_Comparativa]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Informe_total] as

SELECT A.*,(PuntosPenetracion+PuntosParticipacion+PuntosParticipacion_otras_fin+PuntosAccesorios+PuntosRetomas)PuntosTotal
FROM 
(
SELECT DISTINCT d.*,c.Resultado_Ticket
,ISNULL(acc.AccesoriosVendidos,0)AccesoriosVendidos
,ISNULL(ret.Retomas,0)Retomas
,ISNULL(pe.PuntosPenetracion,0)PuntosPenetracion,ISNULL(pa.PuntosParticipacion,0)PuntosParticipacion,isnull(paro.PuntosParticipacion_otras_fin,0)PuntosParticipacion_otras_fin
,isnull(acc.Puntos,0)PuntosAccesorios
,ISNULL(ret.Puntos,0)PuntosRetomas
FROM ClubIntegralComercialAC_Creditos_Detalles d
LEFT JOIN vw_ClubIntegralComercialAC_Ticket_Comparativa c
ON d.Ano_Periodo = c.Ano_periodo AND d.CedulaVendedor = c.CedulaVendedor AND d.CodigoMarcaCI = c.CodigoMarcaCI AND d.CodigoCentro = c.CodigoCentro AND d.Trimestre = c.Trimestre
LEFT JOIN vw_ClubIntegralComercialAC_Penetracion_Puntos pe 
ON d.Ano_Periodo = pe.ano_periodo AND d.CedulaVendedor = pe.CedulaVendedor AND d.CodigoMarcaCI = pe.CodigoMarcaCI AND d.CodigoCentro = pe.CodigoCentro AND d.Trimestre = pe.Trimestre
LEFT JOIN vw_ClubIntegralComercialAC_Participacion_Puntos pa 
ON d.Ano_Periodo = pa.ano_periodo AND d.CedulaVendedor = pa.CedulaVendedor AND d.CodigoMarcaCI = pa.CodigoMarcaCI AND d.CodigoCentro = pa.CodigoCentro AND d.Trimestre = pa.Trimestre
LEFT JOIN vw_ClubIntegralComercialAC_Participacion_otras_fin_Puntos paro 
ON d.Ano_Periodo = paro.ano_periodo AND d.CedulaVendedor = paro.CedulaVendedor AND d.CodigoMarcaCI = paro.CodigoMarcaCI AND d.CodigoCentro = paro.CodigoCentro AND d.Trimestre = paro.Trimestre
LEFT JOIN vw_ClubIntegralComercialAC_Calculo_Puntos_Accesorios acc
ON d.Ano_Periodo = acc.Ano_Periodo AND d.CedulaVendedor = acc.CodigoEmpleado AND d.CodigoCentro = acc.CodigoCentro AND d.Trimestre = acc.Trimestre_Accesorios
LEFT JOIN vw_ClubIntegralComercialAC_Calculo_Puntos_Retomas ret 
ON d.Ano_Periodo = ret.Ano AND d.CedulaVendedor = ret.CodigoEmpleado AND d.CodigoMarcaCI = ret.CodigoMarcaCI AND d.CodigoCentro = ret.CodigoCentro AND d.Trimestre = ret.Trimestre
)A

```
