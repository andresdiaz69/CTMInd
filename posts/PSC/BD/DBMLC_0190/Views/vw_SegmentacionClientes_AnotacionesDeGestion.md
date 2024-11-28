# View: vw_SegmentacionClientes_AnotacionesDeGestion

## Usa los objetos:
- [[Profiles]]
- [[SegmentacionClientes_AnotacionesDeGestion]]
- [[SegmentacionClientes_EstadosDeGestion]]

```sql
CREATE VIEW [dbo].[vw_SegmentacionClientes_AnotacionesDeGestion]
AS
SELECT        dbo.SegmentacionClientes_AnotacionesDeGestion.IDAnotacion, dbo.SegmentacionClientes_AnotacionesDeGestion.Ano_Periodo, dbo.SegmentacionClientes_AnotacionesDeGestion.Mes_Periodo, 
                         dbo.SegmentacionClientes_AnotacionesDeGestion.IdEmpresas, dbo.SegmentacionClientes_AnotacionesDeGestion.IdCentros, dbo.SegmentacionClientes_AnotacionesDeGestion.IdTerceros, 
                         dbo.SegmentacionClientes_AnotacionesDeGestion.IdTercerosPagador, dbo.SegmentacionClientes_AnotacionesDeGestion.NifCif, dbo.SegmentacionClientes_AnotacionesDeGestion.NumeroDocumento, 
                         dbo.SegmentacionClientes_AnotacionesDeGestion.FechaDocumento, dbo.SegmentacionClientes_AnotacionesDeGestion.IDEstado, dbo.SegmentacionClientes_EstadosDeGestion.Estado, 
                         dbo.SegmentacionClientes_AnotacionesDeGestion.TipoSegmentacion, dbo.SegmentacionClientes_AnotacionesDeGestion.UserIdCreo, ISNULL(dbo.Profiles.Nombres, N'') + ISNULL(dbo.Profiles.Apellidos, N'') AS UsuarioCreo, 
                         dbo.SegmentacionClientes_AnotacionesDeGestion.FechaCreacion
FROM            dbo.SegmentacionClientes_AnotacionesDeGestion INNER JOIN
                         dbo.SegmentacionClientes_EstadosDeGestion ON dbo.SegmentacionClientes_AnotacionesDeGestion.IDEstado = dbo.SegmentacionClientes_EstadosDeGestion.IDEstado INNER JOIN
                         dbo.Profiles ON dbo.SegmentacionClientes_AnotacionesDeGestion.UserIdCreo = dbo.Profiles.UserId

```
