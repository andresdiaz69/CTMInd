# View: v_gth_NivCar

## Usa los objetos:
- [[rhh_cargos]]
- [[rhh_nivcar]]

```sql

CREATE VIEW [dbo].[v_gth_NivCar]
AS
SELECT DISTINCT C.niv_car, N.des_niv, C.cod_car
FROM            dbo.rhh_cargos AS C INNER JOIN
                         dbo.rhh_nivcar AS N ON C.niv_car = N.niv_car


```
