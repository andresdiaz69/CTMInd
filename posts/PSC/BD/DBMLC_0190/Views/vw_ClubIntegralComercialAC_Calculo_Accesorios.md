# View: vw_ClubIntegralComercialAC_Calculo_Accesorios

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[vw_ClubIntegralComercialAC_Accesorios]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Calculo_Accesorios] AS
SELECT 
		Ano_Periodo,CodigoEmpleado,Empleado,cod_marca,nombre_marca,CodigoCentro,NombreCentro,IdRangoMaestra,IdRangoVersionMax,Trimestre_Accesorios,AccesoriosVendidos
FROM(

	SELECT a.Ano_Periodo,a.CodigoEmpleado,a.Empleado,e.cod_marca,e.nombre_marca,e.CodigoCentro,c.NombreCentro,a.IdRangoMaestra,a.IdRangoVersionMax
			,isnull(a.[Julio]+a.[Agosto]+a.[Septiembre],0) AS [1],isnull(a.[Octubre]+a.[Noviembre]+a.[Diciembre],0) AS [2]
			,isnull(a.[Enero]+a.[Febrero]+a.[Marzo],0) AS [3],isnull(a.[Abril]+a.[Mayo]+a.[Junio],0) AS [4]
	FROM  vw_ClubIntegralComercialAC_Accesorios a
	left join Empleados e	on a.CodigoEmpleado = e.CodigoEmpleado 
	left join Centros  c	on e.CodigoCentro = c.CodigoCentro
	
)X
 UNPIVOT(AccesoriosVendidos FOR Trimestre_Accesorios in ([1],[2],[3],[4]))as t;




```
