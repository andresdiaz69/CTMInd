# View: vw_alerta_Cajas

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[vw_spiga_Cajas]]
- [[vw_spiga_CajasTipos]]

```sql

CREATE VIEW [dbo].[vw_alerta_Cajas]
AS
SELECT        ISNULL(dbo.Empresas.CodigoEmpresa, 0) AS CodigoEmpresa, ISNULL(dbo.Empresas.NombreEmpresa, 'SIN EMPRESA') AS NombreEmpresa, ISNULL(dbo.Empresas.SiglaEmpresa, 'SIN SIGLA') AS SiglaEmpresa, 
                         dbo.vw_spiga_Cajas.IdEmpresas, dbo.vw_spiga_Cajas.IdCentros, ISNULL(dbo.Centros.NombreCentro, 'SIN CENTRO') AS NombreCentro,


							   
							   dbo.vw_spiga_Cajas.IdCajas, dbo.vw_spiga_Cajas.NombreCaja, 
                         dbo.vw_spiga_Cajas.IdTipos, dbo.vw_spiga_CajasTipos.Tipos
FROM            dbo.vw_spiga_Cajas LEFT OUTER JOIN
                         dbo.vw_spiga_CajasTipos ON dbo.vw_spiga_Cajas.IdTipos = dbo.vw_spiga_CajasTipos.IdTipos LEFT OUTER JOIN
                         dbo.Empresas ON dbo.vw_spiga_Cajas.IdEmpresas = dbo.Empresas.CodigoEmpresa LEFT OUTER JOIN
                         dbo.Centros ON dbo.vw_spiga_Cajas.IdCentros = dbo.Centros.CodigoCentro

```
