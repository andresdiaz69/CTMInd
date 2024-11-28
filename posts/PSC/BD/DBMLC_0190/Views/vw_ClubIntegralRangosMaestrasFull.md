# View: vw_ClubIntegralRangosMaestrasFull

## Usa los objetos:
- [[ClubIntegralModelosSub]]
- [[ClubIntegralRangosDetalles]]
- [[ClubIntegralRangosMaestras]]
- [[ClubIntegralRangosVersiones]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralRangosMaestrasFull] AS
SELECT        dbo.ClubIntegralRangosMaestras.IdRangoMaestra, 
		      dbo.ClubIntegralRangosMaestras.IdClubIntegralModeloSub, 
              dbo.ClubIntegralRangosMaestras.IdClubIntegralModeloSubCriterio, 
			  dbo.ClubIntegralModelosSub.IdClubIntegralModelo, 
              dbo.ClubIntegralRangosMaestras.CodigoMarcaGrupo, 
			  dbo.ClubIntegralRangosMaestras.NombreMaestra, 
              dbo.ClubIntegralRangosMaestras.UnidadDeMedidaEscala, 
			  dbo.ClubIntegralRangosMaestras.UnidadDeMedidaValor, 
              dbo.ClubIntegralRangosVersiones.IdRangoVersion, 
			  dbo.ClubIntegralRangosVersiones.ConsecutivoVersion, 
			  dbo.ClubIntegralRangosDetalles.IdRangoDetalle, 
              dbo.ClubIntegralRangosDetalles.Desde, 
			  dbo.ClubIntegralRangosDetalles.Hasta, 
			  dbo.ClubIntegralRangosDetalles.Puntos

FROM          dbo.ClubIntegralRangosMaestras INNER JOIN 
			  dbo.ClubIntegralRangosVersiones ON dbo.ClubIntegralRangosMaestras.IdRangoMaestra = dbo.ClubIntegralRangosVersiones.IdRangoMaestra INNER JOIN
			  dbo.ClubIntegralRangosDetalles ON dbo.ClubIntegralRangosVersiones.IdRangoVersion = dbo.ClubIntegralRangosDetalles.IdRangoVersion INNER JOIN
			  dbo.ClubIntegralModelosSub ON dbo.ClubIntegralRangosMaestras.IdClubIntegralModeloSub = dbo.ClubIntegralModelosSub.IdClubIntegralModeloSub 

```
