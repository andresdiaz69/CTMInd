# View: vw_RangosMaestrasFull

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[RangosDetalles]]
- [[RangosMaestras]]
- [[RangosVersiones]]
- [[VehiculosMarcasGrupos]]

```sql
CREATE VIEW [dbo].[vw_RangosMaestrasFull]
AS
SELECT        dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.IdComisionModeloSubCriterio, dbo.ComisionesModelosSub.IdComisionModelo, 
                         dbo.RangosMaestras.CodigoMarcaGrupo, dbo.VehiculosMarcasGrupos.MarcaGrupo, dbo.RangosMaestras.NombreMaestra, dbo.RangosMaestras.UnidadDeMedidaEscala, dbo.RangosMaestras.UnidadDeMedidaValor, 
                         dbo.ComisionesModelosSub.CodigoEmpresa, dbo.RangosVersiones.IdRangoVersion, dbo.RangosVersiones.ConsecutivoVersion, dbo.RangosDetalles.IdRangoDetalle, dbo.RangosDetalles.Desde, dbo.RangosDetalles.Hasta, 
                         dbo.RangosDetalles.Valor, dbo.RangosMaestras.CodigoConcepto, dbo.RangosMaestras.CodigoConceptoAux
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.RangosVersiones ON dbo.RangosMaestras.IdRangoMaestra = dbo.RangosVersiones.IdRangoMaestra INNER JOIN
                         dbo.RangosDetalles ON dbo.RangosVersiones.IdRangoVersion = dbo.RangosDetalles.IdRangoVersion INNER JOIN
                         dbo.ComisionesModelosSub ON dbo.RangosMaestras.IdComisionModeloSub = dbo.ComisionesModelosSub.IdComisionModeloSub INNER JOIN
                         dbo.VehiculosMarcasGrupos ON dbo.RangosMaestras.CodigoMarcaGrupo = dbo.VehiculosMarcasGrupos.CodigoMarcaGrupo


```
