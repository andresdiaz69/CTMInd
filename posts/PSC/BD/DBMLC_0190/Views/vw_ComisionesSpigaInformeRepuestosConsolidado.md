# View: vw_ComisionesSpigaInformeRepuestosConsolidado

## Usa los objetos:
- [[vw_ComisionesSpigaInformeRepuestosAlmacenAlbaran]]
- [[vw_ComisionesSpigaInformeRepuestosTallerPorOT]]

```sql
CREATE VIEW [dbo].[vw_ComisionesSpigaInformeRepuestosConsolidado]
AS
SELECT        Ano_Spiga AS Ano_Periodo, Mes_Spiga AS Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, Marca, CedulaVendedorRepuestos, NombreVendedorRepuestos, ValorNeto, TipoVenta
FROM            vw_ComisionesSpigaInformeRepuestosAlmacenAlbaran

UNION ALL
SELECT        Ano_Spiga AS Ano_Periodo, Mes_Spiga AS Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, marca, CedulaVendedorRepuestos, NombreVendedorRepuestos, ValorNeto, TipoVenta
FROM            vw_ComisionesSpigaInformeRepuestosTallerPorOT



```
