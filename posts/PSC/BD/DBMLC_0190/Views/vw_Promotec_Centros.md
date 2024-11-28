# View: vw_Promotec_Centros

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]

```sql
CREATE VIEW [dbo].[vw_Promotec_Centros] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.Cod_Centro)) AS INT),0) AS Id, CodigoCentro = Cod_Centro, 
	NombreCentro = Nombre_Centro
FROM
(
	SELECT DISTINCT Cod_Centro, Nombre_Centro
	FROM PSCService_DB..spiga_EstructuraDeCostos 
	WHERE Cod_empresa in (1,6)
) A

```
