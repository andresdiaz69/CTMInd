# View: vw_CentrosServices

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]

```sql



CREATE VIEW [dbo].[vw_CentrosServices] AS


SELECT DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Cod_empresa, Cod_Centro)) AS INT),0) Id, Cod_empresa,Nombre_Empresa,Cod_Centro,Nombre_Centro
from  PSCService_DB..spiga_EstructuraDeCostos
where Cod_Departamento = 'TC' and Cod_empresa in (1,5,6)


```
