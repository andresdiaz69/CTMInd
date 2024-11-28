# View: vw_JefeDeRepuestosMazda_14

## Usa los objetos:
- [[vw_JefeDeRepuestosMazda_13]]
- [[vw_VariablesVersiones]]

```sql




CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_14]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, SUM(ValorBase) AS ValorBase, MAX(ValorVariable) AS ValorVariable, SUM(ComisionMostrador) AS ComisionMostrador
FROM            (SELECT        dbo.vw_JefeDeRepuestosMazda_13.Ano_Periodo, dbo.vw_JefeDeRepuestosMazda_13.Mes_Periodo, dbo.vw_JefeDeRepuestosMazda_13.CodigoEmpresa, dbo.vw_JefeDeRepuestosMazda_13.Empresa, 
                                                    dbo.vw_JefeDeRepuestosMazda_13.CodigoCentro, dbo.vw_JefeDeRepuestosMazda_13.Centro, dbo.vw_JefeDeRepuestosMazda_13.TotalFactura, 
                                                    dbo.vw_JefeDeRepuestosMazda_13.ImporteEfecto, dbo.vw_JefeDeRepuestosMazda_13.PorcentajeRecaudo, dbo.vw_JefeDeRepuestosMazda_13.ValorBase, Variable.ValorVariable, 
                                                    dbo.vw_JefeDeRepuestosMazda_13.ValorBase * Variable.ValorVariable AS ComisionMostrador
                          FROM            dbo.vw_JefeDeRepuestosMazda_13 CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 32) AND (IdComisionModeloSub = 44)) AS Variable) AS Comision
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro

```
