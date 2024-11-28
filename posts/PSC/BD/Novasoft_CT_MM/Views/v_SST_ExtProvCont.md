# View: v_SST_ExtProvCont

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[SST_ClasificaExterno]]

```sql
CREATE VIEW [dbo].[v_SST_ExtProvCont]
AS
SELECT        E.cod_emp_ext AS cod_emp, RTRIM(E.nom_emp_ext) + ' (' + RTRIM(C.des_clas) + ')' AS nom_emp
FROM            dbo.GTH_Emplea_Externo AS E WITH (NOLOCK) INNER JOIN
							dbo.SST_ClasificaExterno AS C WITH (NOLOCK) ON E.cod_clas = C.cod_clas
WHERE        (E.cod_clas IN ('1', '2'))

```
