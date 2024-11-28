# View: vw_ComisionesSegurosAsesores_DetalleComprobante

## Usa los objetos:
- [[RangosMaestras]]
- [[vw_ComisionesSegurosAsesores]]

```sql


CREATE VIEW [dbo].[vw_ComisionesSegurosAsesores_DetalleComprobante] AS

SELECT DISTINCT vw_ComisionesSegurosAsesores.*  from vw_ComisionesSegurosAsesores
where IdTerceros IN(

SELECT SUBSTRING(RangosMaestras.NombreMaestra , 1, (CHARINDEX('/',RangosMaestras.NombreMaestra )-1)) AS IdTercerosFinanciera FROM RangosMaestras 
WHERE (RangosMaestras.IdComisionModeloSub = 77 and RangosMaestras .IdComisionModeloSubCriterio = 146) OR (RangosMaestras.IdComisionModeloSub = 92 and RangosMaestras.IdComisionModeloSubCriterio = 172)
) 
and Ano_Periodo >= 2021


```
