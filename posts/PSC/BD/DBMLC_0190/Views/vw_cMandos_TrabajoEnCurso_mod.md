# View: vw_cMandos_TrabajoEnCurso_mod

## Usa los objetos:
- [[spiga_ValorTrabajosEnCurso]]

```sql


CREATE VIEW [dbo].[vw_cMandos_TrabajoEnCurso_mod]
AS
	--SELECT year(FechaEntrada) Ano_Periodo, month(FechaEntrada) Mes_Periodo, IdEmpresas CodigoEmpresa, IdCentros CodigoCentro, FechaEntrada, IdSecciones CodigoSeccion, DescripcionSeccion, IdSeccionCargo, DescripcionSeccionCargo,

	--isnull(ImporteMO,0) ImporteMO, isnull(ImporteMateriales,0) ImporteMateriales, isnull(ImportePinturas,0)ImportePinturas, 
	--isnull(ImporteVarios,0) ImporteVarios, isnull(ImporteSubContratado,0) ImporteSubContratado, isnull(ImporteEntradasTrabajosExternos,0) ImporteEntradasTrabajosExternos, 
	--isnull(ImporteMO,0)+isnull(ImporteMateriales,0)+isnull(ImportePinturas,0)+isnull(ImporteVarios,0)+isnull(ImporteSubContratado,0)+isnull(ImporteEntradasTrabajosExternos,0) ImporteTotal
	--FROM            Desarrollo_DBMLC_0190.dbo.SpigaTrabajoOrdenesObraEnCurso

SELECT	Ano_Periodo, Mes_Periodo, IdEmpresa CodigoEmpresa, IdCentro CodigoCentro, FechaDeCorte, IdSeccion CodigoSeccion, NombreSeccion, Importe ImporteTotal
FROM	[PSCService_DB].[dbo].[spiga_ValorTrabajosEnCurso]

```
