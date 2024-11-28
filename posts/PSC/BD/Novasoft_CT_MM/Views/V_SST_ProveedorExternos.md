# View: V_SST_ProveedorExternos

## Usa los objetos:
- [[GTH_Emplea_Externo]]

```sql
CREATE   VIEW [dbo].[V_SST_ProveedorExternos]
AS
SELECT	cod_emp_ext, nom_emp_ext 
FROM	GTH_Emplea_Externo WHERE cod_emp_ext = '0'
UNION	ALL
SELECT	cod_emp_ext, nom_emp_ext 
FROM	GTH_Emplea_Externo WHERE cod_clas = 2;

```
