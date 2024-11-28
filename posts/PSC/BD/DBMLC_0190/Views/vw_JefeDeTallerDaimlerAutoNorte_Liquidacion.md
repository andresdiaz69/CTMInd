# View: vw_JefeDeTallerDaimlerAutoNorte_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeTallerDaimlerAutoNorte_1]]

```sql



CREATE VIEW [dbo].[vw_JefeDeTallerDaimlerAutoNorte_Liquidacion] AS

SELECT vw_JefeDeTallerDaimlerAutoNorte_1.Ano_Periodo, vw_JefeDeTallerDaimlerAutoNorte_1.Mes_Periodo, vw_JefeDeTallerDaimlerAutoNorte_1.CodigoEmpleado, vw_EmpleadosDetalle.Empleado, vw_JefeDeTallerDaimlerAutoNorte_1.CodigoEmpresa
, vw_EmpleadosDetalle.NombreEmpresa, vw_JefeDeTallerDaimlerAutoNorte_1.CodigoCentro, vw_JefeDeTallerDaimlerAutoNorte_1.Centro, vw_JefeDeTallerDaimlerAutoNorte_1.CodigoSeccion, vw_JefeDeTallerDaimlerAutoNorte_1.Seccion, vw_EmpleadosDetalle.FechaRetiro, vw_JefeDeTallerDaimlerAutoNorte_1.UnidadesVendidas, vw_JefeDeTallerDaimlerAutoNorte_1.ValorComision
,vw_JefeDeTallerDaimlerAutoNorte_1.IdComisionModeloSub, vw_JefeDeTallerDaimlerAutoNorte_1.IdComisionModeloSubCriterio,vw_JefeDeTallerDaimlerAutoNorte_1.IdRangoMaestra, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
,vw_JefeDeTallerDaimlerAutoNorte_1.Valor, vw_JefeDeTallerDaimlerAutoNorte_1.CodigoConcepto
FROM vw_JefeDeTallerDaimlerAutoNorte_1
INNER JOIN vw_EmpleadosDetalle ON vw_JefeDeTallerDaimlerAutoNorte_1.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado


```
