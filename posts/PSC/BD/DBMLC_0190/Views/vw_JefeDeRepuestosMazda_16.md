# View: vw_JefeDeRepuestosMazda_16

## Usa los objetos:
- [[vw_JefeDeRepuestosMazda_15]]
- [[vw_VariablesVersiones]]

```sql


CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_16]
AS
SELECT        TOP (100) PERCENT Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, SUM(ValorNetoTaller) AS ValorNetoTaller, MAX(ValorVariable) AS ValorVariable, SUM(ComisionTaller) AS ComisionTaller
FROM            (SELECT        dbo.vw_JefeDeRepuestosMazda_15.Ano_Periodo, dbo.vw_JefeDeRepuestosMazda_15.Mes_Periodo, dbo.vw_JefeDeRepuestosMazda_15.CodigoEmpresa, dbo.vw_JefeDeRepuestosMazda_15.Empresa, 
                                                    dbo.vw_JefeDeRepuestosMazda_15.CodigoCentro, dbo.vw_JefeDeRepuestosMazda_15.Centro, dbo.vw_JefeDeRepuestosMazda_15.ValorNetoTaller, 
                                                    Variables.ValorVariable, dbo.vw_JefeDeRepuestosMazda_15.ValorNetoTaller * Variables.ValorVariable AS ComisionTaller
                          FROM            dbo.vw_JefeDeRepuestosMazda_15 CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 32) AND (IdComisionModeloSub = 44)) AS Variables) AS Comision
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro

```
