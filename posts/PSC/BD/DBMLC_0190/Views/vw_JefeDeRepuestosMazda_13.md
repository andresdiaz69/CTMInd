# View: vw_JefeDeRepuestosMazda_13

## Usa los objetos:
- [[vw_JefeDeRepuestosMazda_11]]
- [[vw_JefeDeRepuestosMazda_12]]

```sql



CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_13]
AS
SELECT        dbo.vw_JefeDeRepuestosMazda_11.Ano_Periodo, dbo.vw_JefeDeRepuestosMazda_11.Mes_Periodo, dbo.vw_JefeDeRepuestosMazda_11.CodigoEmpresa, dbo.vw_JefeDeRepuestosMazda_11.Empresa, 
                         dbo.vw_JefeDeRepuestosMazda_11.CodigoCentro, dbo.vw_JefeDeRepuestosMazda_11.Centro, dbo.vw_JefeDeRepuestosMazda_11.ValorNetoMostrador, dbo.vw_JefeDeRepuestosMazda_11.NumeroFactura, 
                         ISNULL(dbo.vw_JefeDeRepuestosMazda_12.TotalFactura,0) AS TotalFactura, ISNULL(dbo.vw_JefeDeRepuestosMazda_12.ImporteEfecto,0) AS ImporteEfecto, ISNULL(dbo.vw_JefeDeRepuestosMazda_12.PorcentajeRecaudo,0) AS PorcentajeRecaudo, 
                         ISNULL(dbo.vw_JefeDeRepuestosMazda_11.ValorNetoMostrador * dbo.vw_JefeDeRepuestosMazda_12.PorcentajeRecaudo / 100, 0) AS ValorBase
FROM            dbo.vw_JefeDeRepuestosMazda_11 LEFT OUTER JOIN
                         dbo.vw_JefeDeRepuestosMazda_12 ON  dbo.vw_JefeDeRepuestosMazda_11.NumeroFactura = dbo.vw_JefeDeRepuestosMazda_12.NumeroFactura AND
                         dbo.vw_JefeDeRepuestosMazda_11.CodigoCentro = dbo.vw_JefeDeRepuestosMazda_12.CodigoCentro AND dbo.vw_JefeDeRepuestosMazda_11.CodigoEmpresa = dbo.vw_JefeDeRepuestosMazda_12.CodigoEmpresa AND 
                         dbo.vw_JefeDeRepuestosMazda_11.Ano_Periodo = dbo.vw_JefeDeRepuestosMazda_12.Ano_Periodo AND dbo.vw_JefeDeRepuestosMazda_11.Mes_Periodo = dbo.vw_JefeDeRepuestosMazda_12.Mes_Periodo

```
