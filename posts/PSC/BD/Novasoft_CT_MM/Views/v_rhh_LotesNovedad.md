# View: v_rhh_LotesNovedad

## Usa los objetos:
- [[rhh_LotesNovedad]]

```sql

CREATE VIEW [dbo].[v_rhh_LotesNovedad]
AS
SELECT *,CASE tip_novedad WHEN 1 THEN 'INGRESO' WHEN 2 THEN 'RETIRO' ELSE '' END det_tip_novedad FROM rhh_LotesNovedad where tip_novedad>0

```
