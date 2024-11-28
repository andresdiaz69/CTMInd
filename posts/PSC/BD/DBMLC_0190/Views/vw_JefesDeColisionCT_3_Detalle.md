# View: vw_JefesDeColisionCT_3_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_JefesDeColisionCT_3_Detalle]
AS
SELECT        Totalizacion.Ano_Periodo, Totalizacion.Mes_Periodo, Totalizacion.CodigoEmpresa, Totalizacion.NumeroFacturaTaller, Totalizacion.NumOT, Totalizacion.CodigoCentro, Totalizacion.Centro, Totalizacion.CodigoSeccion, Totalizacion.Seccion, [VAR].ValorVariable, 
                         SUM(Totalizacion.Facturacion) AS Facturacion
FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, NumeroFacturaTaller, NumOT, CodigoCentro, Centro, CodigoSeccion, Seccion, ValorUnitario * UnidadesVendidas - (ValorUnitario * UnidadesVendidas) * (PorcentajeDescuento / 100) 
                                                    AS Facturacion
                          FROM            dbo.ComisionesSpigaTallerPorOT) AS Totalizacion CROSS JOIN
                             (SELECT        IdVariable, IdVariableVersion, ValorVariable, ConsecutivoVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 21)) AS [VAR]
GROUP BY Totalizacion.Ano_Periodo, Totalizacion.Mes_Periodo, Totalizacion.CodigoEmpresa, Totalizacion.NumeroFacturaTaller, Totalizacion.NumOT, Totalizacion.CodigoCentro, Totalizacion.Centro, Totalizacion.CodigoSeccion, Totalizacion.Seccion, [VAR].ValorVariable


```
