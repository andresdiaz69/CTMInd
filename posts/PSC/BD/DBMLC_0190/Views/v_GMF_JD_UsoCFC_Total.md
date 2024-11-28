# View: v_GMF_JD_UsoCFC_Total

## Usa los objetos:
- [[GMF_JD_UsoCFC_Total]]
- [[GMF_JD_UsoCFC_TotalInt]]

```sql


CREATE VIEW [dbo].[v_GMF_JD_UsoCFC_Total]
AS

select DISTINCT
ROW_NUMBER() OVER(
       ORDER BY sede) as Id,*
from (
select*from  GMF_JD_UsoCFC_Total 
union all
select * from GMF_JD_UsoCFC_TotalInt) as a
group by Empresa, CodigoPresentacion, NombrePresentacion , CodigoConcepto, año, mes, nombreconcepto, sede,valor,N1,N2


```
