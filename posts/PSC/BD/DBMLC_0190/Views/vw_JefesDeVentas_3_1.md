# View: vw_JefesDeVentas_3_1

## Usa los objetos:
- [[Centros]]
- [[EmpresasCentros]]
- [[ExogenasCreditosDesembolsados]]

```sql




CREATE VIEW [dbo].[vw_JefesDeVentas_3_1]
AS
SELECT        ExogenasCreditosDesembolsados.Ano AS Ano_Periodo, ExogenasCreditosDesembolsados.Mes AS Mes_Periodo, EmpresasCentros.CodigoEmpresa, ExogenasCreditosDesembolsados.CodigoCentro, Centros.NombreCentro AS Centro, ExogenasCreditosDesembolsados.EficienciaAdministrativa 
                         
FROM            EmpresasCentros RIGHT OUTER JOIN
                         Centros ON EmpresasCentros.CodigoCentro = Centros.CodigoCentro RIGHT OUTER JOIN
                         ExogenasCreditosDesembolsados ON EmpresasCentros.CodigoCentro = ExogenasCreditosDesembolsados.CodigoCentro


```
