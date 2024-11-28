# View: vw_TallerPITMM_2_Detalle

## Usa los objetos:
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_TallerPITMM_2]]

```sql


CREATE VIEW [dbo].[vw_TallerPITMM_2_Detalle]
AS
SELECT        dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado, dbo.vw_TallerPITMM_2.Ano_Periodo, dbo.vw_TallerPITMM_2.Mes_Periodo, dbo.vw_TallerPITMM_2.CodigoEmpresa, dbo.vw_TallerPITMM_2.CodigoSede, 
                         dbo.vw_TallerPITMM_2.NombreSede,  dbo.vw_TallerPITMM_2.CodigoCentro, dbo.vw_TallerPITMM_2.NombreCentro,  dbo.vw_TallerPITMM_2.ValorTotalFacturas, dbo.vw_TallerPITMM_2.ImportesEfecto, dbo.vw_TallerPITMM_2.PorcentajesRecaudo, dbo.vw_TallerPITMM_2.ValorNetoTaller, 
                         dbo.vw_TallerPITMM_2.ValorBasePIT
FROM            dbo.ExogenasPuntosEmpleadosCentro LEFT OUTER JOIN
                         dbo.vw_TallerPITMM_2 ON dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro = dbo.vw_TallerPITMM_2.CodigoCentro
WHERE        (dbo.ExogenasPuntosEmpleadosCentro.PuntosPIT > 0)





```
