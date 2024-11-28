# View: v_rhh_TipNitDian

## Usa los objetos:
- [[rhh_tbtipfdo]]

```sql
CREATE VIEW [dbo].[v_rhh_TipNitDian]
AS
SELECT	tip_fdo,des_tip FROM rhh_tbtipfdo
WHERE	tip_fdo IN (1,2,3,4)
UNION ALL
SELECT	8 , 'Empleado'
UNION ALL
SELECT	9 , 'Sena'
UNION ALL
SELECT	10 , 'ICBF'
UNION ALL
SELECT	11 , 'Embargos'

```
