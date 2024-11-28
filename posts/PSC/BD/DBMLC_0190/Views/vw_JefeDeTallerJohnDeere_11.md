# View: vw_JefeDeTallerJohnDeere_11

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_JefeDeTallerJohnDeere_11]
AS
SELECT        VALOR_NETO.Ano_Periodo, VALOR_NETO.Mes_Periodo, VALOR_NETO.CodigoEmpresa, VALOR_NETO.Empresa, VALOR_NETO.CodigoCentro, VALOR_NETO.Centro, VALOR_NETO.ValorNeto, VARIABLE.ValorVariable, 
                         VALOR_NETO.ValorNeto * VARIABLE.ValorVariable AS Comision
FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, SUM(ValorNeto) AS ValorNeto
                          FROM            dbo.ComisionesSpigaTallerPorOT
                          WHERE        (TipoOperacion = 'MO')
                          GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro) AS VALOR_NETO CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 29) AND (IdComisionModeloSub = 41)) AS VARIABLE

```
