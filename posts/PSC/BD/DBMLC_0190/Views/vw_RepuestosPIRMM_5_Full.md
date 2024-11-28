# View: vw_RepuestosPIRMM_5_Full

## Usa los objetos:
- [[ExogenasSedesFaltantes]]
- [[vw_RepuestosPIRMM_444_Full]]

```sql






CREATE VIEW [dbo].[vw_RepuestosPIRMM_5_Full]
AS
SELECT        dbo.vw_RepuestosPIRMM_444_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_444_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_444_Full.CodigoEmpresa, 


dbo.vw_RepuestosPIRMM_444_Full.CodigoSede, dbo.vw_RepuestosPIRMM_444_Full.NombreSede, 

dbo.vw_RepuestosPIRMM_444_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_444_Full.NombreCentro, 


                         dbo.vw_RepuestosPIRMM_444_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_444_Full.PIRPuntos, dbo.vw_RepuestosPIRMM_444_Full.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_444_Full.ValorNetoTaller, dbo.vw_RepuestosPIRMM_444_Full.ValorBasePIR, 
                         ISNULL(dbo.ExogenasSedesFaltantes.Faltante, 0) AS Faltante, 
						 
						 case when isnull(PIRPuntos,0) > 0
						 then
						 (((isnull(ValorBasePIR,0) * isnull(PIRPorcentaje,0) / 100) - isnull(Faltante,0))) / isnull(PIRPuntos,0) 
						 else 0 end 
						 AS ValorDelPuntoPIR
FROM            dbo.vw_RepuestosPIRMM_444_Full LEFT OUTER JOIN
                         dbo.ExogenasSedesFaltantes ON dbo.vw_RepuestosPIRMM_444_Full.CodigoSede = dbo.ExogenasSedesFaltantes.CodigoSede AND dbo.vw_RepuestosPIRMM_444_Full.Ano_Periodo = dbo.ExogenasSedesFaltantes.Ano AND 
                         dbo.vw_RepuestosPIRMM_444_Full.Mes_Periodo = dbo.ExogenasSedesFaltantes.Mes












```
