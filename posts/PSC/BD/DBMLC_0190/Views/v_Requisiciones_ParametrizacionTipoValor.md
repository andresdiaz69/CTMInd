# View: v_Requisiciones_ParametrizacionTipoValor

## Usa los objetos:
- [[Requisiciones_ParametrizacionTipo]]
- [[Requisiciones_ParametrizacionValor]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ParametrizacionTipoValor] AS
SELECT PV.IdTipo ,PT.Tipo ,PV.Id ,PV.Nombre ,PV.Estado
FROM [dbo].[Requisiciones_ParametrizacionValor] AS PV
LEFT JOIN [dbo].[Requisiciones_ParametrizacionTipo] AS PT ON PV.IdTipo = PT.IdTipo

```
