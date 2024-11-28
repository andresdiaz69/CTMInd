# View: SpigaEmpresaCentrosMarcasSecciones

## Usa los objetos:
- [[EmpresaCentroMR]]
- [[EmpresaCentroSecciones]]

```sql






CREATE VIEW [dbo].[SpigaEmpresaCentrosMarcasSecciones] AS

SELECT DISTINCT

A.PkFkEmpresas,  
A.PkFkCentros,  
A.PkFkMR,  
B.PkFkSecciones

FROM [192.168.90.10\SPIGAPLUS].[DMS00280].[RE].[EmpresaCentroMR] AS A LEFT OUTER JOIN [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[EmpresaCentroSecciones] AS B
ON 
A.PkFkEmpresas = B.PkFkEmpresas 
AND 
A.PkFkCentros = B.PkFkCentros

```
