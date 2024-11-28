# View: vw_JefeDeRepuestosMazda_17

## Usa los objetos:
- [[vw_JefeDeRepuestosMazda_14]]
- [[vw_JefeDeRepuestosMazda_16]]

```sql
CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_17]
AS
SELECT        dbo.vw_JefeDeRepuestosMazda_14.Ano_Periodo, dbo.vw_JefeDeRepuestosMazda_14.Mes_Periodo, dbo.vw_JefeDeRepuestosMazda_14.CodigoEmpresa, dbo.vw_JefeDeRepuestosMazda_14.Empresa, 
                         dbo.vw_JefeDeRepuestosMazda_14.CodigoCentro, dbo.vw_JefeDeRepuestosMazda_14.Centro, dbo.vw_JefeDeRepuestosMazda_14.ValorBase, dbo.vw_JefeDeRepuestosMazda_14.ComisionMostrador, 
                         dbo.vw_JefeDeRepuestosMazda_16.ValorNetoTaller, dbo.vw_JefeDeRepuestosMazda_16.ComisionTaller, dbo.vw_JefeDeRepuestosMazda_16.ValorVariable, 
                         dbo.vw_JefeDeRepuestosMazda_14.ComisionMostrador + dbo.vw_JefeDeRepuestosMazda_16.ComisionTaller AS ComisionRepuestos
FROM            dbo.vw_JefeDeRepuestosMazda_14 LEFT OUTER JOIN
                         dbo.vw_JefeDeRepuestosMazda_16 ON dbo.vw_JefeDeRepuestosMazda_14.Ano_Periodo = dbo.vw_JefeDeRepuestosMazda_16.Ano_Periodo AND 
                         dbo.vw_JefeDeRepuestosMazda_14.Mes_Periodo = dbo.vw_JefeDeRepuestosMazda_16.Mes_Periodo AND dbo.vw_JefeDeRepuestosMazda_14.CodigoEmpresa = dbo.vw_JefeDeRepuestosMazda_16.CodigoEmpresa AND 
                         dbo.vw_JefeDeRepuestosMazda_14.CodigoCentro = dbo.vw_JefeDeRepuestosMazda_16.CodigoCentro

```
