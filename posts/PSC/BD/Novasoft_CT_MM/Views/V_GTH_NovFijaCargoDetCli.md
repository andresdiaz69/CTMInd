# View: V_GTH_NovFijaCargoDetCli

## Usa los objetos:
- [[GTH_NovFijaCargoDet]]

```sql

CREATE VIEW [dbo].[V_GTH_NovFijaCargoDetCli]
AS
SELECT        cod_cli, cod_car, cod_conv, cod_con, ind_pro, ind_licRem, ind_vacPag, ind_inc, ind_vac
FROM            dbo.GTH_NovFijaCargoDet
WHERE        (cod_cli <> 0)

```
