# View: vw_ComisionesManualesLiquidacionesTotalComisiones

## Usa los objetos:
- [[ComisionesManualesLiquidacionesDetalles]]

```sql
CREATE VIEW [com].[vw_ComisionesManualesLiquidacionesTotalComisiones]
AS
SELECT IdLiquidacion,     Ano_Periodo,     Mes_Periodo,         CodigoEmpleado,    NombreEmpleado,
	   CodigoCargo,       NombreCargo,     IdEsquema,           NombreEsquema,     IdComisionModelo,
	   NombreModelo,      IdUnidadNegocio, NombreUnidadNegocio, DiaCorte,          SUM(Comision) ComisionTotal

	FROM ComisionesManualesLiquidacionesDetalles
GROUP BY IdLiquidacion,     Ano_Periodo,     Mes_Periodo,         CodigoEmpleado,    NombreEmpleado,
	     CodigoCargo,       NombreCargo,     IdEsquema,           NombreEsquema,     IdComisionModelo,
	     NombreModelo,      IdUnidadNegocio, NombreUnidadNegocio, DiaCorte 

```
