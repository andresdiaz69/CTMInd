# View: v_Requisiciones_CargosObligatorios

## Usa los objetos:
- [[Cargos]]

```sql
CREATE VIEW [dbo].[v_Requisiciones_CargosObligatorios] AS
SELECT * FROM Cargos 
WHERE CodigoCargo in (166,167,25,174,471,600) AND Activo = 1 AND Obsoleto = 0

```
