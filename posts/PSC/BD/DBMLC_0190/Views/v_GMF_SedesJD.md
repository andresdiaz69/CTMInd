# View: v_GMF_SedesJD

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql



CREATE VIEW [dbo].[v_GMF_SedesJD]
AS
select distinct 
ROW_NUMBER() OVER(
       ORDER BY Sede) as Id,
Empresa, 
Sede from v_GMF_1_JD_ValoresVentasNetas

```
