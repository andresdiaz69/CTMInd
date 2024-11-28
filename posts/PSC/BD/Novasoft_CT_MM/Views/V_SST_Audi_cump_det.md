# View: V_SST_Audi_cump_det

## Usa los objetos:
- [[SST_Audi_cump_det]]

```sql
CREATE VIEW [dbo].[V_SST_Audi_cump_det]
AS
SELECT        conse, cod_sede, cod_tipo, numeral, cod_cia
FROM            dbo.SST_Audi_cump_det
WHERE        (ind_plan = 1)

```
