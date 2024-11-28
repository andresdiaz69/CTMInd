# View: vw_ComisionesCargosEsquemasManuales

## Usa los objetos:
- [[Cargos]]
- [[ComisionesCargosEsquemasManuales]]
- [[vw_ComisionesEsquemasManuales]]

```sql

/****** Alter view ****/

CREATE view [com].[vw_ComisionesCargosEsquemasManuales]

as select ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY CargosEsquemas.IdRegistro)) AS INT), 0) AS Id, 
	CargosEsquemas.IdEsquema,    Esquemas.NombreEsquema,     Esquemas.IdComisionModelo,   
	Esquemas.NombreModelo,       Esquemas.IdUnidadNegocio,   Esquemas.NombreUnidadNegocio,   Esquemas.DiaCorte,
	CargosEsquemas.CodigoCargo,  Cargos.NombreCargo,         CargosEsquemas.Estado,          Esquemas.Activar

from com.ComisionesCargosEsquemasManuales as CargosEsquemas
	join com.vw_ComisionesEsquemasManuales as Esquemas on Esquemas.IdEsquema = CargosEsquemas.IdEsquema
	join Cargos on Cargos.CodigoCargo = CargosEsquemas.CodigoCargo


```
