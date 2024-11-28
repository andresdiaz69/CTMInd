# View: vw_VariablesVersiones

## Usa los objetos:
- [[Variables]]
- [[VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_VariablesVersiones]
AS
SELECT        [IdVariable], [IdComisionModeloSub], [NombreVariable], [DescripcionVariable], [IdVariableVersion], [ConsecutivoVariable], [ValorVariable]
FROM            Variables V CROSS APPLY
                             (SELECT        TOP (1) [IdVariableVersion], [ConsecutivoVariable], [ValorVariable]
                               FROM            VariablesVersiones AS VV
                               WHERE        (VV.IdVariable = V.IDVariable)
                               ORDER BY ConsecutivoVariable DESC) RESULTADO



```
