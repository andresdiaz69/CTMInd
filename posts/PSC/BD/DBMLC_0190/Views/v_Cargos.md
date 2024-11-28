# View: v_Cargos

## Usa los objetos:
- [[Cargos]]

```sql
CREATE VIEW [dbo].[v_Cargos]
AS
SELECT DISTINCT NombreCargo,LTRIM(RTRIM(CodigoCargo)) as CodigoCargo
FROM            dbo.Cargos
WHERE        (Activo = 1) AND (Obsoleto = 0)

```
