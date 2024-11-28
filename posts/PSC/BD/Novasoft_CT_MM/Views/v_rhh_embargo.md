# View: v_rhh_embargo

## Usa los objetos:
- [[RHH_EMBARGO]]
- [[RHH_EMPLEA]]

```sql
CREATE VIEW [dbo].[v_rhh_embargo]
AS
SELECT  EMP.COD_EMP,
	   RTRIM(LTRIM(AP1_EMP))+' '+ RTRIM(LTRIM(ap2_EMP))+' '+ RTRIM(LTRIM(NOM_EMP)) As Nom_emp,
	   COD_CON,
	   SEC_EMB,
	   FEC_INI,
	   VAL_EMB 
FROM RHH_EMBARGO EMB
RIGHT JOIN RHH_EMPLEA  EMP ON EMP.COD_EMP =EMB.cod_emp

```
