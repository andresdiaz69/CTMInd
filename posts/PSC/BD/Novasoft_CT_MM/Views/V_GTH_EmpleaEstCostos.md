# View: V_GTH_EmpleaEstCostos

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[Fn_rhh_NombreCompleto]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_nivcar]]

```sql
CREATE VIEW [dbo].[V_GTH_EmpleaEstCostos]
AS
SELECT E.cod_emp, dbo.Fn_rhh_NombreCompleto(E.cod_emp, 1) AS nom_emp, H.cod_cia, H.cod_suc, H.cod_cco, H.cod_cl1, H.cod_cl2, H.cod_cl3, H.cod_area, H.cod_car, C.niv_car
FROM   rhh_emplea AS E 
INNER JOIN rhh_hislab AS H ON E.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
INNER JOIN rhh_cargos AS C ON H.cod_car = C.cod_car 
INNER JOIN rhh_nivcar AS N ON C.niv_car = N.niv_car
WHERE E.est_lab NOT IN ('00','99');
```
