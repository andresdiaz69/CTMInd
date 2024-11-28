# View: vw_Empresas

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Empresas]]

```sql
CREATE VIEW [dbo].[vw_Empresas] AS
SELECT E.CodigoEmpresa, NombreEmpresa = UPPER(CASE WHEN EA.CodigoEmpresa IS NOT NULL THEN EA.Empresa ELSE E.NombreEmpresa END)
FROM (
	SELECT * FROM Empresas 
	WHERE NombreEmpresa NOT LIKE '%NORMALIZADA%' AND NombreEmpresa NOT LIKE '%COLGA%' 
) E
LEFT JOIN (
	SELECT DISTINCT CodigoEmpresa, Empresa 
	FROM EmpleadosActivos 
	WHERE Ano_Periodo >= YEAR(DATEADD(YEAR,-1,GETDATE()))
) EA ON EA.CodigoEmpresa = E.CodigoEmpresa

```
