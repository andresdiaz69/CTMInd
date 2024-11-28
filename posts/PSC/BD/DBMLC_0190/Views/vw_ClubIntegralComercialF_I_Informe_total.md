# View: vw_ClubIntegralComercialF_I_Informe_total

## Usa los objetos:
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_Centros]]
- [[vw_ClubIntegralComercialF_I_NumeroCreditos]]
- [[vw_ClubIntegralComercialF_I_Participacion_otras_fin_Puntos]]
- [[vw_ClubIntegralComercialF_I_Participacion_Puntos]]
- [[vw_ClubIntegralComercialF_I_Penetracion_Puntos]]
- [[vw_ClubIntegralComercialF_I_Penetracion_Seguros_Puntos]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialF_I_Informe_total] as
SELECT  a.Ano_Periodo,a.CodigoEmpleado,a.Nombres
,C.SiglaMarca
,V.CodigoMarcaGrupo
,VG.MarcaGrupo
,a.CodigoCentro,a.NombreCentro,a.Trimestre,a.VehiculosRecaudados,a.BBVA,a.FINANZAUTO,a.DAVIVIENDA,a.FINANDINA,a.OCCIDENTE,a.BANCOLOMBIA,a.RCI,a.AUTORIZADAS,a.NO_AUTORIZADAS,a.TotalCreditos,convert(decimal(18,2),Penetracion)Penetracion,convert(decimal(18,2),Participacion)Participacion,convert(decimal(18,2),Participacion_otras_fin)Participacion_otras_fin,convert(decimal(18,2),PenetracionSeguros)PenetracionSeguros,PuntosPenetracion,PuntosParticipacion,PuntosParticipacion_otras_Fin,PuntosPenetracion_Seguros
,a.NumeroPolizas
,(PuntosPenetracion+PuntosParticipacion+PuntosParticipacion_otras_Fin+PuntosPenetracion_Seguros)PUNTOSTOTAL
FROM 
(
	select distinct d.Ano_Periodo,d.CodigoEmpleado,d.Nombres,d.CodigoCentro,d.NombreCentro,d.Trimestre,d.VehiculosRecaudados,d.BBVA,d.FINANZAUTO,d.DAVIVIENDA,D.FINANDINA,d.OCCIDENTE,d.BANCOLOMBIA,d.RCI,d.AUTORIZADAS,d.NO_AUTORIZADAS,d.TotalCreditos
	,ISNULL(pens.NumeroPolizas,0)NumeroPolizas
	,ISNULL(pe.Penetracion,0)Penetracion,ISNULL(par.Participacion,0)Participacion,ISNULL(paro.Participacion_otras_fin,0)Participacion_otras_fin
	,ISNULL(pens.PenetracionSeguros,0)PenetracionSeguros,ISNULL(pe.Puntos,0)PuntosPenetracion ,ISNULL(par.Puntos,0)PuntosParticipacion
	,ISNULL(paro.Puntos,0)PuntosParticipacion_otras_Fin,ISNULL(pens.Puntos,0)PuntosPenetracion_Seguros
	from 
	vw_ClubIntegralComercialF_I_NumeroCreditos d
	left join vw_ClubIntegralComercialF_I_Penetracion_Puntos pe 
	on d.Ano_periodo = pe.Ano_periodo and d.CodigoEmpleado = pe.CodigoEmpleado and d.CodigoCentro = pe.CodigoCentro and d.Trimestre = pe.Trimestre 
	left join vw_ClubIntegralComercialF_I_Participacion_Puntos par 
	on d.Ano_periodo = par.Ano_periodo and d.CodigoEmpleado = par.CodigoEmpleado and d.CodigoCentro = par.CodigoCentro and d.Trimestre = par.Trimestre
	left join vw_ClubIntegralComercialF_I_Participacion_otras_fin_Puntos paro 
	on d.Ano_periodo = paro.Ano_periodo and d.CodigoEmpleado = paro.CodigoEmpleado and d.CodigoCentro = paro.CodigoCentro and d.Trimestre = paro.Trimestre
	left join vw_ClubIntegralComercialF_I_Penetracion_Seguros_Puntos pens 
	on d.Ano_periodo = pens.Ano_periodo and d.CodigoEmpleado = pens.CodigoEmpleado and d.CodigoCentro = pens.CodigoCentro and d.Trimestre = pens.Trimestre
)A
LEFT JOIN vw_Centros C ON A.CodigoCentro = C.CodigoCentro
LEFT JOIN VehiculosMarcas V ON C.SiglaMarca = V.SiglaMarca
LEFT JOIN VehiculosMarcasGrupos VG ON V.CodigoMarcaGrupo = VG.CodigoMarcaGrupo

```
