# View: v_GTH_IndGestion

## Usa los objetos:
- [[GTH_IndGes_Seguim]]
- [[GTH_IndGestion]]

```sql

CREATE VIEW [dbo].[v_GTH_IndGestion]
AS
SELECT        dbo.GTH_IndGestion.cod_ind, dbo.GTH_IndGes_Seguim.cod_seguim, dbo.GTH_IndGes_Seguim.cod_emp, dbo.GTH_IndGes_Seguim.fecha, 
                         dbo.GTH_IndGes_Seguim.nom_seguim, dbo.GTH_IndGes_Seguim.meta, dbo.GTH_IndGes_Seguim.por_seguim, dbo.GTH_IndGes_Seguim.ind_accion, 
                         dbo.GTH_IndGes_Seguim.hallazgo, dbo.GTH_IndGes_Seguim.causa, dbo.GTH_IndGestion.nom_ind, dbo.GTH_IndGestion.des_ind, dbo.GTH_IndGestion.cla_ind, 
                         dbo.GTH_IndGestion.des_for, dbo.GTH_IndGestion.cod_peri, dbo.GTH_IndGestion.fuente_dat, dbo.GTH_IndGestion.tipo_ind, dbo.GTH_IndGestion.cod_emp_res, 
                         dbo.GTH_IndGestion.cod_cli
FROM            dbo.GTH_IndGestion LEFT OUTER JOIN
                         dbo.GTH_IndGes_Seguim ON dbo.GTH_IndGestion.cod_cli = dbo.GTH_IndGes_Seguim.cod_cli AND dbo.GTH_IndGes_Seguim.cod_ind = dbo.GTH_IndGestion.cod_ind

```
