# View: V_SST_Sesiones

## Usa los objetos:
- [[SST_EventosProg]]

```sql
CREATE VIEW [dbo].[V_SST_Sesiones]
AS
SELECT        cod_cia, anio, version, cons, cod_even, num_ses, fec_ses
FROM            dbo.SST_EventosProg

```
