# View: vw_RepuestosPIRMM_5

## Usa los objetos:
- [[ExogenasSedesFaltantes]]
- [[vw_RepuestosPIRMM_444]]

```sql





CREATE VIEW [dbo].[vw_RepuestosPIRMM_5]
AS
SELECT        dbo.vw_RepuestosPIRMM_444.Ano_Periodo, dbo.vw_RepuestosPIRMM_444.Mes_Periodo, dbo.vw_RepuestosPIRMM_444.CodigoEmpresa, 


dbo.vw_RepuestosPIRMM_444.CodigoSede, dbo.vw_RepuestosPIRMM_444.NombreSede, 

dbo.vw_RepuestosPIRMM_444.CodigoCentro, dbo.vw_RepuestosPIRMM_444.NombreCentro, 


                         dbo.vw_RepuestosPIRMM_444.PIRPorcentaje, dbo.vw_RepuestosPIRMM_444.PIRPuntos, dbo.vw_RepuestosPIRMM_444.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_444.ValorNetoTaller, dbo.vw_RepuestosPIRMM_444.ValorBasePIR, 
                         ISNULL(dbo.ExogenasSedesFaltantes.Faltante, 0) AS Faltante, 
						 
						 case when isnull(PIRPuntos,0) > 0
						 then
						 (((isnull(ValorBasePIR,0) * isnull(PIRPorcentaje,0) / 100) - isnull(Faltante,0))) / isnull(PIRPuntos,0) 
						 else 0 end 
						 AS ValorDelPuntoPIR
FROM            dbo.vw_RepuestosPIRMM_444 LEFT OUTER JOIN
                         dbo.ExogenasSedesFaltantes ON dbo.vw_RepuestosPIRMM_444.CodigoSede = dbo.ExogenasSedesFaltantes.CodigoSede AND dbo.vw_RepuestosPIRMM_444.Ano_Periodo = dbo.ExogenasSedesFaltantes.Ano AND 
                         dbo.vw_RepuestosPIRMM_444.Mes_Periodo = dbo.ExogenasSedesFaltantes.Mes












```
