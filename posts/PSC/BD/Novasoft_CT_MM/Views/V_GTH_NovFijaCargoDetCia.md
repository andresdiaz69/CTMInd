# View: V_GTH_NovFijaCargoDetCia

## Usa los objetos:
- [[GTH_NovFijaCargoDet]]

```sql

CREATE VIEW [dbo].[V_GTH_NovFijaCargoDetCia]
AS
SELECT        cod_cia, cod_car, cod_conv, cod_con, ind_vacPag, ind_licRem, ind_vac, ind_inc, ind_pro
FROM            dbo.GTH_NovFijaCargoDet
WHERE        (cod_cli = 0)

```
