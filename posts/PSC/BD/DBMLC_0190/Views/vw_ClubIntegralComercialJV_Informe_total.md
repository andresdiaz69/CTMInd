# View: vw_ClubIntegralComercialJV_Informe_total

## Usa los objetos:
- [[vw_ClubIntegralComercialJV_Detalles_Final]]
- [[vw_ClubIntegralComercialJV_Participacion_otras_fin_Puntos]]
- [[vw_ClubIntegralComercialJV_Participacion_Puntos]]
- [[vw_ClubIntegralComercialJV_Penetracion_Puntos]]
- [[vw_ClubIntegralComercialJV_Retomas_Puntos]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialJV_Informe_total] as
SELECT Ano_periodo,CodigoEmpleado,Nombres,CodigoMarcaGrupo,MarcaGrupo,CodigoCentro,NombreCentro,Trimestre,VehiculosRecaudados,BBVA,FINANZAUTO,DAVIVIENDA,FINANDINA,OCCIDENTE,BANCOLOMBIA,RCI,AUTORIZADAS,NO_AUTORIZADAS
,TotalCreditos,Retomas,convert(decimal(18,2),Penetracion)Penetracion,convert(decimal(18,2),Participacion)Participacion,convert(decimal(18,2),Participacion_otras_fin)Participacion_otras_fin,convert(decimal(18,2),PenetracionRetomas)PenetracionRetomas,PuntosPenetracion,PuntosParticipacion,PuntosParticipacion_otras_Fin,PuntosPenetracion_Retomas
,(PuntosPenetracion+PuntosParticipacion+PuntosParticipacion_otras_Fin+PuntosPenetracion_Retomas)PUNTOSTOTAL
FROM 
(
	select distinct d.Ano_periodo,d.CodigoEmpleado,d.Nombres,d.CodigoMarcaGrupo,d.MarcaGrupo,d.CodigoCentro,d.NombreCentro,d.Trimestre,d.VehiculosRecaudados
	,d.BBVA,d.FINANZAUTO,d.DAVIVIENDA,d.FINANDINA,d.OCCIDENTE,d.BANCOLOMBIA,d.RCI,d.AUTORIZADAS,d.NO_AUTORIZADAS,d.TotalCreditos,ISNULL(ret.Retomas,0)Retomas
	,ISNULL(pe.Penetracion,0)Penetracion,ISNULL(par.Participacion,0)Participacion,ISNULL(paro.Participacion_otras_fin,0)Participacion_otras_fin
	,ISNULL(ret.PenetracionRetomas,0)PenetracionRetomas,ISNULL(pe.Puntos,0)PuntosPenetracion ,ISNULL(par.Puntos,0)PuntosParticipacion
	,ISNULL(paro.Puntos,0)PuntosParticipacion_otras_Fin,ISNULL(ret.Puntos,0)PuntosPenetracion_Retomas
	from 
	vw_ClubIntegralComercialJV_Detalles_Final d
	left join vw_ClubIntegralComercialJV_Penetracion_Puntos pe 
	on d.Ano_periodo = pe.Ano_periodo and d.CodigoEmpleado = pe.CodigoEmpleado and d.CodigoCentro = pe.CodigoCentro and d.Trimestre = pe.Trimestre
	left join vw_ClubIntegralComercialJV_Participacion_Puntos par 
	on d.Ano_periodo = par.Ano_periodo and d.CodigoEmpleado = par.CodigoEmpleado and d.CodigoCentro = par.CodigoCentro and d.Trimestre = par.Trimestre
	left join vw_ClubIntegralComercialJV_Participacion_otras_fin_Puntos paro 
	on d.Ano_periodo = paro.Ano_periodo and d.CodigoEmpleado = paro.CodigoEmpleado and d.CodigoCentro = paro.CodigoCentro and d.Trimestre = paro.Trimestre
	left join vw_ClubIntegralComercialJV_Retomas_Puntos ret 
	on d.Ano_periodo = ret.Ano_periodo and d.CodigoEmpleado = ret.CodigoEmpleado and d.CodigoCentro = ret.CodigoCentro and d.Trimestre = ret.Trimestre
)A

```
