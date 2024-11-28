# View: vw_ClubIntegralPosventaASC_Facturacion_Trimestre_Detalle

## Usa los objetos:
- [[vw_ClubIntegralPosventaASC_Facturacion_Trimestre]]

```sql
CREATE view [dbo].[vw_ClubIntegralPosventaASC_Facturacion_Trimestre_Detalle] as
SELECT isnull(row_number()over (order by nombres asc),-1)as orden ,[Ano_Spiga],[CodigoEmpresa],[empresa],[codigomarca],[marca],[codigoempleado],[nombres],Ticket,Trimestre
,IdRangoMaestra,IdRangoVersionMax
FROM
(
	SELECT f.Ano_Spiga,f.CodigoEmpresa,f.empresa,f.codigomarca,f.marca,f.codigoempleado,f.nombres,f.[1],f.[2],f.[3],f.[4],f.IdRangoMaestra,f.IdRangoVersionMax
	FROM dbo.vw_ClubIntegralPosventaASC_Facturacion_Trimestre f
	
)a
UNPIVOT(Ticket FOR Trimestre IN ([1],[2],[3],[4]))a




```
