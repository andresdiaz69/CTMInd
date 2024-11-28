# View: vw_ClubIntegralRepuestosJR_Calculo_Puntos_Ventas

## Usa los objetos:
- [[vw_ClubIntegralRangosMaestrasFull]]
- [[vw_ClubIntegralRepuestosJR_Ventas]]

```sql
create view [dbo].[vw_ClubIntegralRepuestosJR_Calculo_Puntos_Ventas] as
select ano_spiga,CodigoEmpleado,nombres,CodigoCentro,NombreCentro,cod_marca,Marca,b.CodigoMarcaGrupo,MarcaGrupo,Trimestre,Resultado,mf.Puntos
from 
(
	select ano_spiga,CodigoEmpleado,nombres,CodigoCentro,NombreCentro,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,IdRangoMaestra,IdRangoVersionMax,Trimestre,Resultado
	from 
	(
	select ano_spiga,CodigoEmpleado,nombres,CodigoCentro,NombreCentro,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,IdRangoMaestra,IdRangoVersionMax
	,Trimestre1_Ventas as '1'
	,Trimestre2_Ventas as '2'
	,Trimestre3_Ventas as '3'
	,Trimestre4_Ventas as '4'

	from vw_ClubIntegralRepuestosJR_Ventas
	)a
	unpivot (Resultado for Trimestre in([1],[2],[3],[4]))p
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < Resultado) and (mf.Hasta >= Resultado)


--armando chisaca mercedes

--lina botero gerente de repuestos




```
