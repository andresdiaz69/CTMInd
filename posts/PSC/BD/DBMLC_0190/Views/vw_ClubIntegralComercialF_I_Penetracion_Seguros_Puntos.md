# View: vw_ClubIntegralComercialF_I_Penetracion_Seguros_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialF_I_NumeroCreditos]]
- [[vw_ClubIntegralComercialF_I_Penetracion_Seguros]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialF_I_Penetracion_Seguros_Puntos] as
select Ano_Periodo,CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Trimestre,VehiculosRecaudados,NumeroPolizas,convert(decimal(18,2),PenetracionSeguros)PenetracionSeguros,mf.Puntos
from 
(
	select Ano_Periodo,CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Trimestre,VehiculosRecaudados,NumeroPolizas
	,case when VehiculosRecaudados <> 0 then NumeroPolizas / VehiculosRecaudados *100 else 0 end as PenetracionSeguros
	,IdRangoMaestra,IdRangoVersionMax

	from 
	(
		select d.Ano_Periodo,d.CodigoEmpleado,d.Nombres,d.CodigoCentro,d.NombreCentro,d.Trimestre,d.VehiculosRecaudados
		,isnull(s.NumeroPolizas,0)NumeroPolizas,d.IdRangoMaestra,d.IdRangoVersionMax
		from vw_ClubIntegralComercialF_I_NumeroCreditos d
		left join vw_ClubIntegralComercialF_I_Penetracion_Seguros s 
		on d.Ano_Periodo = s.Ano and d.CodigoEmpleado = s.CodigoEmpleado and d.CodigoCentro = s.CodigoCentro and d.Trimestre = s.Trimestre
		where d.IdRangoMaestra = '9'
	)a
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.PenetracionSeguros) and (mf.Hasta >= b.PenetracionSeguros) 

```
